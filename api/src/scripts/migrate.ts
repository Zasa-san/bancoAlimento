import { connectDB, disconnectDB } from "../config/db.js";
import { logger } from "../config/logger.js";
import { runMigrations } from "../migrations/runner.js";

const run = async (): Promise<void> => {
  await connectDB();
  await runMigrations();
  await disconnectDB();
};

run().catch((err) => {
  logger.error("Migrations failed", err);
  process.exit(1);
});
