import { Suspense } from "react"
import ContactClient from "./ContactClient"

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[#1a365d]/70">Cargando…</div>}>
      <ContactClient />
    </Suspense>
  )
}