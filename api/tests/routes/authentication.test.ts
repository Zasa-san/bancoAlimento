import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../../src/app.js";
import { createUser } from "../helpers/factories.js";

describe("POST /auth/login", () => {
  it("Sets the cookie and returns 200", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "coord@banco.org", password: "secret123" });

    expect(res.status).toBe(200);
    expect(res.body.user).toMatchObject({
      email: "coord@banco.org",
      role: "coordinator",
    });
    expect(res.body.user).not.toHaveProperty("passwordHash");
    expect(res.headers["set-cookie"]?.[0]).toMatch(/token=/);
  });

  it("Returns 200 when the email has a different case", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "COORD@BANCO.ORG", password: "secret123" });

    expect(res.status).toBe(200);
  });

  it("Returns 401 with a wrong password", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "coord@banco.org", password: "wrong-password" });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 401 when the user does not exist", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "nobody@banco.org", password: "secret123" });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 401 when the user is inactive", async () => {
    await createUser({
      email: "coord@banco.org",
      password: "secret123",
      active: false,
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "coord@banco.org", password: "secret123" });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 400 with an invalid body", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION");
  });
});
