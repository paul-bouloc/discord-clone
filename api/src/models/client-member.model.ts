import { MemberRole } from "@prisma/client";

export interface ClientMember {
  userId: string;
  memberId: string;
  serverId: string;

  role: MemberRole;

  username: string;
  email: string;
  avatar: string | null;

  createdAt: Date;
  updatedAt: Date;
  memberSince: Date;
}
