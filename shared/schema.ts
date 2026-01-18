import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["master", "manager"]);
export const partnerTypeEnum = pgEnum("partner_type", ["imobiliaria", "corretor"]);
export const classificationEnum = pgEnum("classification", ["ouro", "prata", "bronze"]);
export const relationshipEnum = pgEnum("relationship", ["frio", "morno", "quente", "estrategico"]);
export const statusEnum = pgEnum("status", ["ativo", "inativo"]);
export const interactionTypeEnum = pgEnum("interaction_type", [
  "whatsapp",
  "ligacao",
  "reuniao_online",
  "reuniao_presencial",
  "visita_tecnica",
  "treinamento",
  "almoco_estrategico",
  "entrega_material"
]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: roleEnum("role").notNull().default("manager"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const realEstatePartners = pgTable("real_estate_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: partnerTypeEnum("type").notNull(),
  classification: classificationEnum("classification").notNull().default("bronze"),
  relationship: relationshipEnum("relationship").notNull().default("frio"),
  managerId: varchar("manager_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  city: text("city").notNull(),
  contactName: text("contact_name").notNull(),
  status: statusEnum("status").notNull().default("ativo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const interactions = pgTable("interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  partnerId: varchar("partner_id").notNull().references(() => realEstatePartners.id, { onDelete: "cascade" }),
  managerId: varchar("manager_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: interactionTypeEnum("type").notNull(),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull(),
  quality: integer("quality").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const partnerMetrics = pgTable("partner_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  partnerId: varchar("partner_id").notNull().references(() => realEstatePartners.id, { onDelete: "cascade" }).unique(),
  sales: integer("sales").notNull().default(0),
  reservations: integer("reservations").notNull().default(0),
  roi: decimal("roi", { precision: 10, scale: 2 }).notNull().default("0"),
  lastContact: timestamp("last_contact"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  partners: many(realEstatePartners),
  interactions: many(interactions),
}));

export const realEstatePartnersRelations = relations(realEstatePartners, ({ one, many }) => ({
  manager: one(users, {
    fields: [realEstatePartners.managerId],
    references: [users.id],
  }),
  interactions: many(interactions),
  metrics: one(partnerMetrics, {
    fields: [realEstatePartners.id],
    references: [partnerMetrics.partnerId],
  }),
}));

export const interactionsRelations = relations(interactions, ({ one }) => ({
  partner: one(realEstatePartners, {
    fields: [interactions.partnerId],
    references: [realEstatePartners.id],
  }),
  manager: one(users, {
    fields: [interactions.managerId],
    references: [users.id],
  }),
}));

export const partnerMetricsRelations = relations(partnerMetrics, ({ one }) => ({
  partner: one(realEstatePartners, {
    fields: [partnerMetrics.partnerId],
    references: [realEstatePartners.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPartnerSchema = createInsertSchema(realEstatePartners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().or(z.date()),
});

export const insertPartnerMetricsSchema = createInsertSchema(partnerMetrics).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof realEstatePartners.$inferSelect;

export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
export type Interaction = typeof interactions.$inferSelect;

export type InsertPartnerMetrics = z.infer<typeof insertPartnerMetricsSchema>;
export type PartnerMetrics = typeof partnerMetrics.$inferSelect;
