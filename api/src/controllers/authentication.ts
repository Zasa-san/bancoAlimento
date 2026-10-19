import type { RequestHandler } from "express";

import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  authCookieOptions,
} from "../config/index.js";
import type { LoginInput } from "../schemas/index.js";
import { login } from "../services/index.js";
import { toUserDto } from "../types/index.js";

const loginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body as LoginInput;
  const { user, token } = await login(email, password);

  res.cookie(AUTH_COOKIE_NAME, token, {
    ...authCookieOptions,
    maxAge: AUTH_COOKIE_MAX_AGE,
  });

  res.status(200).json({ user: toUserDto(user) });
};

const meController: RequestHandler = (req, res) => {
  res.status(200).json({ user: req.user });
};

const logoutController: RequestHandler = (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions);
  res.status(204).end();
};

export { loginController, logoutController, meController };
