/**
 * user.model.ts
 *
 * Responsible for:
 * - Defining User schema
 * - Defining TypeScript interface
 * - Exporting Mongoose model
 */

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

/**
 * TypeScript Interface
 * Defines shape of User document
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;


  comparePassword(candidatePassword: string): Promise<boolean>;

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
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔒 never return password by default
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

/**
 * Pre-save hook → hash password
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});


/**
 * Instance method → compare password during login
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Export Model
 */
const User = mongoose.model<IUser>("User", userSchema);

export default User;
