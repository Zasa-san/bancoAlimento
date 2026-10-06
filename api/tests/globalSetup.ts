import { MongoMemoryReplSet } from "mongodb-memory-server";

let replset: MongoMemoryReplSet | undefined;

const setup = async () => {
  replset = await MongoMemoryReplSet.create({ replSet: { count: 1 } });

  process.env.MONGO_URI = replset.getUri();
  process.env.DB_NAME = "bancoAlimento_test";
  process.env.NODE_ENV = "test";

  return async () => {
    await replset?.stop();
  };
};

export default setup;
