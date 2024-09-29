import { BadRequestException } from '@/constants/exceptions/bad-request.exception';
import { InternalServerErrorException } from '@/constants/exceptions/internal-server-error.exception';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map(issue => issue.message)
        throw new BadRequestException('Error validating data', errorMessages);
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  };
}