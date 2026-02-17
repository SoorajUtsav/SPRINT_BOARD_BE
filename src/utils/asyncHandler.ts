import { Request, Response, NextFunction } from "express";

/**
 * Wraps async controller functions
 * and forwards errors to Express global error handler
 */
export const asyncHandler =
  (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
