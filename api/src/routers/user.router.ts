import { validateData } from '@/middlewares/validate-dto.middleware';
import { tryCatch } from '@/utils';
import { updateUsername, updateEmail, updatePassword, updateAvatar } from '@controllers/user.controller';
import { userAvatarDto, userEmailDto, userNameDto, userPasswordDto } from '@dtos/user.dto';
import isAuthenticated from '@middlewares/is-authenticated.middleware';
import express from 'express';

const userRouter = express.Router();

userRouter.put('/username', validateData(userNameDto), isAuthenticated, tryCatch(updateUsername));
userRouter.put('/email', validateData(userEmailDto), isAuthenticated, tryCatch(updateEmail));
userRouter.put('/password', validateData(userPasswordDto), isAuthenticated, tryCatch(updatePassword));
userRouter.put('/avatar', validateData(userAvatarDto),isAuthenticated, tryCatch(updateAvatar));

export default userRouter;