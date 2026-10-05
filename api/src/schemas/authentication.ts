import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type LoginInput = z.infer<typeof loginSchema>;

export type { LoginInput };
export { loginSchema };
