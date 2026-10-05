import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { envData } from "./env.js";

const fileFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json(),
);

const logger = createLogger({
  level: envData.NODE_ENV === "production" ? "info" : "debug",
  format: fileFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { logger };
