import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/http-errors";

export function validateBody<T extends object>(DtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance = plainToInstance(DtoClass, req.body);
      const errors = await validate(instance);

      if (errors.length > 0) {
        const messages = errors
          .map((e) => Object.values(e.constraints ?? {}))
          .flat();

        throw new BadRequestError("Validation failed", messages);
      }

      req.body = instance;
      next();
    } catch (error) {
      next(error);
    }
  };
}
