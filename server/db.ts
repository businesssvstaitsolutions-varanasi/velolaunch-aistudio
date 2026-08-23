import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { ConsultationStatus, InsertUser, consultations, productOffers, productWaitlist, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let database: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!database && process.env.DATABASE_URL) {
    try {
      database = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      database = null;
    }
  }
  return database;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const db = await getDb();
  if (!db) return;

  const values: InsertUser = {
    openId: user.openId,
    name: user.name ?? null,
    email: user.email ?? null,
    loginMethod: user.loginMethod ?? null,
    lastSignedIn: user.lastSignedIn ?? new Date(),
    role: user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user"),
  };

  await db.insert(users).values(values).onDuplicateKeyUpdate({
    set: {
      name: values.name,
      email: values.email,
      loginMethod: values.loginMethod,
      lastSignedIn: values.lastSignedIn,
    },
  });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createConsultation(input: { name: string; email: string; phone?: string; scope: string; source?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Consultation storage is unavailable");

  await db.insert(consultations).values({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    scope: input.scope,
    source: input.source ?? "website",
  });
}

export async function listConsultations() {
  const db = await getDb();
  if (!db) throw new Error("Consultation storage is unavailable");
  return db.select().from(consultations).orderBy(desc(consultations.createdAt));
}

export async function updateConsultationStatus(id: number, status: ConsultationStatus) {
  const db = await getDb();
  if (!db) throw new Error("Consultation storage is unavailable");
  await db.update(consultations).set({ status, updatedAt: new Date() }).where(eq(consultations.id, id));
}

export async function listPublicProductOffers() {
  const db = await getDb();
  if (!db) throw new Error("Offer storage is unavailable");
  return db.select().from(productOffers).where(eq(productOffers.public, 1)).orderBy(desc(productOffers.updatedAt));
}

export async function joinProductWaitlist(input: { email: string; productName: string }) {
  const db = await getDb();
  if (!db) throw new Error("Waitlist storage is unavailable");

  await db.insert(productWaitlist).values(input).onDuplicateKeyUpdate({
    set: { productName: input.productName, updatedAt: new Date() },
  });
}
