import { errorHandler } from '@/middlewares/error-handler.middleware';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world !');
});

app
  .use(helmet())
  .use(cors({credentials: true}))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(errorHandler);



export default app;