const problems = [
  {
    icon: '⏱️',
    title: 'Choques de horário',
    description:
      'Consultas, banhos e tosas são marcados na mesma agenda de papel, sem checagem cruzada entre profissionais. Com mais de 30 banhos diários, sobreposições viraram rotina.',
  },
  {
    icon: '💉',
    title: 'Vacinas e retornos esquecidos',
    description:
      'Sem lembrete automático, tutores esquecem a data da vacina ou do banho. Isso cria lacunas na agenda que não são preenchidas a tempo — e receita perdida para a clínica.',
  },
  {
    icon: '📁',
    title: 'Prontuário em arquivo morto',
    description:
      'Cada atendimento exige vasculhar pastas físicas. A recepção perde minutos valiosos por pet, atrasando toda a fila de espera do dia.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problema" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          A dor do cliente
        </h2>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          O que funcionava com poucos pets por dia virou caos na régua atual.
        </p>
        <p className="mt-4 text-slate-600">
          A PetVida é fundada pelo Dr. Gabriel Santos e pela Dra. Camila Paes, com mais 2
          veterinários plantonistas, 3 tosadores e 2 recepcionistas cuidando de tudo por telefone
          e caderno.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {problems.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-3xl">{p.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
