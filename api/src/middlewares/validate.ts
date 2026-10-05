import type { RequestHandler } from "express";
import type { ZodType } from "zod";

interface ValidateSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

const validate =
  (schemas: ValidateSchemas): RequestHandler =>
  (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        Object.assign(req.params, schemas.params.parse(req.params));
      }

      if (schemas.query) {
        Object.assign(req.query, schemas.query.parse(req.query));
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export { validate };
