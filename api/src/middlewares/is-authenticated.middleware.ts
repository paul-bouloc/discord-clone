import { UnauthorizedException } from '@constants/exceptions/unauthorized.exception';
import { NextFunction, Response, Request } from 'express';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) return next();
  return next(new UnauthorizedException('User is not authenticated'));
}

export default isAuthenticated;