import { api } from "../lib/axios";
import { LoginSchema, RegisterSchema } from "../schemas/AuthSchemas";

export const authService = {
  login: (data: LoginSchema) => api.post("/auth/login", data),
  register: (data: RegisterSchema) => api.post("/auth/register", data),
};