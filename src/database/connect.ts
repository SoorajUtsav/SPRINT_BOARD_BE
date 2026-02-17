/**
 * connect.ts
 *
 * Responsible for:
 * - Connecting application to MongoDB
 * - Handling connection errors
 *
 * This file exports a function that server.ts will call
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB
 * Uses MONGO_URI from environment variables
 */
const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
