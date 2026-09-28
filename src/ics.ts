function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function toIcsDate(iso: string): string {
  return iso.replace(/-/g, '')
}

function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

interface IcsEventInput {
  uid: string
  summary: string
  description?: string
  date: string // yyyy-mm-dd
  time?: string // HH:mm — se ausente, gera um evento de dia inteiro
  durationMinutes?: number
  reminderDaysBefore?: number
}

// Gera o conteúdo de um arquivo .ics (padrão iCalendar) 100% no navegador,
// sem depender de nenhum servidor ou API de terceiros.
export function buildIcsContent(event: IcsEventInput): string {
  const now = new Date()
  const dtstamp = `${toIcsDate(now.toISOString().slice(0, 10))}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PetVida Agenda//Protótipo//PT-BR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.uid}@petvida-agenda`,
    `DTSTAMP:${dtstamp}`,
  ]

  if (event.time) {
    const [h, m] = event.time.split(':').map(Number)
    const startTotal = h * 60 + m
    const endTotal = startTotal + (event.durationMinutes ?? 30)
    const endTime = `${pad(Math.floor(endTotal / 60))}${pad(endTotal % 60)}`
    lines.push(`DTSTART:${toIcsDate(event.date)}T${pad(h)}${pad(m)}00`)
    lines.push(`DTEND:${toIcsDate(event.date)}T${endTime}00`)
  } else {
    lines.push(`DTSTART;VALUE=DATE:${toIcsDate(event.date)}`)
    lines.push(`DTEND;VALUE=DATE:${toIcsDate(addDaysIso(event.date, 1))}`)
  }

  lines.push(`SUMMARY:${event.summary}`)
  if (event.description) lines.push(`DESCRIPTION:${event.description}`)

  if (event.reminderDaysBefore !== undefined) {
    lines.push('BEGIN:VALARM')
    lines.push(`TRIGGER:-P${event.reminderDaysBefore}D`)
    lines.push('ACTION:DISPLAY')
    lines.push(`DESCRIPTION:${event.summary}`)
    lines.push('END:VALARM')
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')
  return lines.join('\r\n')
}

export function downloadIcsFile(filename: string, event: IcsEventInput): void {
  const content = buildIcsContent(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
