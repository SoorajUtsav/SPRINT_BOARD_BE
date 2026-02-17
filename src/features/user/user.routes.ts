import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./user.controller";

import { validate } from "../../middlewares/validate.middleware";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "./user.validation";

const router = Router();

/**
 * CREATE USER
 * -----------
 * Validation runs BEFORE controller.
 */
router.post(
  "/",
  validate(createUserSchema),
  createUser
);

/**
 * GET ALL USERS
 * -------------
 * No validation needed (no body/params).
 */
router.get("/", getUsers);

/**
 * GET USER BY ID
 * --------------
 * Validate route params before controller executes.
 */
router.get(
  "/:id",
  validate(userIdParamSchema),
  getUserById
);

/**
 * UPDATE USER (PATCH semantics)
 * -----------------------------
 * Validate BOTH:
 * - params (:id)
 * - body (partial update rules)
 */
router.patch(
  "/:id",
  validate(userIdParamSchema),
  validate(updateUserSchema),
  updateUserById
);

/**
 * DELETE USER
 * -----------
 * Only params validation required.
 */
router.delete(
  "/:id",
  validate(userIdParamSchema),
  deleteUserById
);

export default router;
