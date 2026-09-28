import type { Appointment } from './types'

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function hasConflict(
  candidate: Pick<Appointment, 'professionalId' | 'date' | 'startTime' | 'durationMinutes'>,
  existing: Appointment[],
): Appointment | null {
  const candidateStart = timeToMinutes(candidate.startTime)
  const candidateEnd = candidateStart + candidate.durationMinutes

  for (const apt of existing) {
    if (apt.professionalId !== candidate.professionalId || apt.date !== candidate.date) continue
    const start = timeToMinutes(apt.startTime)
    const end = start + apt.durationMinutes
    if (candidateStart < end && start < candidateEnd) {
      return apt
    }
  }
  return null
}

export function formatDatePtBr(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}

export function daysUntil(iso: string): number {
  const target = new Date(iso + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diffMs = target.getTime() - now.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

export const appointmentTypeLabels: Record<Appointment['type'], string> = {
  consulta: 'Consulta',
  banho: 'Banho',
  tosa: 'Tosa',
  vacina: 'Vacina',
}

export const appointmentTypeColors: Record<Appointment['type'], string> = {
  consulta: 'bg-blue-100 text-blue-800 border-blue-300',
  banho: 'bg-brand-100 text-brand-800 border-brand-300',
  tosa: 'bg-amber-100 text-amber-800 border-amber-300',
  vacina: 'bg-purple-100 text-purple-800 border-purple-300',
}
