/**
 * user.controller.ts
 *
 * Responsibility:
 * - Handle incoming HTTP requests
 * - Interact with the User model (database layer)
 * - Send structured HTTP responses
 *
 * This file contains business logic only.
 * It does NOT define routes.
 * It does NOT define database schema.
 */

import { Request, Response } from "express";
import User from "./user.model";

/**
 * Create a new user
 *
 * Route: POST /api/users
 * Body: { name: string, email: string }
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        /**
         * Extract data from request body
         * req.body is populated because of express.json() middleware
         */
        const { name, email } = req.body;

        /**
         * Create user in database
         * - Validates schema
         * - Inserts into MongoDB
         * - Returns saved document
         */
        const newUser = await User.create({ name, email });

        /**
         * Send HTTP 201 (Created)
         * Indicates successful resource creation
         */
        return res.status(201).json({
            success: true,
            data: newUser,
        });

    } catch (error) {

        /**
         * If any unexpected error occurs,
         * return 500 Internal Server Error
         */
        return res.status(500).json({
            success: false,
            message: "Failed to create user",
            error,
        });
    }
};

/**
 * Get all users
 *
 * Route: GET /api/users
 */
export const getUsers = async (_req: Request, res: Response) => {
    try {
        /**
         * Fetch all user documents from MongoDB
         * Returns an array
         */
        const users = await User.find();

        /**
         * Send HTTP 200 (OK)
         */
        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {

        /**
         * If database query fails,
         * return 500 error
         */
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error,
        });
    }
};

/**
 * Get single user by ID
 *
 * Route: GET /api/users/:id
 */
export const getUserById = async (req: Request, res: Response) => {
    try {
        /**
         * Extract ID from URL parameters
         * Example: /api/users/123
         */
        const { id } = req.params;

        /**
         * Find user by MongoDB _id
         */
        const user = await User.findById(id);

        /**
         * If user not found, return 404
         */
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        /**
         * If found, return user
         */
        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        /**
         * If invalid ID format or DB error
         */
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

/**
 * Get single user by ID
 *
 * Route: GET /api/users/:id
 */
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        /**
         * Extract ID from URL parameters
         * Example: /api/users/123
         */
        const { id } = req.params;

        /**
         * Find user by MongoDB _id
         */
        const user = await User.findByIdAndDelete(id);

        /**
         * If user not found, return 404
         */
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        /**
         * If found, return user
         */
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        /**
         * If invalid ID format or DB error
         */
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};

/**
 * Update user by ID
 * Route: PUT /api/users/:id
 * Accepts id, body and options
 */
export const updateUserById = async (req: Request, res: Response) => {
    try {
        /**
         * Extract data from request body
         * req.body is populated because of express.json() middleware
         */

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(201).json({
            success: true,
            data: updatedUser,
        });

    } catch (error) {

        /**
         * If any unexpected error occurs,
         * return 500 Internal Server Error
         */
        return res.status(500).json({
            success: false,
            message: "Failed to update user",
            error,
        });
    }
};

