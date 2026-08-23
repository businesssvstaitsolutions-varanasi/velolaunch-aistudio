import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { createConsultation, listConsultations, updateConsultationStatus } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const consultationInputSchema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(120),
  email: z.string().trim().email("Please add a valid email").max(320),
  scope: z.string().trim().min(16, "A little more project context helps us prepare").max(2000),
  website: z.string().max(0).optional(),
});

const consultationStatusSchema = z.enum(["new", "reviewing", "closed"]);

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
      await createConsultation({ name: input.name, email: input.email, scope: input.scope });
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
});

export type AppRouter = typeof appRouter;
