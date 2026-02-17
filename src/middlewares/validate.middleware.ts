import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";
import { AppError } from "../utils/AppError";

/**
 * validate()
 * ----------
 * Reusable Express middleware factory that:
 * 1. Accepts a Zod schema
 * 2. Validates req.body, req.params, and req.query at runtime
 * 3. Converts Zod validation failures into AppError(400)
 * 4. Forwards all errors to the global error middleware
 *
 * This creates a "validation boundary" before controllers execute.
 */
export const validate =
  (schema: ZodTypeAny) => {
    /**
     * Return the actual Express middleware.
     * Explicit return is used for maximum readability of control flow.
     */
    return (req: Request, _res: Response, next: NextFunction) => {
      try {
        /**
         * Run Zod runtime validation.
         *
         * Behavior:
         * - If validation PASSES → execution continues normally
         * - If validation FAILS → Zod throws a ZodError
         */
        schema.parse({
          body: req.body,
          params: req.params,
          query: req.query,
        });

        /**
         * Validation succeeded.
         * Explicit return ensures no further code in this middleware runs.
         */
        return next();
      } catch (error) {
        /**
         * Handle Zod validation errors ONLY.
         * These represent client-side bad input → HTTP 400.
         */
        if (error instanceof ZodError) {
          /**
           * Convert structured Zod issues into a readable single message.
           * Example output:
           * "body.email: Invalid email, body.password: Too short"
           */
          const message = error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(", ");

          /**
           * Forward standardized client error to global error handler.
           * Explicit return prevents accidental fall-through.
           */
          return next(new AppError(message, 400));
        }

        /**
         * Unknown/system error.
         * Must be forwarded unchanged so global handler can process it.
         * Never swallow unexpected errors in production systems.
         */
        return next(error);
      }
    };
  };
