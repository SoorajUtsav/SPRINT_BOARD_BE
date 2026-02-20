/**
 * user.repository.ts
 *
 * Handles only data persistence for User.
 * No business logic. No HTTP concerns.
 */

import User, { IUser } from "./user.model";

export class UserRepository {

  // Create new user document
  async create(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }

  // Fetch all users
  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  // Find user by ID (returns null if not found)
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  // Update user and return updated document
  async updateById(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Delete user and return deleted document
  async deleteById(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}