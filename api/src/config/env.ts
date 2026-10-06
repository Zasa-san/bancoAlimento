import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1),
  DB_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  SEED_ADMIN_NAME: z.string().default("Coordinator"),
  SEED_ADMIN_EMAIL: z.email().default("admin@banco.org"),
  SEED_ADMIN_PASSWORD: z.string().min(8).default("admin1234"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.issues);
  process.exit(1);
}

const envData = parsed.data;

export { envData };
