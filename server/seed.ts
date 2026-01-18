import { db } from "./db";
import { users, realEstatePartners, interactions, partnerMetrics } from "@shared/schema";
import { crypto } from "./auth";

async function seed() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await crypto.hash("password123");

  const masterUser = await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
    name: "Master Admin",
    role: "master",
  }).returning();
  console.log("✅ Created master user: admin/password123");

  const manager1 = await db.insert(users).values({
    username: "roberto.almeida",
    password: hashedPassword,
    name: "Roberto Almeida",
    role: "manager",
    avatar: "https://i.pravatar.cc/150?u=m1",
  }).returning();

  const manager2 = await db.insert(users).values({
    username: "fernanda.costa",
    password: hashedPassword,
    name: "Fernanda Costa",
    role: "manager",
    avatar: "https://i.pravatar.cc/150?u=m2",
  }).returning();

  const manager3 = await db.insert(users).values({
    username: "carlos.silva",
    password: hashedPassword,
    name: "Carlos Silva",
    role: "manager",
    avatar: "https://i.pravatar.cc/150?u=m3",
  }).returning();
  
  console.log("✅ Created 3 managers");

  const partner1 = await db.insert(realEstatePartners).values({
    name: "Imobiliária Elite",
    type: "imobiliaria",
    classification: "ouro",
    relationship: "estrategico",
    managerId: manager1[0].id,
    city: "São Paulo",
    contactName: "Ricardo",
    status: "ativo",
  }).returning();

  const partner2 = await db.insert(realEstatePartners).values({
    name: "Corretor João",
    type: "corretor",
    classification: "prata",
    relationship: "quente",
    managerId: manager1[0].id,
    city: "São Paulo",
    contactName: "João",
    status: "ativo",
  }).returning();

  const partner3 = await db.insert(realEstatePartners).values({
    name: "Imobiliária Nova Era",
    type: "imobiliaria",
    classification: "bronze",
    relationship: "morno",
    managerId: manager2[0].id,
    city: "Campinas",
    contactName: "Sônia",
    status: "ativo",
  }).returning();

  const partner4 = await db.insert(realEstatePartners).values({
    name: "Imobiliária Prime",
    type: "imobiliaria",
    classification: "ouro",
    relationship: "frio",
    managerId: manager3[0].id,
    city: "Santos",
    contactName: "Pedro",
    status: "ativo",
  }).returning();

  console.log("✅ Created 4 real estate partners");

  await db.insert(partnerMetrics).values([
    {
      partnerId: partner1[0].id,
      sales: 8,
      reservations: 20,
      roi: "150",
      lastContact: new Date("2025-12-14"),
    },
    {
      partnerId: partner2[0].id,
      sales: 3,
      reservations: 8,
      roi: "90",
      lastContact: new Date("2025-12-10"),
    },
    {
      partnerId: partner3[0].id,
      sales: 1,
      reservations: 4,
      roi: "50",
      lastContact: new Date("2025-11-28"),
    },
    {
      partnerId: partner4[0].id,
      sales: 0,
      reservations: 2,
      roi: "20",
      lastContact: new Date("2025-10-15"),
    },
  ]);

  console.log("✅ Created partner metrics");

  await db.insert(interactions).values([
    {
      partnerId: partner1[0].id,
      managerId: manager1[0].id,
      type: "almoco_estrategico",
      date: new Date("2025-12-14"),
      duration: 90,
      quality: 5,
      notes: "Alinhamento de metas para o próximo trimestre.",
    },
    {
      partnerId: partner2[0].id,
      managerId: manager1[0].id,
      type: "whatsapp",
      date: new Date("2025-12-15"),
      duration: 10,
      quality: 3,
      notes: "Envio de tabela atualizada.",
    },
    {
      partnerId: partner1[0].id,
      managerId: manager1[0].id,
      type: "reuniao_presencial",
      date: new Date("2025-12-10"),
      duration: 60,
      quality: 5,
      notes: "Apresentação do novo empreendimento.",
    },
    {
      partnerId: partner3[0].id,
      managerId: manager2[0].id,
      type: "ligacao",
      date: new Date("2025-11-28"),
      duration: 15,
      quality: 3,
      notes: "Follow-up de proposta enviada.",
    },
  ]);

  console.log("✅ Created 4 interactions");
  console.log("🎉 Seeding completed!");
  console.log("\nLogin credentials:");
  console.log("Master: admin / password123");
  console.log("Manager: roberto.almeida / password123");
  console.log("Manager: fernanda.costa / password123");
  console.log("Manager: carlos.silva / password123");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
