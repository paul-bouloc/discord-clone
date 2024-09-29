import { ClientUser } from '@/models/client-user.model';
import PrismaService from '@/services/prisma.service';

export default class UserService {
  private static prisma = PrismaService.getInstance().getClient();

  static async findByEmailOrUsername(email?: string, username?: string): Promise<ClientUser | null> {
    if (!email && !username) return null;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (!user) return null;

    const {avatar_data, avatar_type, ...userWithoutAvatar} = user;

    return userWithoutAvatar;
  }

  static async findById(id: string): Promise<ClientUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const {avatar_data, avatar_type, ...userWithoutAvatar} = user;

    return userWithoutAvatar;
  }
}