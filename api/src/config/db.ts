import mongoose from "mongoose";

import { envData } from "./env.js";
import { logger } from "./logger.js";

const connectDB = async (): Promise<void> => {
  mongoose.connection.on("connected", () => logger.info("MongoDB connected"));
  mongoose.connection.on("error", (err) =>
    logger.error("MongoDB connection error", err),
  );
  mongoose.connection.on("disconnected", () =>
    logger.warn("MongoDB disconnected"),
  );

  await mongoose.connect(envData.MONGO_URI, {
    dbName: envData.DB_NAME,
    connectTimeoutMS: envData.MONGO_TIMEOUT_MS,
    serverSelectionTimeoutMS: envData.MONGO_TIMEOUT_MS,
  });
};

const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};

export { connectDB, disconnectDB };
