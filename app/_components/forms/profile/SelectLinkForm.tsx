import LinkButton from "../../commons/LinkButton";

export default function SelectLinkForm() {

  const fields = [
    { href: '/profile/me', title: 'Editar dados da conta' },
    { href: '/profile/address', title: 'Editar dados do meu endereço' },
    { href: '/profile/subscription', title: 'Meu plano de assinatura' },
    { href: '/profile/investment', title: 'Meu perfil de investidor' }
  ]

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center m-8 lg:px-8">
      {fields.map((field) => (
        <LinkButton
          key={field.title}
          href={field.href}
          title={field.title}
          classNameLink='border border-zinc-600 p-3 rounded-sm w-full md:w-1/2'
          classNameTitle='flex flex-row justify-between 
        items-center w-full font-semibold text-md 
        text-zinc-800 hover:text-zinc-600 h-7 px-4'
          icon="ArrowRight"
          size="15"
        />
      ))}

    </div>
  )
}