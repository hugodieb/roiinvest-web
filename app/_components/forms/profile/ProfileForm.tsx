"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserProfileSchema, UserProfileData } from "@/app/validators/profile"
import { AvatarUpload } from "./Avatar-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfile } from "@/app/hooks/useProfile"
import { useEffect } from "react"

export default function ProfileForm() {

  const { profile, isLoading } = useProfile()
  const { updateProfile } = useProfile()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileData>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      birth_date: "",
      age: undefined,
      gender: undefined,
      avatar: undefined
    }
  })

  useEffect(() => {
    if (profile) {
      setValue("first_name", profile.first_name)
      setValue("last_name", profile.last_name)
      setValue("birth_date", profile.birth_date)
      setValue("age", profile.age)
      setValue("gender", profile.gender)
    }
  }, [profile, setValue])

  const genderOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' },
    { label: 'Prefiro não informar', value: 'N' }
  ] as const;

  const onSubmit = (data: UserProfileData) => {
    updateProfile(data)

    //console.log(data)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AvatarUpload onChange={(file) => setValue("avatar", file)} error={errors.avatar?.message as string} />

          <div className="mt-20">

            <Input {...register("first_name")} placeholder="Nome" value={profile?.first_name} />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
          </div>

          <div>
            <Input {...register("last_name")} placeholder="Sobrenome" value={profile?.last_name} />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
          </div>

          <div>
            <Input {...register("birth_date")} type="date" placeholder="Data de Nascimento" value={profile?.birth_date} />
            {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date.message}</p>}
          </div>

          <div>
            <Input {...register("age", { valueAsNumber: true })} type="number" placeholder="Idade" value={profile?.age} />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <Select onValueChange={(value) => setValue("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gênero" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <Button type="submit" className="flex w-full justify-center
           rounded-md bg-slate-900 px-3 py-2.5 text-sm/6 font-semibold
            text-white shadow-sm hover:bg-slate-950 focus-visible:outline
             focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600">
            Salvar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

