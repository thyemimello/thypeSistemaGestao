import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { crypto } from "./auth";
import passport from "passport";
import { z } from "zod";
import { insertUserSchema, insertPartnerSchema, insertInteractionSchema } from "@shared/schema";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

function isMaster(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role === "master") {
    return next();
  }
  res.status(403).json({ message: "Forbidden - Master access required" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const registerSchema = insertUserSchema.extend({
        name: z.string().min(1, "Name is required"),
      });
      const result = registerSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.flatten() 
        });
      }
      
      const { username, password, name, role, avatar } = result.data;
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const hashedPassword = await crypto.hash(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        name,
        role: role || "manager",
        avatar,
      });
      
      req.login({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      }, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed after registration" });
        }
        return res.json({
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        });
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/auth/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        return res.json(user);
      });
    })(req, res, next);
  });
  
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/user", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });
  
  app.get("/api/managers", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const managers = await storage.getAllManagers();
      
      const managersWithKPIs = await Promise.all(
        managers.map(async (manager) => {
          const partners = await storage.getPartnersByManagerId(manager.id);
          const interactions = await storage.getInteractionsByManagerId(manager.id);
          const metricsData = await Promise.all(
            partners.map(p => storage.getPartnerMetrics(p.id))
          );
          
          const totalSales = metricsData.reduce((sum, m) => sum + (m?.sales || 0), 0);
          const totalReservations = metricsData.reduce((sum, m) => sum + (m?.reservations || 0), 0);
          const avgROI = metricsData.length > 0 
            ? metricsData.reduce((sum, m) => sum + parseFloat(m?.roi || "0"), 0) / metricsData.length 
            : 0;
          
          const totalInteractionTime = interactions.reduce((sum, i) => sum + i.duration, 0);
          const effort = Math.min(100, Math.floor(totalInteractionTime / 10));
          
          const avgQuality = interactions.length > 0
            ? interactions.reduce((sum, i) => sum + i.quality, 0) / interactions.length
            : 0;
          const relationship = Math.floor(avgQuality * 20);
          
          const ieg = effort > 0 ? avgROI / effort : 0;
          
          return {
            id: manager.id,
            name: manager.name,
            role: manager.role,
            avatar: manager.avatar,
            kpis: {
              effort,
              relationship,
              roi: Math.floor(avgROI),
              ieg: parseFloat(ieg.toFixed(2)),
              sales: totalSales,
              reservations: totalReservations,
            }
          };
        })
      );
      
      res.json(managersWithKPIs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/partners", isAuthenticated, async (req: Request, res: Response) => {
    try {
      let partners;
      if (req.user!.role === "manager") {
        partners = await storage.getPartnersByManagerId(req.user!.id);
      } else {
        partners = await storage.getAllPartners();
      }
      
      const partnersWithMetrics = await Promise.all(
        partners.map(async (partner) => {
          const metrics = await storage.getPartnerMetrics(partner.id);
          return {
            ...partner,
            metrics: metrics ? {
              sales: metrics.sales,
              reservations: metrics.reservations,
              roi: parseFloat(metrics.roi),
              lastContact: metrics.lastContact?.toISOString().split('T')[0] || null,
            } : {
              sales: 0,
              reservations: 0,
              roi: 0,
              lastContact: null,
            }
          };
        })
      );
      
      res.json(partnersWithMetrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/partners", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const result = insertPartnerSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.flatten() 
        });
      }
      
      if (req.user!.role === "manager" && result.data.managerId !== req.user!.id) {
        return res.status(403).json({ message: "Cannot create partner for another manager" });
      }
      
      const partner = await storage.createPartner(result.data);
      res.status(201).json(partner);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/partners/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartnerById(req.params.id);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      
      if (req.user!.role === "manager" && partner.managerId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const metrics = await storage.getPartnerMetrics(partner.id);
      const interactions = await storage.getInteractionsByPartnerId(partner.id);
      
      res.json({
        ...partner,
        metrics: metrics ? {
          sales: metrics.sales,
          reservations: metrics.reservations,
          roi: parseFloat(metrics.roi),
          lastContact: metrics.lastContact?.toISOString().split('T')[0] || null,
        } : null,
        interactions: interactions.map(i => ({
          ...i,
          date: i.date.toISOString().split('T')[0],
        })),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.patch("/api/partners/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartnerById(req.params.id);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      
      if (req.user!.role === "manager" && partner.managerId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updated = await storage.updatePartner(req.params.id, req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete("/api/partners/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartnerById(req.params.id);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      
      if (req.user!.role === "manager" && partner.managerId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deletePartner(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/interactions", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const result = insertInteractionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: result.error.flatten() 
        });
      }
      
      if (req.user!.role === "manager" && result.data.managerId !== req.user!.id) {
        return res.status(403).json({ message: "Cannot create interaction for another manager" });
      }
      
      const partner = await storage.getPartnerById(result.data.partnerId);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      
      const interaction = await storage.createInteraction(result.data);
      res.status(201).json(interaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/interactions", isAuthenticated, async (req: Request, res: Response) => {
    try {
      let interactions;
      if (req.user!.role === "manager") {
        interactions = await storage.getInteractionsByManagerId(req.user!.id);
      } else {
        interactions = await storage.getAllInteractions();
      }
      
      const interactionsWithPartnerNames = await Promise.all(
        interactions.map(async (interaction) => {
          const partner = await storage.getPartnerById(interaction.partnerId);
          return {
            ...interaction,
            clientName: partner?.name || "Unknown",
            date: interaction.date.toISOString().split('T')[0],
          };
        })
      );
      
      res.json(interactionsWithPartnerNames);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.patch("/api/partners/:id/metrics", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartnerById(req.params.id);
      if (!partner) {
        return res.status(404).json({ message: "Partner not found" });
      }
      
      if (req.user!.role !== "master") {
        return res.status(403).json({ message: "Only masters can update metrics directly" });
      }
      
      const { sales, reservations, roi } = req.body;
      const metrics = await storage.upsertPartnerMetrics({
        partnerId: req.params.id,
        sales: sales || 0,
        reservations: reservations || 0,
        roi: roi?.toString() || "0",
      });
      
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
