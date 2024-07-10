import { UserRole } from "@prisma/client";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  // code: z.optional(z.string().min(1)),
  code: z.optional(z.string()),
});

export const resetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must have minimum 6 characters" }),
  name: z.string().min(1, { message: "Name is required!" }),
});

export const newPassword = z.object({
  password: z
    .string()
    .min(6, { message: "Password must have minimum 6 characters" }),
});

export const settingSchma = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorAuthenticated: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  );
