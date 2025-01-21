import { Request, Response } from "express";

// Error Middleware
const errorMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response
): void => {
  const defaultError = {
    statusCode: 404,
    success: "failed",
    message: err.message || "An error occurred",
  };

  // ValidationError handling
  if (err?.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.message = (Object.values(err.errors) as { message: string }[])
      .map((el) => el.message)
      .join(", ");
  }

  // Duplicate key error handling
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.values(err.keyValue).join(
      ", "
    )} field has to be unique!`;
  }

  res.status(defaultError.statusCode).json({
    success: defaultError.success,
    message: defaultError.message,
  });
};

export default errorMiddleware;
