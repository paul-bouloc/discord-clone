export interface ClientUser {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}
