import AuthService from '@services/auth.service';
import UserService from '@services/user.service';
import { NextFunction, Request, Response } from 'express';

const extractUserFromJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.session;
    if (!token) {
      req.user = null;
      return next();
    }

    const userId = AuthService.verifyJwtToken(token);
    if (!userId) {
      req.user = null;
      return next();
    }

    const user = await UserService.findById(userId);
    req.user = user || null;
    next();
  } catch (error) {
    console.error('Erreur dans extractUserFromJwt:', error);
    res.clearCookie("session");
    res.status(401).json({
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
      code: 401,
    });
  }
};

export default extractUserFromJwt;