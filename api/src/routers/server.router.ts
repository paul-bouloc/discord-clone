import {
  createServer,
  deleteServer,
  getServer,
  getUserServers,
  updateServerBanner,
  updateServerName,
} from "@controllers/server.controller";
import { createServerDto, updateServerBannerDto } from "@dtos/server.dto";
import isAuthenticated from "@middlewares/is-authenticated.middleware";
import { validateData } from "@middlewares/validate-dto.middleware";
import memberRouter from "@routers/member.router";
import tryCatch from "@utils/try-catch.util";
import express from "express";

const serverRouter = express.Router();

// Get all servers of the user
serverRouter.get("/", isAuthenticated, tryCatch(getUserServers));

// Get a server by id
serverRouter.get("/:serverId", isAuthenticated, tryCatch(getServer));

// Create a server
serverRouter.post(
  "/",
  isAuthenticated,
  validateData(createServerDto),
  tryCatch(createServer),
);

// Update the name of the server
serverRouter.put(
  "/:serverId/name",
  isAuthenticated,
  validateData(createServerDto),
  tryCatch(updateServerName),
);

// Update the banner of the server
serverRouter.put(
  "/:serverId/banner",
  isAuthenticated,
  validateData(updateServerBannerDto),
  tryCatch(updateServerBanner),
);

// Delete a server
serverRouter.delete("/:serverId", isAuthenticated, tryCatch(deleteServer));

serverRouter.use("/:serverId/members", memberRouter);

export default serverRouter;
