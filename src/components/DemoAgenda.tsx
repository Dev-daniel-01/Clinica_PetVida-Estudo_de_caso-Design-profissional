import { useMemo, useState } from 'react'
import { initialAppointments, pets, professionals } from '../data/mockData'
import type { Appointment, AppointmentType } from '../types'
import {
  appointmentTypeColors,
  appointmentTypeLabels,
  hasConflict,
  minutesToTime,
  timeToMinutes,
} from '../utils'
import { downloadIcsFile } from '../ics'
import ReminderPanel from './ReminderPanel'

const typeDurations: Record<AppointmentType, number> = {
  consulta: 30,
  vacina: 20,
  banho: 60,
  tosa: 45,
}

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

interface DemoAgendaProps {
  appointments: Appointment[]
  setAppointments: (appointments: Appointment[]) => void
}

export default function DemoAgenda({ appointments, setAppointments }: DemoAgendaProps) {
  const [selectedDate, setSelectedDate] = useState(todayIso())
  const [petId, setPetId] = useState(pets[0].id)
  const [professionalId, setProfessionalId] = useState(professionals[0].id)
  const [type, setType] = useState<AppointmentType>('consulta')
  const [startTime, setStartTime] = useState('14:00')
  const [feedback, setFeedback] = useState<{ kind: 'error' | 'success'; message: string } | null>(
    null,
  )

  const dayAppointments = useMemo(
    () => appointments.filter((a) => a.date === selectedDate),
    [appointments, selectedDate],
  )

  const byProfessional = useMemo(() => {
    const map = new Map<string, Appointment[]>()
    for (const prof of professionals) map.set(prof.id, [])
    for (const apt of dayAppointments) {
      map.get(apt.professionalId)?.push(apt)
    }
    for (const list of map.values()) {
      list.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
    }
    return map
  }, [dayAppointments])

  function petName(id: string) {
    return pets.find((p) => p.id === id)?.name ?? 'Pet'
  }

  function professionalName(id: string) {
    return professionals.find((p) => p.id === id)?.name ?? 'Profissional'
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const duration = typeDurations[type]
    const candidate = { professionalId, date: selectedDate, startTime, durationMinutes: duration }
    const conflict = hasConflict(candidate, appointments)

    if (conflict) {
      const conflictEnd = minutesToTime(timeToMinutes(conflict.startTime) + conflict.durationMinutes)
      setFeedback({
        kind: 'error',
        message: `Conflito de horário: ${professionalName(conflict.professionalId)} já tem ${appointmentTypeLabels[conflict.type]} de ${conflict.startTime} às ${conflictEnd} com ${petName(conflict.petId)}.`,
      })
      return
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      petId,
      professionalId,
      type,
      date: selectedDate,
      startTime,
      durationMinutes: duration,
    }
    setAppointments([...appointments, newAppointment])
    setFeedback({
      kind: 'success',
      message: `Agendado: ${appointmentTypeLabels[type]} de ${petName(petId)} às ${startTime} com ${professionalName(professionalId)}.`,
    })
  }

  function handleRemove(id: string) {
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  function handleReset() {
    setAppointments(initialAppointments)
    setFeedback(null)
  }

  function handleAddToCalendar(apt: Appointment) {
    downloadIcsFile(`petvida-${petName(apt.petId).toLowerCase()}-${apt.date}.ics`, {
      uid: apt.id,
      summary: `PetVida — ${appointmentTypeLabels[apt.type]} de ${petName(apt.petId)}`,
      description: `Atendimento com ${professionalName(apt.professionalId)} na Clínica PetVida.`,
      date: apt.date,
      time: apt.startTime,
      durationMinutes: apt.durationMinutes,
      reminderDaysBefore: 1,
    })
  }

  return (
    <section id="demo" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-400">
            Demo interativa
          </h2>
          <p className="mt-2 text-3xl font-bold">Tente criar um choque de horário. Não vai rolar.</p>
          <p className="mt-4 text-slate-300">
            Os dados abaixo são fictícios e ficam salvos só no seu navegador (localStorage) — não
            há backend nem banco de dados real nesta demo. Escolha um profissional já ocupado no
            horário e veja o sistema recusar o agendamento. Cada agendamento pode virar um lembrete
            real no calendário do tutor com um clique.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm">
                Data:
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-white"
                />
              </label>
              <button
                onClick={handleReset}
                className="rounded-full border border-slate-600 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-brand-400 hover:text-brand-300"
              >
                Restaurar dados de exemplo
              </button>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
              {professionals.map((prof) => (
                <div key={prof.id} className="w-56 shrink-0 rounded-xl bg-slate-800 p-3">
                  <p className="text-sm font-semibold">{prof.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {prof.role === 'veterinario' ? 'Veterinário(a)' : 'Tosador(a)'}
                  </p>
                  <div className="mt-3 space-y-2">
                    {(byProfessional.get(prof.id) ?? []).length === 0 && (
                      <p className="text-xs text-slate-500">Sem agendamentos</p>
                    )}
                    {(byProfessional.get(prof.id) ?? []).map((apt) => (
                      <div
                        key={apt.id}
                        className={`rounded-lg border px-2 py-1.5 text-xs text-slate-900 ${appointmentTypeColors[apt.type]}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{appointmentTypeLabels[apt.type]}</span>
                          <span className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleAddToCalendar(apt)}
                              aria-label="Adicionar ao calendário"
                              title="Baixar lembrete .ics para o calendário do tutor"
                              className="text-slate-500 hover:text-brand-700"
                            >
                              📅
                            </button>
                            <button
                              onClick={() => handleRemove(apt.id)}
                              aria-label="Remover agendamento"
                              className="text-slate-500 hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        </div>
                        <p>
                          {apt.startTime} · {petName(apt.petId)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleAdd}
              className="mt-6 grid gap-4 rounded-xl bg-slate-800 p-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Pet
                <select
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                  className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-white"
                >
                  {pets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.tutorName})
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Profissional
                <select
                  value={professionalId}
                  onChange={(e) => setProfessionalId(e.target.value)}
                  className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-white"
                >
                  {professionals.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Tipo
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AppointmentType)}
                  className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-white"
                >
                  {(Object.keys(appointmentTypeLabels) as AppointmentType[]).map((t) => (
                    <option key={t} value={t}>
                      {appointmentTypeLabels[t]} ({typeDurations[t]} min)
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-slate-300">
                Horário
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-white"
                />
              </label>
              <button
                type="submit"
                className="sm:col-span-2 lg:col-span-4 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Agendar
              </button>
            </form>

            {feedback && (
              <p
                className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                  feedback.kind === 'error'
                    ? 'bg-red-950 text-red-300 border border-red-800'
                    : 'bg-brand-950 text-brand-300 border border-brand-800'
                }`}
              >
                {feedback.kind === 'error' ? '⚠️ ' : '✅ '}
                {feedback.message}
              </p>
            )}
          </div>

          <ReminderPanel />
        </div>
      </div>
    </section>
  )
}
