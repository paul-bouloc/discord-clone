import { ClientUser } from '@/models/client-user.model';
import PrismaService from '@/services/prisma.service';
import { BadRequestException } from '@constants/exceptions/bad-request.exception';
import { base64ToBinary } from '@utils/base64-manipulation.util';
import bcrypt from 'bcrypt';

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

  static async findByEmail(email: string): Promise<ClientUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    
    const {avatar_data, avatar_type, ...userWithoutAvatar} = user;

    return userWithoutAvatar;
  }

  static async updateUsername(id: string, username: string): Promise<ClientUser | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { username },
    });

    return user;
  }

  static async updateEmail(id: string, email: string): Promise<ClientUser | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { email },
    });

    return user;
  }

  static async confirmPassword(id: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { password: true },
    });

    if (!user) return false;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    return isPasswordCorrect;
  }

  static async updatePassword(id: string, password: string): Promise<ClientUser | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return user;
  }

  static async updateAvatar(id: string, avatar: string): Promise<ClientUser | null> {
    try {
      const {type, binary} = base64ToBinary(avatar)
      await this.prisma.user.update({
        where: { id },
        data: { avatar_data: binary, avatar_type: type },
      });
    } catch (error) {
      throw new BadRequestException('Invalid avatar format')
    }

    return this.findById(id)
  }
  
  
}