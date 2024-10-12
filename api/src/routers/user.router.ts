import { validateData } from "@/middlewares/validate-dto.middleware";
import {
  updateUsername,
  updateEmail,
  updatePassword,
  updateAvatar,
  currentUser,
  getUser,
} from "@controllers/user.controller";
import {
  userAvatarDto,
  userEmailDto,
  userNameDto,
  userPasswordDto,
} from "@dtos/user.dto";
import isAuthenticated from "@middlewares/is-authenticated.middleware";
import tryCatch from "@utils/try-catch.util";
import express from "express";

const userRouter = express.Router();

// Get the current user
userRouter.get("/", isAuthenticated, tryCatch(currentUser));

// Get a user by id
userRouter.get("/:id", isAuthenticated, tryCatch(getUser));

// Update the username of the user
userRouter.put(
  "/username",
  validateData(userNameDto),
  isAuthenticated,
  tryCatch(updateUsername),
);

// Update the email of the user
userRouter.put(
  "/email",
  validateData(userEmailDto),
  isAuthenticated,
  tryCatch(updateEmail),
);

// Update the password of the user
userRouter.put(
  "/password",
  validateData(userPasswordDto),
  isAuthenticated,
  tryCatch(updatePassword),
);

// Update the avatar of the user
userRouter.put(
  "/avatar",
  validateData(userAvatarDto),
  isAuthenticated,
  tryCatch(updateAvatar),
);

export default userRouter;
