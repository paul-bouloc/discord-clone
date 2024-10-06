import { ClientUser } from '@models/client-user.model';
import { Channel } from '@prisma/client';

export interface ClientServer {
  id: string;
  name: string;
  banner: string | null;
  inviteCode: string;
  ownerId: string;
}