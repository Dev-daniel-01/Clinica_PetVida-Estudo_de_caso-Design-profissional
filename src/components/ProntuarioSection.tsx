import { useMemo, useState } from 'react'
import { pets, professionals } from '../data/mockData'
import type { Appointment } from '../types'
import { appointmentTypeLabels, daysUntil, formatDatePtBr } from '../utils'

interface ProntuarioSectionProps {
  appointments: Appointment[]
}

export default function ProntuarioSection({ appointments }: ProntuarioSectionProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pets
    return pets.filter(
      (p) => p.name.toLowerCase().includes(q) || p.tutorName.toLowerCase().includes(q),
    )
  }, [query])

  function professionalName(id: string) {
    return professionals.find((p) => p.id === id)?.name ?? 'Profissional'
  }

  return (
    <section id="prontuario" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Prontuário integrado
          </h2>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            Busque qualquer pet em segundos — nada de pasta física.
          </p>
          <p className="mt-4 text-slate-600">
            Digite o nome do pet ou do tutor. O resultado junta o histórico de saúde e de estética
            no mesmo lugar, puxado dos agendamentos reais desta demo (inclusive os que você acabou
            de criar acima).
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por pet ou tutor... (ex: Thor, Marina)"
          className="mt-6 w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {results.map((pet) => {
            const history = appointments
              .filter((a) => a.petId === pet.id)
              .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
            const vaccineDays = daysUntil(pet.nextVaccineDue)

            return (
              <div key={pet.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {pet.name} <span className="font-normal text-slate-500">· {pet.breed}</span>
                    </p>
                    <p className="text-xs text-slate-500">Tutor: {pet.tutorName}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      vaccineDays < 0
                        ? 'bg-red-100 text-red-700'
                        : vaccineDays <= 7
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-brand-100 text-brand-700'
                    }`}
                  >
                    Vacina: {formatDatePtBr(pet.nextVaccineDue)}
                  </span>
                </div>
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  {history.length === 0 && (
                    <p className="text-slate-400">Sem atendimentos registrados nesta demo.</p>
                  )}
                  {history.map((h) => (
                    <p key={h.id}>
                      {formatDatePtBr(h.date)} · {h.startTime} — {appointmentTypeLabels[h.type]} com{' '}
                      {professionalName(h.professionalId)}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
          {results.length === 0 && (
            <p className="text-sm text-slate-500">Nenhum pet encontrado para "{query}".</p>
          )}
        </div>
      </div>
    </section>
  )
}
