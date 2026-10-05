import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { envData } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiRouter } from "./routes/index.js";

const app = express();

app.use(cors({ origin: envData.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(apiRouter);

app.use(errorHandler);

export { app };
