import { int, mysqlEnum, mysqlTable, text, timestamp, unique, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  scope: text("scope").notNull(),
  status: mysqlEnum("status", ["new", "reviewing", "closed"]).default("new").notNull(),
  source: varchar("source", { length: 48 }).default("website").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const productOffers = mysqlTable("productOffers", {
  id: int("id").autoincrement().primaryKey(),
  productName: varchar("productName", { length: 180 }).notNull(),
  productSlug: varchar("productSlug", { length: 180 }).notNull().unique(),
  summary: text("summary").notNull(),
  askingPrice: varchar("askingPrice", { length: 64 }).notNull(),
  currency: varchar("currency", { length: 8 }).notNull(),
  leadingBid: varchar("leadingBid", { length: 64 }),
  bidCount: int("bidCount").default(0).notNull(),
  status: mysqlEnum("status", ["open", "review", "closed"]).default("review").notNull(),
  public: int("public").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const productWaitlist = mysqlTable("productWaitlist", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  productName: varchar("productName", { length: 180 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [
  unique("productWaitlist_email_productName_unique").on(table.email, table.productName),
]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Consultation = typeof consultations.$inferSelect;
export type ConsultationStatus = Consultation["status"];
export type ProductOffer = typeof productOffers.$inferSelect;
export type ProductWaitlist = typeof productWaitlist.$inferSelect;
