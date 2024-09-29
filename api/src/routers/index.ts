import express, { Request, Response } from 'express';

const appRouter = express.Router();

appRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello, world !');
});

export default appRouter;