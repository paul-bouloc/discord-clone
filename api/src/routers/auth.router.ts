import { login, logout, register } from '@/controllers/auth.controller';
import { loginDto, registerDto } from '@/dtos/auth.dtos';
import { validateData } from '@/middlewares/validate-dto.middleware';
import { tryCatch } from '@/utils';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', validateData(registerDto), tryCatch(register));
authRouter.post('/login', validateData(loginDto), tryCatch(login));
authRouter.post('/logout', tryCatch(logout));

export default authRouter;