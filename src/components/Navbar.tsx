const links = [
  { href: '#problema', label: 'O problema' },
  { href: '#solucao', label: 'Solução' },
  { href: '#demo', label: 'Demo' },
  { href: '#telas', label: 'Telas' },
  { href: '#arquitetura', label: 'Arquitetura' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            🐾
          </span>
          PetVida Agenda
        </a>
        <ul className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-brand-700">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#demo"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Ver demo
        </a>
      </nav>
    </header>
  )
}
