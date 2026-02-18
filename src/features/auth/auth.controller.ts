// auth.controller.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";


export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1️⃣ Find user + include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 2️⃣ Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // 3️⃣ Create JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  // 4️⃣ Send response
  res.status(200).json({
    status: "success",
    token,
  });
});
