import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  instrument: z.string().min(1, "Instrument is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;