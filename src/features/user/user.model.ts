/**
 * user.model.ts
 *
 * Responsible for:
 * - Defining User schema
 * - Defining TypeScript interface
 * - Exporting Mongoose model
 */

import mongoose, { Document, Schema } from "mongoose";

/**
 * TypeScript Interface
 * Defines shape of User document
 */
export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Schema
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

/**
 * Export Model
 */
const User = mongoose.model<IUser>("User", userSchema);

export default User;
