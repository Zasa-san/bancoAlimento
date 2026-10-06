import { logger } from "../config/logger.js";
import { Migration as MigrationModel } from "../models/Migration.js";
import { migrations } from "./migrations.js";

const runMigrations = async (): Promise<void> => {
  for (const migration of migrations) {
    const alreadyApplied = await MigrationModel.exists({ name: migration.name });
    if (alreadyApplied) {
      logger.info(`Migration already applied (${migration.name})`);
      continue;
    }

    await migration.up();
    await MigrationModel.create({ name: migration.name });
    logger.info(`Migration applied (${migration.name})`);
  }
};

export { runMigrations };
