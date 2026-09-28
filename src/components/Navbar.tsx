import { useState } from 'react'

const links = [
  { href: '#problema', label: 'O problema' },
  { href: '#solucao', label: 'Solução' },
  { href: '#demo', label: 'Demo' },
  { href: '#prontuario', label: 'Prontuário' },
  { href: '#telas', label: 'Telas' },
  { href: '#arquitetura', label: 'Arquitetura' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
          className="hidden rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 md:inline-block"
        >
          Ver demo
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-lg text-slate-700 md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 transition hover:bg-slate-50 hover:text-brand-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Ver demo
          </a>
        </div>
      )}
    </header>
  )
}
