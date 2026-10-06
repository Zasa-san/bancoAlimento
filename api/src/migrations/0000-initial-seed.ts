import bcrypt from "bcrypt";

import { envData } from "../config/env.js";
import { User } from "../models/User.js";
import type { Migration } from "./types.js";

const up = async (): Promise<void> => {
  const email = envData.SEED_ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(envData.SEED_ADMIN_PASSWORD, 10);

  await User.updateOne(
    { email },
    {
      $setOnInsert: {
        name: envData.SEED_ADMIN_NAME,
        email,
        passwordHash,
        role: "coordinator",
        active: true,
      },
    },
    { upsert: true },
  );
};

const initialSeed: Migration = { name: "0000-initial-seed", up };

export { initialSeed };
