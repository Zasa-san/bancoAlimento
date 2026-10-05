import { AppError } from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export { UnauthorizedError };
