import bcrypt from "bcrypt";
import request from "supertest";

import { app } from "../../src/app.js";
import { User, type UserRole } from "../../src/models/User.js";

interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  active?: boolean;
}

const createUser = async ({
  email,
  password,
  name = "Test user",
  role = "coordinator",
  active = true,
}: CreateUserInput) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return User.create({ name, email, passwordHash, role, active });
};

const loginAs = async (email: string, password: string): Promise<string> => {
  const res = await request(app).post("/auth/login").send({ email, password });

  const cookie = res.headers["set-cookie"]?.[0] ?? "";
  return cookie.split(";")[0];
};

export { createUser, loginAs };
