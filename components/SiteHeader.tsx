"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "Excursiones", href: "#excursiones" },
  { label: "Movilidad", href: "#movilidad" },
  { label: "Restaurantes", href: "#restaurantes" },
  { label: "Galerías", href: "#galerias" },
  { label: "Contacto", href: "#contacto" },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-[#1a365d]/95 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/mariposa-logo.png"
            alt="NEXO IGUAZU"
            className="h-12 w-auto"
          />
          <span className="text-xl font-semibold text-[#d4a84b] whitespace-nowrap">
            NEXO IGUAZU
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#1a365d]/98">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}