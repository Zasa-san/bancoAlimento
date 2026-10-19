import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { errorHandler } from "../../src/middlewares/errorHandler.js";
import { requireRole } from "../../src/middlewares/requireRole.js";
import type { UserRole } from "../../src/models/User.js";

const buildApp = (role: UserRole | undefined, allowed: UserRole[]) => {
  const app = express();

  app.get(
    "/protected",
    (req, _res, next) => {
      if (role) {
        req.user = { id: "1", name: "Test", email: "t@banco.org", role };
      }
      next();
    },
    requireRole(...allowed),
    (_req, res) => {
      res.status(200).json({ ok: true });
    },
  );

  app.use(errorHandler);

  return app;
};

describe("requireRole", () => {
  it("Calls next when the user has an allowed role", async () => {
    const res = await request(buildApp("coordinator", ["coordinator"])).get(
      "/protected",
    );

    expect(res.status).toBe(200);
  });

  it("Returns 403 when the user role is not allowed", async () => {
    const res = await request(buildApp("volunteer", ["coordinator"])).get(
      "/protected",
    );

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("FORBIDDEN");
  });

  it("Returns 401 when there is no authenticated user", async () => {
    const res = await request(buildApp(undefined, ["coordinator"])).get(
      "/protected",
    );

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});
