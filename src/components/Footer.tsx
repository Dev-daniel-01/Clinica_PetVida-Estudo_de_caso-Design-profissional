export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
        <p>
          PetVida Agenda — protótipo acadêmico para o Estudo de Caso 5 (Design Profissional).
        </p>
        <a
          href="https://github.com/Dev-daniel-01/Clinica_PetVida-Estudo_de_caso-Design-profissional"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-400 hover:text-brand-300"
        >
          Ver código-fonte no GitHub →
        </a>
      </div>
    </footer>
  )
}
