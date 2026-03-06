import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http-errors";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
  }

  console.error(`[Unhandled Error]: ${error.message}`);
  return res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
  });
}
