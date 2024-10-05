import { z } from 'zod';

export const registerDto = z.object({
  username: z.string({required_error:'Le nom d\'utilisateur est requis'}).min(3, {message:'Le nom d\'utilisateur doit contenir au moins 3 caractères'}).max(20, {message:'Le nom d\'utilisateur doit contenir au plus 20 caractères'}),
  email: z.string({required_error:'L\'adresse e-mail est requise'}).email({message:'L\'adresse e-mail est invalide'}),
  password: z.string({required_error:'Le mot de passe est requis'}).min(8, {message:'Le mot de passe doit contenir au moins 8 caractères'}),
});
export type registerDto = z.infer<typeof registerDto>;

export const loginDto = z.object({
  email: z.string({required_error:'L\'adresse e-mail est requise'}).email({message:'L\'adresse e-mail est invalide'}),
  password: z.string({required_error:'Le mot de passe est requis'}).min(8, {message:'Le mot de passe doit contenir au moins 8 caractères'}),
});
export type loginDto = z.infer<typeof loginDto>;