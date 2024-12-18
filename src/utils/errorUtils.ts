type AppErrorTypes = "conflict" | "not_found" | "unauthorized" | "wrong_schema";

export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "conflict") return 409;
  if (type === "not_found") return 404;
  if (type === "unauthorized") return 401;
  if (type === "wrong_schema") return 422;
  
  return 400;
}

export function conflictError(message: string = "Conflict error"): AppError {
  return { type: "conflict", message };
}

export function notFoundError(message: string = "Not found error"): AppError {
  console.log(message)
  return { type: "not_found", message };
}

export function unauthorizedError(message: string = "Unauthorized error"): AppError {
  return { type: "unauthorized", message };
}

export function wrongSchemaError(message: string = "Wrong schema error"): AppError {
  return { type: "wrong_schema", message };
}
