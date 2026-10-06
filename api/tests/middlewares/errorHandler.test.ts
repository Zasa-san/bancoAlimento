import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { errorHandler } from "../../src/middlewares/errorHandler.js";

const buildApp = () => {
  const app = express();

  app.get("/boom", () => {
    throw new Error("boom");
  });

  app.use(errorHandler);

  return app;
};

describe("errorHandler", () => {
  it("Returns 500 for an unhandled error", async () => {
    const res = await request(buildApp()).get("/boom");

    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe("INTERNAL");
  });
});
