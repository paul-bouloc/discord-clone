import { BadRequestException } from "@constants/exceptions/bad-request.exception";
import { NotFoundException } from "@constants/exceptions/not-found.exception";
import { UnauthorizedException } from "@constants/exceptions/unauthorized.exception";
import {
  userAvatarDto,
  userEmailDto,
  userNameDto,
  userPasswordDto,
} from "@dtos/user.dto";
import UserService from "@services/user.service";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

/**
 * @description Get the current user
 */
export const currentUser = async (req: Request, res: Response) => {
  const user = await UserService.findById(req.user!.id);

  if (!user) throw new NotFoundException("User not found");

  res.status(200).json(user);
};

/**
 * @description Get a user by id
 */
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new BadRequestException("User id is required");

  const user = await UserService.findById(id);
  if (!user) throw new NotFoundException("User not found");

  res.status(200).json(user);
};

/**
 * @description Update the username of the user
 */
export const updateUsername = async (req: Request, res: Response) => {
  const { username } = req.body as userNameDto;

  await UserService.updateUsername(req.user!.id, username);

  const user = await UserService.findById(req.user!.id);

  res.status(200).json(user);
};

/**
 * @description Update the email of the user
 */
export const updateEmail = async (req: Request, res: Response) => {
  const { email } = req.body as userEmailDto;

  await UserService.updateEmail(req.user!.id, email);

  const user = await UserService.findById(req.user!.id);

  res.status(200).json(user);
};

/**
 * @description Update the password of the user
 */
export const updatePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body as userPasswordDto;

  const isPasswordCorrect = await UserService.confirmPassword(
    req.user!.id,
    password,
  );
  if (!isPasswordCorrect)
    throw new UnauthorizedException("Mot de passe incorrect");

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await UserService.updatePassword(req.user!.id, hashedNewPassword);

  const user = await UserService.findById(req.user!.id);

  res.status(200).json(user);
};

/**
 * @description Update the avatar of the user
 */
export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body as userAvatarDto;

  await UserService.updateAvatar(req.user!.id, avatar);

  const user = await UserService.findById(req.user!.id);

  res.status(200).json(user);
};
