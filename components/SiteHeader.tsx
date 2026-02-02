"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "Excursiones", href: "#excursiones" },
  { label: "Movilidad", href: "#movilidad" },
  { label: "Info útil", href: "#info" },
  { label: "Contacto", href: "#contacto" },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  // Evita que el menú quede abierto al cambiar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Bloquea el scroll del body cuando el menú móvil está abierto (mejor UX)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[9999]",
        "bg-[#1a365d]/95 backdrop-blur-sm",
        // Si NO querés la línea fina, cambiá esto por "border-b-0"
        "border-b border-white/10",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 h-16 md:h-20 flex items-center justify-between min-w-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
          <img
            src="/images/mariposa-logo.png"
            alt="NEXO IGUAZU"
            className="h-10 md:h-12 w-auto max-w-full"
          />
          <span className="text-base md:text-xl font-semibold text-[#d4a84b] whitespace-nowrap truncate">
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
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu overlay (solo links) */}
      {open && (
        <div className="md:hidden">
          {/* Fondo oscuro clickeable para cerrar */}
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-[9998] bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Panel del menú */}
          <div className="fixed top-16 left-0 right-0 z-[9999] border-t border-white/10 bg-[#1a365d]/98">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <nav className="flex flex-col gap-2">
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
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}