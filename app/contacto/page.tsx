"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const WHATSAPP_NUMBER = "543757558723"

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function ContactoPage() {
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref") || ""

  // Ej: ref = "galeria-argentina" -> "argentina"
  const from = ref.startsWith("galeria-") ? ref.replace("galeria-", "") : ref

  const msg =
    from && from.length > 0
      ? `Hola! 👋 Quiero consultar por la excursión/galería: ${from}. ¿Me pasás precios y disponibilidad?`
      : "Hola! 👋 Quiero info y precios de las excursiones de Nexo Iguazú. ¿Me ayudás?"

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-[#1a365d]/70 hover:underline">
        ← Volver al inicio
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mt-4">Contacto</h1>
      <p className="text-[#1a365d]/70 mt-2">
        {from ? (
          <>
            Consulta rápida por: <span className="font-semibold text-[#1a365d]">{from}</span>
          </>
        ) : (
          "Contanos qué excursión querés hacer y te pasamos opciones y precios."
        )}
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-[#1a365d]/80">Abrí WhatsApp con el mensaje listo:</p>

        <a
          className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-[#1a365d] text-white hover:opacity-90"
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir WhatsApp
        </a>

        <p className="mt-4 text-xs text-[#1a365d]/60 whitespace-pre-wrap">
          Mensaje: {msg}
        </p>
      </div>
    </main>
  )
}