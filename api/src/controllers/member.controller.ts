import { BadRequestException } from "@constants/exceptions/bad-request.exception";
import { ForbiddenException } from "@constants/exceptions/forbidden.exception";
import { NotFoundException } from "@constants/exceptions/not-found.exception";
import { memberRoleDto } from "@dtos/member.dto";
import { MemberRole } from "@prisma/client";
import MemberService from "@services/member.service";
import ServerService from "@services/server.service";
import { Request, Response } from "express";

/**
 * @description Get a member by id
 */
export const getMember = async (req: Request, res: Response) => {
  const memberId = req.params.memberId;
  const serverId = req.params.serverId;
  if (!memberId || !serverId)
    throw new BadRequestException("Member id and server id are required");

  const member = await MemberService.findById(serverId, memberId);
  if (!member) throw new NotFoundException("Member not found");

  res.status(200).json(member);
};

/**
 * @description Join a server
 */
export const joinServer = async (req: Request, res: Response) => {
  const serverId = req.params.serverId;
  if (!serverId) throw new BadRequestException("Server id is required");

  const server = await ServerService.findById(serverId);
  if (!server) throw new NotFoundException("Server not found");

  const member = await MemberService.joinServer(serverId, req.user!.id);

  res.status(201).json(member);
};

/**
 * @description Leave a server
 */
export const leaveServer = async (req: Request, res: Response) => {
  const serverId = req.params.serverId;
  if (!serverId) throw new BadRequestException("Server id is required");

  const member = await MemberService.findById(serverId, req.user!.id);
  if (!member)
    throw new NotFoundException("You are not a member of this server");

  await MemberService.leaveServer(member.memberId);

  res.status(200).json({ message: "You have left the server" });
};

/**
 * @description Get all members of a server
 */
export const getServerMembers = async (req: Request, res: Response) => {
  const serverId = req.params.serverId;
  if (!serverId) throw new BadRequestException("Server id is required");

  const members = await MemberService.findServerMembers(serverId);

  res.status(200).json(members);
};

/**
 * @description Update the role of a member
 */
export const updateMemberRole = async (req: Request, res: Response) => {
  const memberId = req.params.memberId;
  const serverId = req.params.serverId;
  if (!memberId || !serverId)
    throw new BadRequestException("Member id and server id are required");

  const currentMember = await MemberService.findById(serverId, req.user!.id);
  if (!currentMember)
    throw new NotFoundException("You are not a member of this server");
  if (currentMember.role !== MemberRole.ADMIN)
    throw new ForbiddenException(
      "You are not authorized to update the role of a member",
    );
  if (currentMember.memberId === memberId)
    throw new ForbiddenException("You cannot update your own role");

  const { role } = req.body as memberRoleDto;

  const member = await MemberService.findById(serverId, memberId);
  if (!member) throw new NotFoundException("Member not found");

  const updatedMember = await MemberService.updateMemberRole(
    member.memberId,
    role,
  );

  res.status(200).json(updatedMember);
};

/**
 * @description Kick a member
 */
export const kickMember = async (req: Request, res: Response) => {
  const memberId = req.params.memberId;
  const serverId = req.params.serverId;
  if (!memberId || !serverId)
    throw new BadRequestException("Member id and server id are required");

  const currentMember = await MemberService.findById(serverId, req.user!.id);
  if (!currentMember)
    throw new NotFoundException("You are not a member of this server");
  if (currentMember.role !== MemberRole.ADMIN)
    throw new ForbiddenException("You are not authorized to kick a member");

  const member = await MemberService.findById(serverId, memberId);
  if (!member) throw new NotFoundException("Member not found");
  if (member.role === MemberRole.ADMIN)
    throw new ForbiddenException("You cannot kick an admin");

  await MemberService.leaveServer(member.memberId);

  res.status(200).json({ message: "Member kicked" });
};
