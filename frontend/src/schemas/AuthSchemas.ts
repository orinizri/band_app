import { z } from "zod";
import { passwordField, usernameField } from "./fields";

export const registerSchema = z.object({
  username: usernameField,
  password: passwordField,
  instrument: z.string().min(1, "Please select an instrument").optional(),
});

export const loginSchema = z.object({
  username: usernameField,
  password: passwordField,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export function getRegisterSchema(isAdmin: boolean) {
  return isAdmin
    ? registerSchema.omit({ instrument: true }) // No instrument required for admin
    : registerSchema;
}
