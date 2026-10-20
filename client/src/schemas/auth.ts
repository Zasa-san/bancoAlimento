import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ error: "Ingresá un email válido" }),
  password: z.string({ error: "Ingresá tu contraseña" }).min(1, {
    error: "Ingresá tu contraseña",
  }),
});

type LoginInput = z.infer<typeof loginSchema>;

export type { LoginInput };
export { loginSchema };
