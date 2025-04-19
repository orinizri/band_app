import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password is required")
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password is required"),
  instrument: z.string().min(1, "Instrument is required")
});

export type RegisterSchema = z.infer<typeof registerSchema>;