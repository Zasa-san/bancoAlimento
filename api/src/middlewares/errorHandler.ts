import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { logger } from "../config/logger.js";
import { AppError } from "../errors/index.js";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION",
        message: "Validation error",
        details: err.issues,
      },
    });
    return;
  }

  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ error: { code: err.code, message: err.message } });
    return;
  }

  logger.error("Unhandled error", err);

  res
    .status(500)
    .json({ error: { code: "INTERNAL", message: "Internal server error" } });
};

export { errorHandler };
