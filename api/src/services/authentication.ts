import bcrypt from "bcrypt";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import { envData } from "../config/index.js";
import { UnauthorizedError } from "../errors/index.js";
import { User } from "../models/index.js";
import type { TokenPayload } from "../types/index.js";

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

const verifyToken = (token: string): TokenPayload => {
  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(token, envData.JWT_SECRET);
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }

  if (typeof payload === "string" || typeof payload.sub !== "string") {
    throw new UnauthorizedError("Invalid or expired token");
  }

  return { sub: payload.sub, role: payload.role };
};

async function getActiveUserById(id: string) {
  if (!isValidObjectId(id)) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const user = await User.findById(id);

  if (!user || !user.active) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  return user;
}

export { getActiveUserById, login, verifyToken };
