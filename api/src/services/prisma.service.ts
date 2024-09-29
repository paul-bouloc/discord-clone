import { binaryToBase64 } from '@/utils';
import { PrismaClient } from '@prisma/client';

class PrismaService {
  private static instance: PrismaService;
  private prisma;

  private constructor() {
    this.prisma = new PrismaClient({
      omit: {
        user: {
          password: true,
        }
      }
    }).$extends({
      name:'Image conversion',
      result: {
        user: {
          avatar: {
            needs: {avatar_data: true, avatar_type: true},
            compute({avatar_data, avatar_type}) {
              if (!avatar_data || !avatar_type) return null;
              return binaryToBase64(avatar_data, avatar_type);
            }
          },
        },
        server: {
          banner: {
            needs: {banner_data: true, banner_type: true},
            compute({banner_data, banner_type}) {
              if (!banner_data || !banner_type) return null;
              return binaryToBase64(banner_data, banner_type);
            }
          }
        },
        message: {
          image: {
            needs: {image_data: true, image_type: true},
            compute({image_data, image_type}) {
              if (!image_data || !image_type) return null;
              return binaryToBase64(image_data, image_type);
            }
          }
        }
      }
    });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public getClient() {
    return this.prisma;
  }

  public async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export default PrismaService;