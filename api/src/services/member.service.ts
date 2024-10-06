import PrismaService from '@/services/prisma.service';

export default class MemberService {
  private static prisma = PrismaService.getInstance().getClient();	
}

