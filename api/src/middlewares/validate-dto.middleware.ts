import { BadRequestException } from '@/constants/exceptions/bad-request.exception';
import { InternalServerErrorException } from '@/constants/exceptions/internal-server-error.exception';
import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData; // Remplacer le corps de la requête par les données validées
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(issue => issue.message);
        next(new BadRequestException('Erreur de validation des données', errorMessages));
      } else {
        console.error('Erreur inattendue dans validateData:', error);
        next(new InternalServerErrorException('Erreur interne du serveur lors de la validation'));
      }
    }
  };
}