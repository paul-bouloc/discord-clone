import { errorHandler } from "@/middlewares/error-handler.middleware";
import appRouter from "@/routers";
import extractUserFromJwt from "@middlewares/extract-user-from-jwt.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";

const app: Express = express();

app
  .use(helmet())
  .use(cors({ credentials: true, origin: "http://localhost:5173" }))
  .use(express.json({ limit: "1mb" }))
  .use(express.urlencoded({ extended: true, limit: "1mb" }))
  .use(cookieParser())
  .use(extractUserFromJwt)
  .use(appRouter)
  .use(errorHandler);

export default app;
