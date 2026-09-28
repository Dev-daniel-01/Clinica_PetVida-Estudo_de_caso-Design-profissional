export type ProfessionalRole = 'veterinario' | 'tosador'

export interface Professional {
  id: string
  name: string
  role: ProfessionalRole
}

export interface Pet {
  id: string
  name: string
  species: 'Cão' | 'Gato'
  breed: string
  tutorName: string
  lastVaccineDate: string // ISO date
  nextVaccineDue: string // ISO date
}

export type AppointmentType = 'consulta' | 'banho' | 'tosa' | 'vacina'

export interface Appointment {
  id: string
  petId: string
  professionalId: string
  type: AppointmentType
  date: string // ISO date (yyyy-mm-dd)
  startTime: string // HH:mm
  durationMinutes: number
  notes?: string
}
