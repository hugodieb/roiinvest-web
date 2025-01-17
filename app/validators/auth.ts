import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type EmailFormSchema = z.infer<typeof emailSchema>

export const loginSchema = emailSchema.extend({
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Inferindo o tipo a partir do esquema
export type LoginFormSchema = z.infer<typeof loginSchema>;


export const registerSchema = loginSchema.extend({
  first_name: z.string().min(4, 'Nome deve ter no mínimo 4 caracteres'),
  last_name: z.string().min(4, 'Sobrenome deve ter no mínimo 4 caracteres'),
  re_password: z.string().min(6, 'Voçe deve repetir a senha aqui'),
}).refine(data => data.password === data.re_password, {
  message: 'Senhas não conferem',
  path: ['re_password'],
});

export type RegisterFormSchema = z.infer<typeof registerSchema>

export const ConfirmPasswordSchema = z.object({
  new_password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  re_new_password: z.string().min(6, 'Voçe deve repetir a senha aqui'),
}).refine(data => data.new_password === data.re_new_password, {
  message: 'Senhas não conferem',
  path: ['re_new_password'],
});

export type ConfirmPasswordFormSchema = z.infer<typeof ConfirmPasswordSchema>

