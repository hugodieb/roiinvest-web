"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UserProfileAddressSchema, UserProfileAddressData } from "@/app/validators/profile"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function ProfileAdressForm() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileAddressData>({
    resolver: zodResolver(UserProfileAddressSchema),
    defaultValues: { country: "Brasil" }
  })

  const countrys = [
    'Brasil',
    'Paraguai',
    'Argentina',
    'Chile',
    'Peru',
    'Uruguai',
    'Colombia',
    'Venezuela',
    'Bolívia',
    'Equador',
  ]

  function onSubmit(values: UserProfileAddressData) {
    // Handle form submission
    console.log(values)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Endereço do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input {...register("address")} placeholder="Rua/Avenida" />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <Input {...register("address_number")} placeholder="Número" />
            {errors.address_number && <p className="text-red-500 text-sm mt-1">{errors.address_number.message}</p>}
          </div>

          <div>
            <Input {...register("complement")} placeholder="Complemento" />
            {errors.complement && <p className="text-red-500 text-sm mt-1">{errors.complement.message}</p>}
          </div>

          <div>
            <Input {...register("neighborhood")} placeholder="Bairro" />
            {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood.message}</p>}
          </div>

          <div>
            <Input {...register("city")} placeholder="Cidade" />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <Input {...register("state")} placeholder="Estado" />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
          </div>

          <div>
            <Input {...register("zip_code")} placeholder="CEP" />
            {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>}
          </div>

          <div>
            <Select onValueChange={(value) => setValue("country", value)}
              value={errors.country ? undefined : "brasil"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o país" />
              </SelectTrigger>
              <SelectContent>
                {countrys.map((country, index) => (
                  <SelectItem key={index} value={country.toLowerCase()}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          </div>

          <Button
            type="submit"
            className="flex w-full justify-center
           rounded-md bg-slate-900 px-3 py-2.5 text-sm/6 font-semibold
            text-white shadow-sm hover:bg-slate-950 focus-visible:outline
             focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"
          >
            Salvar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

