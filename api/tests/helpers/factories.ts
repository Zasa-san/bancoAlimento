import bcrypt from "bcrypt";

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

export { createUser };
