import mongoose from "mongoose";
import { afterAll, beforeAll, beforeEach } from "vitest";

const clearDatabase = async (): Promise<void> => {
  const collections = Object.values(mongoose.connection.collections);
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: process.env.DB_NAME,
  });
});

beforeEach(clearDatabase);

afterAll(async () => {
  await mongoose.disconnect();
});
