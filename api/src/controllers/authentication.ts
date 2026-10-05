import type { RequestHandler } from "express";

import { envData } from "../config/env.js";
import type { LoginInput } from "../schemas/authentication.js";
import { login } from "../services/authentication.js";
import { toUserDto } from "../types/user.js";

const COOKIE_NAME = "token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const loginController: RequestHandler = async (req, res) => {
  const { email, password } = req.body as LoginInput;
  const { user, token } = await login(email, password);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: envData.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });

  res.status(200).json({ user: toUserDto(user) });
};

export { loginController };
