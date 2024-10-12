import { registerDto } from '@/dtos/auth.dtos';
import PrismaService from '@/services/prisma.service';
import { UnauthorizedException } from '@constants/exceptions/unauthorized.exception';
import { User } from '@prisma/client';
import UserService from '@services/user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ClientUser } from '@models/client-user.model';

export default class AuthService {
  private static prisma = PrismaService.getInstance().getClient();

  static async create(data: registerDto): Promise<Omit<User, 'password'>> {
    return AuthService.prisma.user.create({data});
  }

  static generateJwtToken(userId: string): string {
    const jwtSecretKey = process.env.JWT_SECRET as string
    return jwt.sign({userId},jwtSecretKey,{expiresIn: "7d"})
  }

  static verifyJwtToken(token: string): string | undefined {
    const jwtSecretKey = process.env.JWT_SECRET as string
    const payload = jwt.verify(token, jwtSecretKey) as JwtPayload
    if(payload){
      return payload.userId
    }
    return undefined
  }

  static async login(email: string, password: string): Promise<ClientUser | null> {

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        password: true,
      }
    });

    if(!user)  throw new UnauthorizedException('Invalid credentials')

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials')
    
    return await UserService.findByEmail(email)
  }
}