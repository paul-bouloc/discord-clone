import { login, logout, register } from "@/controllers/auth.controller";
import { loginDto, registerDto } from "@/dtos/auth.dtos";
import { validateData } from "@/middlewares/validate-dto.middleware";
import tryCatch from "@utils/try-catch.util";
import express from "express";

const authRouter = express.Router();

// Register
authRouter.post("/register", validateData(registerDto), tryCatch(register));

// Login
authRouter.post("/login", validateData(loginDto), tryCatch(login));

// Logout
authRouter.post("/logout", tryCatch(logout));

export default authRouter;
