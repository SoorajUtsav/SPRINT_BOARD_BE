/**
 * user.routes.ts
 *
 * Responsibility:
 * - Define all HTTP endpoints related to Users
 * - Map routes to controller functions
 *
 * This file does NOT contain business logic.
 * It only connects URLs to controllers.
 */

import { Router } from "express";
import { createUser, getUsers, getUserById,deleteUserById,updateUserById } from "./user.controller";

/**
 * Create a new Express Router instance
 *
 * Router allows grouping related routes together.
 * Think of it as a mini express app for "user" feature.
 */
const router = Router();

/**
 * POST /
 *
 * This means:
 * When a POST request hits the base route,
 * call createUser controller.
 *
 * Full route becomes:
 * POST /api/users
 * (because it is mounted in app.ts)
 */
router.post("/", createUser);

/**
 * GET /
 *
 * Fetch all users.
 *
 * Full route becomes:
 * GET /api/users
 */
router.get("/", getUsers);

/**
 * GET /:id
 *
 * Fetch single user by ID
 */
router.get("/:id", getUserById);

/**
 * GET /:id
 *
 * Delete single user by ID
 */
router.delete("/:id", deleteUserById);

/**
 * PUT /:id
 *
 * Update user by ID
 */
router.put("/:id", updateUserById);

/**
 * Export router so it can be registered in app.ts
 */
export default router;
