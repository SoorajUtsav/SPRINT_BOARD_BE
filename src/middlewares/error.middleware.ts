import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

/**
 * Global Error Handling Middleware
 *
 * IMPORTANT:
 * Express identifies this as an error middleware
 * because it has 4 parameters:
 * (err, req, res, next)
 */
export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  /**
   * If error is NOT an instance of our custom AppError,
   * it means something unexpected happened
   * (like a programming bug or server crash)
   */
  if (!(err instanceof AppError)) {
    console.error("UNEXPECTED ERROR:", err);

    return res.status(500).json({
      status: "error",
      message: "Something went wrong - GH",
    });
  }

  /**
   * If error IS AppError,
   * we trust its statusCode and message
   */
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
