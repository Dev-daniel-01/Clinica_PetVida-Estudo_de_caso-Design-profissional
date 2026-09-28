import type { Appointment, Pet, Professional } from '../types'

// Dados fictícios baseados no cenário do Estudo de Caso 5 (Clínica PetVida & Estética Animal).
// Não representam pessoas reais.

export const professionals: Professional[] = [
  { id: 'prof-gabriel', name: 'Dr. Gabriel Santos', role: 'veterinario' },
  { id: 'prof-camila', name: 'Dra. Camila Paes', role: 'veterinario' },
  { id: 'prof-plant-1', name: 'Dr. Rafael Nunes (plantonista)', role: 'veterinario' },
  { id: 'prof-plant-2', name: 'Dra. Beatriz Lima (plantonista)', role: 'veterinario' },
  { id: 'prof-tosa-1', name: 'Juliana Reis (tosadora)', role: 'tosador' },
  { id: 'prof-tosa-2', name: 'Marcos Vieira (tosador)', role: 'tosador' },
  { id: 'prof-tosa-3', name: 'Paula Andrade (tosadora)', role: 'tosador' },
]

function isoDaysFromToday(offset: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

export const pets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Thor',
    species: 'Cão',
    breed: 'Golden Retriever',
    tutorName: 'Marina Costa',
    lastVaccineDate: isoDaysFromToday(-335),
    nextVaccineDue: isoDaysFromToday(3),
  },
  {
    id: 'pet-2',
    name: 'Mimi',
    species: 'Gato',
    breed: 'Siamês',
    tutorName: 'Eduardo Franco',
    lastVaccineDate: isoDaysFromToday(-360),
    nextVaccineDue: isoDaysFromToday(-2),
  },
  {
    id: 'pet-3',
    name: 'Bidu',
    species: 'Cão',
    breed: 'Poodle',
    tutorName: 'Larissa Prado',
    lastVaccineDate: isoDaysFromToday(-100),
    nextVaccineDue: isoDaysFromToday(265),
  },
  {
    id: 'pet-4',
    name: 'Nina',
    species: 'Cão',
    breed: 'Shih Tzu',
    tutorName: 'Carlos Eduardo',
    lastVaccineDate: isoDaysFromToday(-350),
    nextVaccineDue: isoDaysFromToday(6),
  },
  {
    id: 'pet-5',
    name: 'Felix',
    species: 'Gato',
    breed: 'Persa',
    tutorName: 'Renata Alves',
    lastVaccineDate: isoDaysFromToday(-40),
    nextVaccineDue: isoDaysFromToday(325),
  },
  {
    id: 'pet-6',
    name: 'Amora',
    species: 'Cão',
    breed: 'Labrador',
    tutorName: 'Fernanda Dias',
    lastVaccineDate: isoDaysFromToday(-358),
    nextVaccineDue: isoDaysFromToday(-8),
  },
]

const today = isoDaysFromToday(0)

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    petId: 'pet-1',
    professionalId: 'prof-gabriel',
    type: 'consulta',
    date: today,
    startTime: '09:00',
    durationMinutes: 30,
  },
  {
    id: 'apt-2',
    petId: 'pet-4',
    professionalId: 'prof-camila',
    type: 'vacina',
    date: today,
    startTime: '09:30',
    durationMinutes: 20,
  },
  {
    id: 'apt-3',
    petId: 'pet-3',
    professionalId: 'prof-tosa-1',
    type: 'banho',
    date: today,
    startTime: '09:00',
    durationMinutes: 60,
  },
  {
    id: 'apt-4',
    petId: 'pet-2',
    professionalId: 'prof-plant-1',
    type: 'consulta',
    date: today,
    startTime: '10:00',
    durationMinutes: 30,
  },
  {
    id: 'apt-5',
    petId: 'pet-5',
    professionalId: 'prof-tosa-2',
    type: 'tosa',
    date: today,
    startTime: '10:30',
    durationMinutes: 45,
  },
  {
    id: 'apt-6',
    petId: 'pet-6',
    professionalId: 'prof-tosa-3',
    type: 'banho',
    date: today,
    startTime: '11:00',
    durationMinutes: 60,
  },
]
