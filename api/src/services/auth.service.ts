import { registerDto } from '@/dtos/auth.dtos';
import PrismaService from '@/services/prisma.service';
import { User } from '@prisma/client';

export default class AuthService {
  private static prisma = PrismaService.getInstance().getClient();

  static async create(data: registerDto): Promise<Omit<User, 'password'>> {
    return AuthService.prisma.user.create({data});
  }
}