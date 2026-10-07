import * as z from "zod";

export const RegisterValidator = z.object({
  name: z.string().min(1).max(20),
  email: z.email().min(1),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, { message: "Must contain one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain one number" })
    .regex(/[!@#$%^&*]/, { message: "Must contain one special character" }),
});
