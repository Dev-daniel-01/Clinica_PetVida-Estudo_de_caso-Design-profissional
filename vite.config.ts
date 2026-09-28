import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path precisa bater com o nome do repositório para funcionar no GitHub Pages
// (https://<usuario>.github.io/<repositorio>/)
export default defineConfig({
  plugins: [react()],
  base: '/Clinica_PetVida-Estudo_de_caso-Design-profissional/',
})
