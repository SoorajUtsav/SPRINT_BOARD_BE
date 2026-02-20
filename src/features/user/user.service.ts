/**
 * user.service.ts
 *
 * Purpose:
 * - Contains all business logic for User domain.
 * - Completely independent from Express and HTTP.
 * - Uses repository for data access.
 *
 * This layer is the "brain" of the User feature.
 */

import mongoose from "mongoose";
import { AppError } from "../../utils/AppError";
import { UserRepository } from "./user.repository";
import { IUser } from "./user.model";

/**
 * Instantiate repository inside service layer.
 * This keeps dependency explicit and simple.
 */
const userRepository = new UserRepository();

/**
 * PublicUser
 *
 * Defines the safe shape returned outside the service layer.
 * We intentionally exclude sensitive fields like password.
 */
type PublicUser = {
  id: string;
  name: string;
  email: string;
};

/**
 * Helper mapper:
 * Converts raw persistence document → safe public object.
 *
 * Keeps transformation logic centralized.
 */
const toPublicUser = (user: IUser): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export class UserService {

  /**
   * Create new user
   *
   * Business responsibilities:
   * - (Future) Check email uniqueness
   * - Delegate persistence to repository
   * - Return safe public object
   */
  async createUser(data: { name: string; email: string; password: string }) {

    // TODO: Email uniqueness check should call repository.findByEmail()
    // (we will add that next)
    
    const user = await userRepository.create(data);

    // Always return sanitized public object
    return toPublicUser(user);
  }

  /**
   * Fetch all users
   *
   * No business decisions here —
   * just transform persistence data to safe output.
   */
  async getUsers() {
    const users = await userRepository.findAll();

    return users.map(toPublicUser);
  }

  /**
   * Fetch single user by ID
   *
   * Business rules:
   * - Validate ID format
   * - Throw domain error if not found
   */
  async getUserById(id: string) {

    // Domain-level validation (not HTTP-level)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid user ID", 400);
    }

    const user = await userRepository.findById(id);

    // Business interpretation of null
    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toPublicUser(user);
  }

  /**
   * Update user
   *
   * Business responsibilities:
   * - Delegate update to repository
   * - Throw if user doesn't exist
   */
  async updateUserById(
    id: string,
    data: Partial<{ name: string; email: string }>
  ) {
    const user = await userRepository.updateById(id, data);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toPublicUser(user);
  }

  /**
   * Delete user
   *
   * Business responsibility:
   * - Ensure user exists before considering delete successful
   */
  async deleteUserById(id: string) {
    const user = await userRepository.deleteById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // No return needed for delete
  }
}