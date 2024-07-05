import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
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
