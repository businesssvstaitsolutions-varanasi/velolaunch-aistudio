import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createConsultation, joinProductWaitlist, listConsultations, listPublicProductOffers, updateConsultationStatus } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const consultationInputSchema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(120),
  email: z.string().trim().email("Please add a valid email").max(320),
  phone: z.string().trim().regex(/^[+()\d][+()\d\s.-]{5,31}$/, "Please add a valid callback number").max(32).optional(),
  scope: z.string().trim().min(16, "A little more project context helps us prepare").max(2000),
  source: z.enum(["website", "callback-popup"]).optional(),
  website: z.string().max(0).optional(),
});

const consultationStatusSchema = z.enum(["new", "reviewing", "closed"]);
const forthcomingProductNames = [
  "Apex Turbo Smart Tab Organizer and Memory Saver",
  "FinAura AI - Powered Finance Vault",
  "PlutoLearn AI - Powered EdTech Platform",
  "VeloTools - 1000+ Powerful Tools",
] as const;

export const productWaitlistInputSchema = z.object({
  email: z.string().trim().email("Please add a valid email").max(320),
  productName: z.enum(forthcomingProductNames),
  website: z.string().max(0).optional(),
});

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Operations access is restricted" });
  }
  return next();
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  consultations: router({
    create: publicProcedure.input(consultationInputSchema).mutation(async ({ input }) => {
      if (input.website) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid request" });
      await createConsultation({ name: input.name, email: input.email, phone: input.phone, scope: input.scope, source: input.source });
      return { accepted: true } as const;
    }),
    list: adminProcedure.query(() => listConsultations()),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: consultationStatusSchema }))
      .mutation(async ({ input }) => {
        await updateConsultationStatus(input.id, input.status);
        return { success: true } as const;
      }),
  }),
  offers: router({
    listPublic: publicProcedure.query(() => listPublicProductOffers()),
  }),
  waitlist: router({
    create: publicProcedure.input(productWaitlistInputSchema).mutation(async ({ input }) => {
      if (input.website) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid request" });
      await joinProductWaitlist({ email: input.email, productName: input.productName });
      return { accepted: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
