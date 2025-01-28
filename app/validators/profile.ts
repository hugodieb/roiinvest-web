import { z } from 'zod'

// Zod Schema matching Django model
export const UserProfileSchema = z.object({
  first_name: z.string().min(4, "Nome deve conter pelo menos 4 letras."),
  last_name: z.string().min(3, "Sobrenome deev conter ao menos 3 letras."),
  birth_date: z.string().nullable().optional(),
  age: z.number().int().min(18).max(120).nullable().optional(),
  gender: z.enum(['M', 'F', 'O']).nullable().optional(),
  avatar: z
    .any()
    .refine((file) => file instanceof File, "Imagem png, jpg.")
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5 MB."
    ),
})

export type UserProfileData = z.infer<typeof UserProfileSchema>

