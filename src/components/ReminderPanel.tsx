import { pets } from '../data/mockData'
import { downloadIcsFile } from '../ics'
import { daysUntil, formatDatePtBr } from '../utils'

export default function ReminderPanel() {
  const withStatus = pets
    .map((pet) => ({ pet, days: daysUntil(pet.nextVaccineDue) }))
    .filter((entry) => entry.days <= 7)
    .sort((a, b) => a.days - b.days)

  function handleAddToCalendar(pet: (typeof pets)[number]) {
    downloadIcsFile(`petvida-vacina-${pet.name.toLowerCase()}.ics`, {
      uid: `vacina-${pet.id}`,
      summary: `PetVida — Vacina de ${pet.name} vence hoje`,
      description: `Lembrete gerado pela PetVida Agenda para o tutor ${pet.tutorName}.`,
      date: pet.nextVaccineDue,
      reminderDaysBefore: 1,
    })
  }

  return (
    <aside className="h-fit rounded-xl bg-slate-800 p-5">
      <h3 className="text-sm font-semibold text-brand-400">Lembretes automáticos</h3>
      <p className="mt-1 text-xs text-slate-400">
        Prontuário integrado: a clínica vê quem precisa de vacina antes de virar lacuna na agenda.
        O botão baixa um lembrete real (.ics) para o calendário do tutor.
      </p>
      <ul className="mt-4 space-y-3">
        {withStatus.map(({ pet, days }) => (
          <li
            key={pet.id}
            className={`rounded-lg border px-3 py-2 text-xs ${
              days < 0
                ? 'border-red-800 bg-red-950 text-red-300'
                : 'border-amber-800 bg-amber-950 text-amber-300'
            }`}
          >
            <p className="font-semibold">
              {pet.name} · {pet.tutorName}
            </p>
            <p>
              {days < 0
                ? `Vacina vencida há ${Math.abs(days)} dia(s) — ${formatDatePtBr(pet.nextVaccineDue)}`
                : days === 0
                  ? 'Vacina vence hoje'
                  : `Vacina vence em ${days} dia(s) — ${formatDatePtBr(pet.nextVaccineDue)}`}
            </p>
            <button
              onClick={() => handleAddToCalendar(pet)}
              className="mt-2 rounded-full border border-current px-2.5 py-1 text-[11px] font-semibold transition hover:opacity-80"
            >
              📅 Adicionar lembrete ao calendário
            </button>
          </li>
        ))}
        {withStatus.length === 0 && (
          <li className="text-xs text-slate-500">Nenhum lembrete pendente no momento.</li>
        )}
      </ul>
    </aside>
  )
}
