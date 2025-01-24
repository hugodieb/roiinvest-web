import LinkButton from "./LinkButton";

export default function Home() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen"
        style={{ backgroundImage: "url('https://www.invius.com.br/wp-content/uploads/2020/09/operacoes-na-Bolsa-de-Valores.png')" }}
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Conteúdo principal */}
        <div className="relative flex flex-col justify-center items-center h-full py-20">
          <p className="max-w-2xl font-bold tracking-tight text-white sm:text-4xl text-center">
            Roiinvest, presente, passado e futuro nos investimentos
          </p>
          <p className="max-w-2xl text-lg leading-8 text-gray-300 text-center mt-2">
            Alcance seus <span className="text-indigo-400 font-semibold">objetivos financeiros</span> com a ajuda da Roiinvest ao seu lado!
          </p>
          <LinkButton href={"/auth/register"}
            title="Abra sua conta Grátis"
            classNameLink="flex justify-center mt-6 rounded-md
           bg-gray-800 px-3 py-2.5 text-sm/6 font-semibold
            text-white shadow-sm hover:bg-gray-600
             focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            icon="Gem"
          />
        </div>
      </div>
      {/* Seção de Serviços */}
      <section className="py-16 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Descubra como podemos ajudar você a alcançar seus objetivos financeiros.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white shadow p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Acompanhamento de Ações</h3>
            <p className="mt-2 text-gray-600">
              Monitore o desempenho das suas ações em tempo real com gráficos e análises detalhadas.
            </p>
          </div>
          <div className="rounded-lg bg-white shadow p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Renda Fixa</h3>
            <p className="mt-2 text-gray-600">
              Avalie as melhores oportunidades em títulos públicos, CDBs e LCIs.
            </p>
          </div>
          <div className="rounded-lg bg-white shadow p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800">Renda Passiva</h3>
            <p className="mt-2 text-gray-600">
              Construa uma carteira para gerar renda passiva de forma consistente.
            </p>
          </div>
        </div>
      </section>
      {/* Seção de Testemunhos */}
      <section className="bg-indigo-50 py-16 px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            O que nossos usuários dizem
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Milhares de investidores já confiam na Roiinvest.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white shadow p-6">
            <p className="text-gray-600 italic">
              "A Roiinvest me ajudou a alcançar meus objetivos financeiros de forma organizada."
            </p>
            <p className="mt-4 text-gray-800 font-semibold">— João Silva</p>
          </div>
          <div className="rounded-lg bg-white shadow p-6">
            <p className="text-gray-600 italic">
              "Com o acompanhamento da Roiinvest, consegui melhorar minha renda passiva."
            </p>
            <p className="mt-4 text-gray-800 font-semibold">— Ana Costa</p>
          </div>
          <div className="rounded-lg bg-white shadow p-6">
            <p className="text-gray-600 italic">
              "A equipe da Roiinvest é excelente e oferece análises detalhadas para investir melhor."
            </p>
            <p className="mt-4 text-gray-800 font-semibold">— Pedro Fernandes</p>
          </div>
        </div>
      </section>
    </div>

  )
}