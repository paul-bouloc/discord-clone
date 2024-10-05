import { isBase64 } from '@utils/base64-manipulation.util';
import { z } from 'zod';

export const userNameDto = z.object({
  username: z.string({required_error:'Le nom d\'utilisateur est requis'}).min(3, {message:'Le nom d\'utilisateur doit contenir au moins 3 caractères'}).max(20, {message:'Le nom d\'utilisateur doit contenir au plus 20 caractères'}),
});
export type userNameDto = z.infer<typeof userNameDto>;

export const userEmailDto = z.object({
  email: z.string({required_error:'L\'adresse e-mail est requise'}).email({message:'L\'adresse e-mail est invalide'}),
});
export type userEmailDto = z.infer<typeof userEmailDto>;

export const userPasswordDto = z.object({
  password: z.string({required_error:'Le mot de passe est requis'}).min(8, {message:'Le mot de passe doit contenir au moins 8 caractères'}),
  newPassword: z.string({required_error:'Le nouveau mot de passe est requis'}).min(8, {message:'Le nouveau mot de passe doit contenir au moins 8 caractères'}),
  confirmPassword: z.string({required_error:'La confirmation du mot de passe est requise'}).min(8, {message:'La confirmation du mot de passe doit contenir au moins 8 caractères'})
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Le nouveau mot de passe et la confirmation du mot de passe ne correspondent pas',
  path: ['confirmPassword'],
});
export type userPasswordDto = z.infer<typeof userPasswordDto>;

export const userAvatarDto = z.object({
  avatar: z.string({required_error:'L\'avatar est requis'})
}).refine((data) => isBase64(data.avatar),
  {
    message: 'L\'avatar doit être un base64 valide',
    path: ['avatar']
  }).refine((data) => Buffer.from(data.avatar, 'base64').length <= 1024 * 1024,
  {
    message: 'L\'avatar ne doit pas dépasser 2 Mo',
    path: ['avatar']
  })
export type userAvatarDto = z.infer<typeof userAvatarDto>;
