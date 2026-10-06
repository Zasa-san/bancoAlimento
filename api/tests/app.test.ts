import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../src/app.js";

describe("app", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("Returns 404 for an unknown route", async () => {
    const res = await request(app).get("/does-not-exist");

    expect(res.status).toBe(404);
  });
});
