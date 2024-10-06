import { ClientUser } from "./client-user.model";
import { MemberRole } from "@prisma/client";

export interface ClientMember extends ClientUser {
  role: MemberRole
  memberSince: Date
  serverId: string
}