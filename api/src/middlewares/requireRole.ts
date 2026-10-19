import type { RequestHandler } from "express";

import { ForbiddenError, UnauthorizedError } from "../errors/index.js";
import type { UserRole } from "../models/index.js";

const requireRole =
  (...roles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError();
    }

    next();
  };

export { requireRole };
