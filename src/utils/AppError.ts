/**
 * Custom Error Class
 * Used to create operational errors with status codes
 * 
 * Example Error Object:
 * {
  name: "AppError",                 // Inherited from Error class
  message: "User not found",        // Passed into constructor
  statusCode: 404,                  // Custom property we defined
  status: "fail",                   // Auto-derived (4xx → "fail")
  isOperational: true,              // Marked as expected error
  stack: "AppError: User not found
          at getUserById (/src/features/user/user.controller.ts:32:11)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
 */

export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
