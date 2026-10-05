import { Router } from "express";

import { authRouter } from "./authentication.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export { apiRouter };
