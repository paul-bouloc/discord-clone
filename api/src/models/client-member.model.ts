import { ClientUser } from "./client-user.model";
import { MemberRole } from "@prisma/client";

export interface ClientMember extends ClientUser {
  role: MemberRole
  memberSince: Date
  memberId: string
  serverId: string
}