import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-errors';

export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error',
  });
}
