import mongoose from "mongoose";
import { closeDB, startDB } from "Shared/infra/persistence/mongo/init";

const cleanDb = async () => {
  const db = mongoose.connection.db;

  // Get all collections
  const collections = await db.listCollections().toArray();

  // Create an array of collection names and drop each collection
  collections
    .map((collection) => collection.name)
    .forEach(async (collectionName) => {
      db.dropCollection(collectionName);
    });
};

beforeAll(async () => {
  await startDB();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  closeDB();
});
