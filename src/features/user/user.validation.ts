import { z } from "zod";

/**
 * Base user fields schema
 * -----------------------
 * Contains reusable validation rules for user properties.
 */
const userBaseSchema = {
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
};

/**
 * Create User Schema
 * ------------------
 * All fields are REQUIRED when creating a user.
 */
export const createUserSchema = z.object({
  body: z.object(userBaseSchema),
});

/**
 * Update User Schema (PATCH)
 * --------------------------
 * - All fields OPTIONAL
 * - But at least ONE field must be provided
 */
export const updateUserSchema = z.object({
  body: z
    .object(userBaseSchema)
    .partial() // makes all fields optional
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

/**
 * Params validation for :id routes
 */
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});
