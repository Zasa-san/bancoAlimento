import { initialSeed } from "./0000-initial-seed.js";
import type { Migration } from "./types.js";

const migrations: Migration[] = [initialSeed];

export { migrations };
