import authRouter from '@/routers/auth.router';
import userRouter from '@routers/user.router';
import express, { Request, Response } from 'express';

const appRouter = express.Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello, world !');
});

appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);

export default appRouter;