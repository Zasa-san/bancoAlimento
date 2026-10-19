import { Router } from "express";

import {
  loginController,
  logoutController,
  meController,
} from "../controllers/index.js";
import { requireAuth, validate } from "../middlewares/index.js";
import { loginSchema } from "../schemas/index.js";

const authRouter = Router();

authRouter.post("/login", validate({ body: loginSchema }), loginController);
authRouter.get("/me", requireAuth, meController);
authRouter.post("/logout", requireAuth, logoutController);

export { authRouter };
