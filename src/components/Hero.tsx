export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-slate-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-800">
            Protótipo · Estudo de caso PetVida
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            A agenda de papel está custando dinheiro e confiança à sua clínica.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            O PetVida Agenda unifica consultas, vacinas, banho e tosa em uma única linha do
            tempo por profissional — com prontuário integrado e lembretes automáticos, para
            acabar com os choques de horário e as pastas de arquivo morto.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#demo"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
            >
              Testar a demo interativa
            </a>
            <a
              href="#problema"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
            >
              Entender o problema
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="text-2xl font-bold text-brand-700">30+</dt>
              <dd className="text-slate-500">banhos/dia gerenciados na régua</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-brand-700">7</dt>
              <dd className="text-slate-500">profissionais em uma só agenda</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-brand-700">0</dt>
              <dd className="text-slate-500">prontuários perdidos em papel</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-slate-400">agenda-petvida.app</span>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { name: 'Dr. Gabriel Santos', slot: '09:00 · Consulta — Thor', color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { name: 'Dra. Camila Paes', slot: '09:30 · Vacina — Nina', color: 'bg-purple-50 border-purple-200 text-purple-800' },
              { name: 'Juliana Reis', slot: '09:00 · Banho — Bidu', color: 'bg-brand-50 border-brand-200 text-brand-800' },
              { name: 'Marcos Vieira', slot: '10:30 · Tosa — Felix', color: 'bg-amber-50 border-amber-200 text-amber-800' },
            ].map((row) => (
              <div
                key={row.name}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${row.color}`}
              >
                <span className="font-medium">{row.name}</span>
                <span>{row.slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
