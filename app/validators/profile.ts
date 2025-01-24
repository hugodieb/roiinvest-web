import { z } from 'zod'

// Zod Schema matching Django model
export const UserProfileSchema = z.object({
  birth_date: z.string().nullable().optional(),
  age: z.number().int().min(18).max(120).nullable().optional(),
  gender: z.enum(['M', 'F', 'O', 'N']).nullable().optional(),
  avatar: z.instanceof(File).nullable().or(z.literal("").optional()).refine((file) => file?.size <= 5 * 1024 * 1024, "Arquivo deve ter no máximo 5MB")
})

export type UserProfileData = z.infer<typeof UserProfileSchema>