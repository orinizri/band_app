import { z } from "zod";
import { passwordField, usernameField } from "./fields";

export const registerSchema = z.object({
  username: usernameField,
  password: passwordField,
  instrument: z.string().min(1, "Please select an instrument").optional(),
  role: z.enum(["admin", "player", "singer"]).optional(),
});

export const loginSchema = z.object({
  username: usernameField,
  password: passwordField,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

interface SchemaTypes {
  register: RegisterSchema;
  login: LoginSchema;
}
export function getSchema(
  schemaType: keyof SchemaTypes,
  isAdmin: boolean = false
) {
  switch (schemaType) {
    case "register":
      return isAdmin
        ? registerSchema.omit({ instrument: true }) // No instrument required for admin
        : registerSchema;
    case "login":
    default:
      return loginSchema;
  }
}
