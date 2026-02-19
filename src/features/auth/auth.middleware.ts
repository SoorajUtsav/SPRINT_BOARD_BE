import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { AuthenticatedUser } from "./auth.types";
import User from "../user/user.model";

interface JwtPayload {
  userId: string;
}

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    /**
     * 1️⃣ Extract Authorization header
     */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    /**
     * 2️⃣ Extract token
     */
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    /**
     * 3️⃣ Verify JWT
     */
    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
    } catch {
      throw new AppError("Unauthorized", 401);
    }

    /**
     * 4️⃣ Fetch user from DB
     */
    const user = await User.findById(decoded.userId).select("email role");

    if (!user) {
      throw new AppError("Unauthorized", 401);
    }

    /**
     * 5️⃣ Attach minimal identity to request
     */
    const authUser: AuthenticatedUser = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    req.user = authUser;

    /**
     * 6️⃣ Continue to controller
     */
    next();
  }
);
