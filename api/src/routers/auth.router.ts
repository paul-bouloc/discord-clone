import { register } from '@/controllers/auth.controller';
import { registerDto } from '@/dtos/auth.dtos';
import { validateData } from '@/middlewares/validate-dto.middleware';
import { tryCatch } from '@/utils';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/', validateData(registerDto), tryCatch(register));

export default authRouter;