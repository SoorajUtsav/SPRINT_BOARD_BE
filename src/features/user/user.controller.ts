/**
 * user.controller.ts
 *
 * Handles HTTP only.
 * Delegates all business logic to UserService.
 */

import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { UserService } from "./user.service";

const userService = new UserService();

/**
 * POST /api/users
 */
export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  }
);

/**
 * GET /api/users
 */
export const getUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await userService.getUsers();

    res.status(200).json({
      status: "success",
      data: users,
    });
  }
);

/**
 * GET /api/users/:id
 */

interface UserIdParams {
  id: string;
}

export const getUserById = asyncHandler(
  async (req: Request<UserIdParams>, res: Response) => {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

/**
 * PATCH /api/users/:id
 */
export const updateUserById = asyncHandler(
  async (req: Request<UserIdParams>, res: Response) => {
    const user = await userService.updateUserById(
      req.params.id,
      req.body
    );

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

/**
 * DELETE /api/users/:id
 */
export const deleteUserById = asyncHandler(
  async (req: Request<UserIdParams>, res: Response) => {
    await userService.deleteUserById(req.params.id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  }
);