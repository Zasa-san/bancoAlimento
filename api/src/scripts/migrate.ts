import { connectDB, disconnectDB, logger } from "../config/index.js";
import { runMigrations } from "../migrations/index.js";

const run = async (): Promise<void> => {
  await connectDB();
  await runMigrations();
  await disconnectDB();
};

run().catch((err) => {
  logger.error("Migrations failed", err);
  process.exit(1);
});
