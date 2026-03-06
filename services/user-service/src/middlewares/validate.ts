// middlewares/validate.ts
import { ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodTypeAny, property: 'body' | 'params' | 'query') =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    req[property] = result.data;
    next();
  };
