import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

import { envData } from "../config/env.js";
import { UnauthorizedError } from "../errors/index.js";
import { User } from "../models/User.js";

async function login(email: string, password: string) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.active) {
    throw new UnauthorizedError();
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    envData.JWT_SECRET,
    {
      expiresIn: envData.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    },
  );

  return { user, token };
}

export { login };
