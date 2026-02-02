"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_ITEMS = [
  { label: "Excursiones", href: "#excursiones" },
  { label: "Movilidad", href: "#movilidad" },
  { label: "Restaurantes", href: "#restaurantes" },
  { label: "Galerías", href: "#galerias" },
  { label: "Contacto", href: "#contacto" },
]

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a365d]/95 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-7xl px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Abrir menú"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px]">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">
                Tip: tocá una sección y baja directo.
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}