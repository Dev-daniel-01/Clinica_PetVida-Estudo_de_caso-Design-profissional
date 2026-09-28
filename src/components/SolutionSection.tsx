const features = [
  {
    icon: '🗓️',
    title: 'Agenda unificada multiprofissional',
    description:
      'Consultas, vacinas, banho e tosa na mesma linha do tempo, com checagem automática de conflito por profissional antes de confirmar o horário.',
  },
  {
    icon: '🩺',
    title: 'Prontuário integrado',
    description:
      'Histórico médico e estético do pet no mesmo lugar — sem pasta física, sem procurar em arquivo morto durante o atendimento.',
  },
  {
    icon: '🔔',
    title: 'Lembretes automáticos',
    description:
      'A clínica enxerga quem está com vacina ou retorno preventivo próximo do vencimento, antes que a lacuna na agenda aconteça.',
  },
  {
    icon: '📊',
    title: 'Visão de ocupação',
    description:
      'Painel simples para a recepção identificar horários ociosos e redistribuir a demanda entre os profissionais disponíveis.',
  },
]

export default function SolutionSection() {
  return (
    <section id="solucao" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            A solução
          </h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            Integrar o cuidado estético ao histórico de saúde do animal.
          </p>
          <p className="mt-4 text-slate-600">
            Praticidade para o tutor, previsibilidade de caixa para a clínica — mantendo o
            diferencial de confiança médica que os pet shops de rede da região não têm.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-2xl border border-slate-200 p-6 transition hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
