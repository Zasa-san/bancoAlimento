import type { RequestHandler } from "express";

import { AUTH_COOKIE_NAME } from "../config/index.js";
import { UnauthorizedError } from "../errors/index.js";
import { getActiveUserById, verifyToken } from "../services/index.js";
import { toUserDto } from "../types/index.js";

const requireAuth: RequestHandler = async (req, _res, next) => {
  const token: unknown = req.cookies?.[AUTH_COOKIE_NAME];

  if (typeof token !== "string" || token.length === 0) {
    throw new UnauthorizedError("Authentication required");
  }

  const { sub } = verifyToken(token);

  const user = await getActiveUserById(sub);

  req.user = toUserDto(user);
  next();
};

export { requireAuth };
