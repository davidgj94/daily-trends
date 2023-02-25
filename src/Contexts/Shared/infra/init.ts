import mongoose from "mongoose";
import config from "./config";

export const startDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(`Connected to Mongo after ${process.uptime().toFixed(3)}s.`);
  } catch (error) {
    console.error(`Error connecting to Mongo:`, error);
    process.exit(1);
  }
};
