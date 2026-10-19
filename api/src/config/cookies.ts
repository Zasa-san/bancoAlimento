import { envData } from "./env.js";

const AUTH_COOKIE_NAME = envData.AUTH_COOKIE_NAME;
const AUTH_COOKIE_MAX_AGE = envData.AUTH_COOKIE_MAX_AGE_MS;

const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: envData.NODE_ENV === "production",
  path: "/",
};

export { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME, authCookieOptions };
