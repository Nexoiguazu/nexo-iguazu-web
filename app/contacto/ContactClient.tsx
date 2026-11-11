"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { MessageCircle } from "lucide-react"

function waLink(number: string, msg: string): string | null {
  const digits = number.replace(/\D/g, "")
  if (!/^\d{10,15}$/.test(digits)) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`
}

export default function ContactClient() {
  const searchParams = useSearchParams()
  const [whatsappNumber, setWhatsappNumber] = useState("")
  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) return
    let active = true
    void supabase.from("nexo_settings").select("value_text")
      .eq("key", "advisory_whatsapp").maybeSingle()
      .then(({ data, error }) => {
        if (active && !error) setWhatsappNumber(data?.value_text ?? "")
      })
    return () => { active = false }
  }, [])
  const ref = searchParams.get("ref") || ""

  // Si viene "galeria-argentina" lo convertimos a algo legible
  const from = ref
    .replace(/^galeria-/, "")
    .replace(/-/g, " ")
    .trim()

  const msg =
    from.length > 0
      ? `Hola 👋 Quiero consultar por la excursión: ${from}. ¿Me pasás precios y disponibilidad?`
      : "Hola 👋 Quiero info y precios de las excursiones de Nexo Iguazú. ¿Me ayudás?"

  const href = waLink(whatsappNumber, msg)

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-[#1a365d]/70 hover:underline">
        ← Volver al inicio
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-[#1a365d]">Contacto</h1>

      <div className="mt-6 rounded-2xl border border-[#1a365d]/10 bg-white p-6 shadow-sm">
        <p className="text-sm text-[#1a365d]/70">Abrí WhatsApp con el mensaje listo:</p>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#d4a84b] px-4 py-2 text-sm font-semibold text-[#1a365d] hover:opacity-90"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Abrir WhatsApp
          </a>
        ) : (
          <p className="mt-4 text-sm text-[#1a365d]/70">
            El WhatsApp de asesoramiento todavía no está configurado en esta versión de prueba.
          </p>
        )}

        <p className="mt-4 text-xs text-[#1a365d]/60 break-words">Mensaje: {msg}</p>
      </div>
    </main>
  )
}