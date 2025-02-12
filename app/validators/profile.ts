import { z } from 'zod'

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i)
  }
  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;
  if (digit !== parseInt(cpf[10])) return false;

  return true;
}

// Zod Schema matching Django model
export const UserProfileSchema = z.object({
  first_name: z.string().min(4, "Nome deve conter pelo menos 4 letras."),
  last_name: z.string().min(3, "Sobrenome deve conter pelo menos 3 letras."),
  birth_date: z.string().optional(),
  age: z.number().int().min(18).max(120).optional(),
  gender: z.enum(['M', 'F', 'O', 'N']).optional(),
  avatar: z
    .any()
    .refine((file) => file instanceof File, "Imagem png, jpg.")
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5 MB."
    ).optional(),
  cpf: z.string()
    .min(11, "CPF deve ter 11 dígitos")
    .refine((val) => validateCPF(val), {
      message: "CPF inválido"
    })
})

export type UserProfileData = z.infer<typeof UserProfileSchema>

export const UserProfileAddressSchema = z.object({
  address: z.string().max(255).optional(),
  address_number: z.string().max(10).optional(),
  complement: z.string().max(100).optional(),
  neighborhood: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(20).optional(),
  country: z.string().max(100).optional(),
  zip_code: z.string().max(10).optional()
})

export type UserProfileAddressData = z.infer<typeof UserProfileAddressSchema>