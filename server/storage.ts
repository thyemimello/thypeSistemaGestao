import {
  users,
  realEstatePartners,
  interactions,
  partnerMetrics,
  type User,
  type InsertUser,
  type Partner,
  type InsertPartner,
  type Interaction,
  type InsertInteraction,
  type PartnerMetrics,
  type InsertPartnerMetrics,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, inArray } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllManagers(): Promise<User[]>;
  getManagerById(id: string): Promise<User | undefined>;
  
  createPartner(partner: InsertPartner): Promise<Partner>;
  getPartnerById(id: string): Promise<Partner | undefined>;
  getAllPartners(): Promise<Partner[]>;
  getPartnersByManagerId(managerId: string): Promise<Partner[]>;
  updatePartner(id: string, updates: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: string): Promise<void>;
  
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  getInteractionById(id: string): Promise<Interaction | undefined>;
  getAllInteractions(): Promise<Interaction[]>;
  getInteractionsByPartnerId(partnerId: string): Promise<Interaction[]>;
  getInteractionsByManagerId(managerId: string): Promise<Interaction[]>;
  
  getPartnerMetrics(partnerId: string): Promise<PartnerMetrics | undefined>;
  upsertPartnerMetrics(metrics: InsertPartnerMetrics): Promise<PartnerMetrics>;
  getAllPartnerMetrics(): Promise<PartnerMetrics[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllManagers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, "manager"));
  }

  async getManagerById(id: string): Promise<User | undefined> {
    const [manager] = await db.select().from(users).where(eq(users.id, id));
    return manager || undefined;
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const [newPartner] = await db
      .insert(realEstatePartners)
      .values(partner)
      .returning();
    
    await db.insert(partnerMetrics).values({
      partnerId: newPartner.id,
      sales: 0,
      reservations: 0,
      roi: "0",
    });
    
    return newPartner;
  }

  async getPartnerById(id: string): Promise<Partner | undefined> {
    const [partner] = await db.select().from(realEstatePartners).where(eq(realEstatePartners.id, id));
    return partner || undefined;
  }

  async getAllPartners(): Promise<Partner[]> {
    return await db.select().from(realEstatePartners).orderBy(desc(realEstatePartners.createdAt));
  }

  async getPartnersByManagerId(managerId: string): Promise<Partner[]> {
    return await db
      .select()
      .from(realEstatePartners)
      .where(eq(realEstatePartners.managerId, managerId))
      .orderBy(desc(realEstatePartners.createdAt));
  }

  async updatePartner(id: string, updates: Partial<InsertPartner>): Promise<Partner | undefined> {
    const [updated] = await db
      .update(realEstatePartners)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(realEstatePartners.id, id))
      .returning();
    return updated || undefined;
  }

  async deletePartner(id: string): Promise<void> {
    await db.delete(realEstatePartners).where(eq(realEstatePartners.id, id));
  }

  async createInteraction(interaction: InsertInteraction): Promise<Interaction> {
    const dateValue = typeof interaction.date === 'string' ? new Date(interaction.date) : interaction.date;
    
    const [newInteraction] = await db
      .insert(interactions)
      .values({
        ...interaction,
        date: dateValue,
      })
      .returning();
    
    await db
      .update(partnerMetrics)
      .set({ lastContact: dateValue, updatedAt: new Date() })
      .where(eq(partnerMetrics.partnerId, interaction.partnerId));
    
    return newInteraction;
  }

  async getInteractionById(id: string): Promise<Interaction | undefined> {
    const [interaction] = await db.select().from(interactions).where(eq(interactions.id, id));
    return interaction || undefined;
  }

  async getAllInteractions(): Promise<Interaction[]> {
    return await db.select().from(interactions).orderBy(desc(interactions.date));
  }

  async getInteractionsByPartnerId(partnerId: string): Promise<Interaction[]> {
    return await db
      .select()
      .from(interactions)
      .where(eq(interactions.partnerId, partnerId))
      .orderBy(desc(interactions.date));
  }

  async getInteractionsByManagerId(managerId: string): Promise<Interaction[]> {
    return await db
      .select()
      .from(interactions)
      .where(eq(interactions.managerId, managerId))
      .orderBy(desc(interactions.date));
  }

  async getPartnerMetrics(partnerId: string): Promise<PartnerMetrics | undefined> {
    const [metrics] = await db
      .select()
      .from(partnerMetrics)
      .where(eq(partnerMetrics.partnerId, partnerId));
    return metrics || undefined;
  }

  async upsertPartnerMetrics(metrics: InsertPartnerMetrics): Promise<PartnerMetrics> {
    const [result] = await db
      .insert(partnerMetrics)
      .values(metrics)
      .onConflictDoUpdate({
        target: partnerMetrics.partnerId,
        set: {
          sales: metrics.sales,
          reservations: metrics.reservations,
          roi: metrics.roi,
          lastContact: metrics.lastContact,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  async getAllPartnerMetrics(): Promise<PartnerMetrics[]> {
    return await db.select().from(partnerMetrics);
  }
}

export const storage = new DatabaseStorage();
