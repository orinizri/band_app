import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  instrument: z.string().min(1, "Please select an instrument"),
});

export const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
