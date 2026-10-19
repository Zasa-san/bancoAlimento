import { app } from "./app.js";
import { connectDB, envData, logger } from "./config/index.js";

const start = async (): Promise<void> => {
  await connectDB();

  app.listen(envData.PORT, () => {
    logger.info(`API started at http://localhost:${envData.PORT}`);
  });
};

start().catch((err) => {
  logger.error("API could not start", err);
  process.exit(1);
});
