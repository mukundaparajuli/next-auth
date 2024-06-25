"use server";

import { z } from "zod";
import { registerSchema } from "../schemas";

export const Register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Credentials!" };
  }
  return { success: "Email sent" };
};
