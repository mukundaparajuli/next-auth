"use server";

import { z } from "zod";
import { loginSchema } from "../schemas";

export const Login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials!" };
  }
  return { success: "Email sent" };
};
