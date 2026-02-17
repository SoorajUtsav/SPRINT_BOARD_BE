/**
 * server.ts
 *
 * This file is responsible for:
 * - Loading environment variables
 * - Connecting to database
 * - Starting the HTTP server
 *
 * Separation of concerns:
 * - app.ts → configures the Express app
 * - server.ts → bootstraps and starts the application
 */

import dotenv from "dotenv";
import app from "./app";
import connectDB from "./database/connect";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Start Server Function
 * Ensures DB connects before server starts
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening for HTTP requests
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

// Execute server start
startServer();
