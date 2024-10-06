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

  static async leaveServer(memberId: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id: memberId },
    });

    return;
  }

  static async findById(serverId: string,userId: string): Promise<ClientMember | null> {
    const member = await this.prisma.member.findFirst({
      where: { userId, serverId },
    });

    if (!member) return null;

    const user = await UserService.findById(userId)

    if(!user) return null

    const returnedMember = {
      ...user,
      role: member.role,
      memberSince: member.createdAt,
      serverId: member.serverId,
      memberId: member.id
    }

    return returnedMember;
  }

  static async findServerMembers(serverId: string): Promise<ClientMember[]> {
    const members = await this.prisma.member.findMany({
      where: { serverId },
    });

    const clientMembers = await Promise.all(members.map(async (member) => {
      const user = await this.findById(member.serverId, member.userId)

      if(!user) return null

      return user
    }))

    return clientMembers.filter(member => member !== null) as ClientMember[];
  }
}
