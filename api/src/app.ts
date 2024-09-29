import { errorHandler } from '@/middlewares/error-handler.middleware';
import appRouter from '@/routers';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';

const app: Express = express();

app
  .use(helmet())
  .use(cors({credentials: true}))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(appRouter)
  .use(errorHandler);

export default app;