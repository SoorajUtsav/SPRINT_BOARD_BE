/**
 * app.ts
 *
 * This file is responsible for:
 * - Creating the Express application
 * - Registering global middlewares
 * - Registering feature routes
 *
 * It does NOT start the server.
 * Server startup logic lives in server.ts
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import feature routes
import userRoutes from "./features/user/user.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";

// Create Express application instance
const app = express();

/**
 * Global Middlewares
 */

// Adds security-related HTTP headers
app.use(helmet());

// Enables Cross-Origin Resource Sharing
app.use(cors());

// Logs HTTP requests in development mode
app.use(morgan("dev"));

// Parses incoming JSON request bodies
app.use(express.json());

/**
 * Health Check Route
 * Used to verify that server is running properly
 */
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

/**
 * Register Feature Routes
 *
 * This mounts all routes defined inside:
 * user.routes.ts
 *
 * Base path: /api/users
 */
app.use("/api/users", userRoutes);
app.use(globalErrorHandler);


/**
 * Export the configured app
 * Server will import this and start listening
 */
export default app;
