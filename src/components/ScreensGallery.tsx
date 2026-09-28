function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-slate-400">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-brand-50 p-3">
          <p className="text-xs text-brand-700">Ocupação hoje</p>
          <p className="text-lg font-bold text-brand-800">82%</p>
        </div>
        <div className="flex-1 rounded-lg bg-amber-50 p-3">
          <p className="text-xs text-amber-700">Horários ociosos</p>
          <p className="text-lg font-bold text-amber-800">3</p>
        </div>
      </div>
      {['09:00 Dr. Gabriel — Consulta', '09:00 Juliana — Banho', '10:00 Dr. Rafael — Consulta'].map(
        (row) => (
          <div key={row} className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-600">
            {row}
          </div>
        ),
      )}
    </div>
  )
}

function ReminderMock() {
  return (
    <div className="mx-auto w-40 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[10px] text-slate-400">Hoje, 08:03</p>
      <div className="mt-1 rounded-lg bg-white p-2 shadow">
        <p className="text-xs font-semibold text-slate-800">🐾 PetVida</p>
        <p className="text-[11px] text-slate-600">
          Oi, Marina! A vacina do Thor vence em 3 dias. Quer agendar?
        </p>
      </div>
    </div>
  )
}

export default function ScreensGallery() {
  return (
    <section id="telas" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Telas do protótipo
        </h2>
        <p className="mt-2 text-3xl font-bold text-slate-900">
          Como o dia a dia da recepção muda na prática.
        </p>
        <p className="mt-4 text-slate-600">
          Estas duas telas ilustram conceitos de uma versão de produção (dashboard de ocupação e
          notificação mobile nativa). A busca de prontuário e os lembretes já são reais — teste nas
          seções <a href="#demo" className="text-brand-700 underline">Demo</a> e{' '}
          <a href="#prontuario" className="text-brand-700 underline">Prontuário</a> acima.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <BrowserFrame title="dashboard · ocupação do dia">
          <DashboardMock />
        </BrowserFrame>
        <BrowserFrame title="lembrete · app do tutor">
          <ReminderMock />
        </BrowserFrame>
      </div>
    </section>
  )
}
