import authRouter from '@/routers/auth.router';
import express, { Request, Response } from 'express';

const appRouter = express.Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello, world !');
});

appRouter.use('/users', authRouter);

export default appRouter;