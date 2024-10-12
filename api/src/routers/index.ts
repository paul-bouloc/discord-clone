import authRouter from "@/routers/auth.router";
import serverRouter from "@routers/server.router";
import userRouter from "@routers/user.router";
import express, { Request, Response } from "express";

const appRouter = express.Router();

appRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello, world !");
});

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/server", serverRouter);

export default appRouter;
