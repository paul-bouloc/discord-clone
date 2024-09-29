import { ConflictException } from '@/constants/exceptions/conflict.exception';
import { registerDto } from '@/dtos/auth.dtos';
import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body as registerDto;
  
  const existingUser = await UserService.findByEmailOrUsername(email, username);
  if (existingUser) throw new ConflictException('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await AuthService.create({username, email, password: hashedPassword});

  const {avatar_data, avatar_type, ...returnedUser} = user;

  res.status(201).json(returnedUser);
}