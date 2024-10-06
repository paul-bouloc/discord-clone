import { ConflictException } from '@constants/exceptions/conflict.exception';
import { UnauthorizedException } from '@constants/exceptions/unauthorized.exception';
import { loginDto, registerDto } from '@dtos/auth.dtos';
import AuthService from '@services/auth.service';
import UserService from '@services/user.service';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

/**
 * @description Register a new user
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body as registerDto;
  
  const existingUser = await UserService.findByEmailOrUsername(email, username);
  if (existingUser) throw new ConflictException('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await AuthService.create({username, email, password: hashedPassword});

  const {avatar_data, avatar_type, ...returnedUser} = user;

  res.status(201).json(returnedUser);
}

/**
 * @description Login a user
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body as loginDto

  const user = await AuthService.login(email, password)

  if(!user) throw new UnauthorizedException('Invalid credentials')

  const token = AuthService.generateJwtToken(user.id)

  res.status(200).cookie('session', token).json(user)
}

/**
 * @description Logout a user
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).clearCookie('session').json({message: 'Logged out successfully'})
}
