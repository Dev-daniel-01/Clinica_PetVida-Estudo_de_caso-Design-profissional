const currentStack = [
  { label: 'Frontend', value: 'React + TypeScript + Vite + Tailwind CSS' },
  { label: 'Dados', value: 'Mock local + localStorage do navegador (sem backend)' },
  { label: 'Hospedagem', value: 'GitHub Pages, publicado via GitHub Actions' },
  { label: 'Credenciais', value: 'Nenhuma — não há chaves de API nem banco externo' },
]

const productionRoadmap = [
  {
    title: 'Banco de dados compartilhado',
    detail:
      'Substituir o localStorage por um banco real (ex: PostgreSQL via Supabase) para que recepção, veterinários e tosadores vejam a mesma agenda em tempo real.',
  },
  {
    title: 'Autenticação por usuário',
    detail:
      'Login individual para cada recepcionista/profissional, com permissões (ex: só a recepção remarca horários).',
  },
  {
    title: 'Lembretes de verdade',
    detail:
      'Job agendado (cron) integrado a uma API de mensageria (WhatsApp Business, e-mail) para notificar o tutor automaticamente — credenciais protegidas em variáveis de ambiente, nunca no código.',
  },
  {
    title: 'Migração do histórico físico',
    detail:
      'Importação gradual dos prontuários em papel para o sistema, priorizando pets com consulta ou banho já agendado.',
  },
]

export default function Architecture() {
  return (
    <section id="arquitetura" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Arquitetura
          </h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            Protótipo hoje, sistema em produção amanhã.
          </p>
          <p className="mt-4 text-slate-600">
            Este é um protótipo de portfólio: roda inteiramente no navegador, sem servidor e sem
            credenciais para proteger. A tabela abaixo mostra o que existe hoje e o que entraria
            numa versão de produção para a clínica.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900">Stack atual (esta demo)</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {currentStack.map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <dt className="font-medium text-slate-500">{item.label}</dt>
                  <dd className="text-right text-slate-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h3 className="font-semibold text-brand-900">Roadmap de produção</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {productionRoadmap.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-brand-900">{item.title}</p>
                  <p className="mt-1 text-brand-800/80">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
