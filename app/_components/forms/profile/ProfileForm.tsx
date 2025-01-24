import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileData, UserProfileSchema } from "@/app/validators/profile";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfileData>({
    resolver: zodResolver(UserProfileSchema),
  });

  const onSubmit = (data: UserProfileData) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar as File); // Append do arquivo
    console.log("Dados do Perfil:", data);

    console.log("Profile Data:", data);
    // TODO: Implementar submissão para a API
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue("avatar", file); // Atualiza o campo no form
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-2xl p-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6">Formulário de Perfil</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="birth_date" className="block mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                {...register("birth_date")}
                className="w-full p-2 border rounded"
              />
              {errors.birth_date && (
                <p className="text-red-500">{errors.birth_date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block mb-2">
                Gênero
              </label>
              <select
                {...register("gender")}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
                <option value="N">Prefiro não informar</option>
              </select>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="avatar" className="block mb-2">Avatar</label>
            <input
              type="file"
              {...register('avatar')}
              accept="image/*"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
            />
            {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}
          </div>

          <div>
            <label htmlFor="avatar" className="block mb-2">Avatar</label>
            <input
              type="file"
              {...register("avatar")}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Atualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
