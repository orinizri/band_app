import { api } from "../lib/axios";
import { RegisterSchema } from "@/schemas/AuthSchemas";

export const authService = {
  register: (data: RegisterSchema) => {
    return api.post("/auth/register", data);
  },
  login: (data: { username: string; password: string }) => {
    return api.post("/auth/login", data);
  },
};
