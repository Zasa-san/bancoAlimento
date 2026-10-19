import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../../src/app.js";
import { envData } from "../../src/config/env.js";
import { User } from "../../src/models/User.js";
import { createUser, loginAs } from "../helpers/factories.js";

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
    expect(res.headers["set-cookie"]?.[0]).toMatch(
      `${envData.AUTH_COOKIE_NAME}=`,
    );
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

describe("GET /auth/me", () => {
  it("Returns the authenticated user with a valid cookie", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });
    const cookie = await loginAs("coord@banco.org", "secret123");

    const res = await request(app).get("/auth/me").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.user).toMatchObject({
      email: "coord@banco.org",
      role: "coordinator",
    });
    expect(res.body.user).not.toHaveProperty("passwordHash");
  });

  it("Returns 401 without a cookie", async () => {
    const res = await request(app).get("/auth/me");

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 401 with a malformed token", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set("Cookie", `${envData.AUTH_COOKIE_NAME}=basura`);

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 401 with an expired token", async () => {
    const user = await createUser({
      email: "coord@banco.org",
      password: "secret123",
    });
    const expired = jwt.sign(
      { sub: user.id, role: user.role },
      envData.JWT_SECRET,
      { expiresIn: "-1s" },
    );

    const res = await request(app)
      .get("/auth/me")
      .set("Cookie", `${envData.AUTH_COOKIE_NAME}=${expired}`);

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("Returns 401 when the user was deactivated after login", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });
    const cookie = await loginAs("coord@banco.org", "secret123");
    await User.updateOne({ email: "coord@banco.org" }, { active: false });

    const res = await request(app).get("/auth/me").set("Cookie", cookie);

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});

describe("POST /auth/logout", () => {
  it("Returns 204 and clears the auth cookie", async () => {
    await createUser({ email: "coord@banco.org", password: "secret123" });
    const cookie = await loginAs("coord@banco.org", "secret123");

    const res = await request(app).post("/auth/logout").set("Cookie", cookie);

    expect(res.status).toBe(204);
    const setCookie = res.headers["set-cookie"]?.[0] ?? "";
    expect(setCookie).toMatch(new RegExp(`^${envData.AUTH_COOKIE_NAME}=;`));
    expect(setCookie).toMatch(/HttpOnly/);
  });

  it("Returns 401 without a cookie", async () => {
    const res = await request(app).post("/auth/logout");

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });
});
