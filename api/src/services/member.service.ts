import PrismaService from '@/services/prisma.service';
import { ClientMember } from '@models/client-member.model';
import UserService from '@services/user.service';

export default class MemberService {
  private static prisma = PrismaService.getInstance().getClient();

  static async joinServer(serverId: string, userId: string): Promise<ClientMember | null> {
    const member = await this.prisma.member.create({
      data: {
        userId,
        serverId,
      },
    });

    const returnedMember = await this.findById(serverId, userId)

    return returnedMember;
  }

  static async findById(serverId: string,userId: string): Promise<ClientMember | null> {
    const member = await this.prisma.member.findFirst({
      where: { userId, serverId },
    });

    if (!member) return null;

    const user = await UserService.findById(userId)

    if(!user) return null

    const returnedMember = {...user, role: member.role, memberSince: member.createdAt, serverId: member.serverId}

    return returnedMember;
  }
}

