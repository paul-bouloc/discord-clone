import { ClientUser } from '@models/client-user.model';

declare module 'express-serve-static-core' {
  interface Request {
    user: ClientUser | null;
  }
}