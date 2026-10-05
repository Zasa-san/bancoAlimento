import { Router } from "express";

import { loginController } from "../controllers/authentication.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/authentication.js";

const authRouter = Router();

authRouter.post("/login", validate({ body: loginSchema }), loginController);

export { authRouter };
