import Link from "next/link"
import { notFound } from "next/navigation"
import SafeImg from "@/components/SafeImg"

const GALERIAS = [
  { id: "argentina", title: "Cataratas del Iguazú – Lado Argentino" },
  { id: "brasil", title: "Cataratas del Iguazú – Lado Brasilero" },
  { id: "compras", title: "Compras (NO Paraguay)" },
  { id: "iyapu", title: "Yvapú" },
  { id: "itaipu", title: "Itaipú" },
  { id: "mbocay", title: "M’bocay" },
  { id: "nautico", title: "Náutico" },
] as const

export const dynamicParams = true

export function generateStaticParams() {
  return GALERIAS.map((g) => ({ id: g.id }))
}

const ALLOWED = new Set(GALERIAS.map((g) => g.id))

export default function GaleriaDetalle({ params }: { params: { id: string } }) {
  const id = params?.id
  if (!id || !ALLOWED.has(id)) notFound()

  const title = GALERIAS.find((g) => g.id === id)?.title ?? id

  const MAX = 30
  const images = Array.from({ length: MAX }, (_, i) => `/gallery/${id}/${i + 1}.jpg`)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/galerias" className="text-sm text-[#1a365d]/70 hover:underline">
        ← Volver a galerías
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mt-4">
        Galería: {title}
      </h1>

      <p className="text-[#1a365d]/70 mt-2">
        Subí fotos como{" "}
        <span className="font-medium">/public/gallery/{id}/1.jpg ...</span> (podés cargar todas las que quieras).
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <div key={src} className="overflow-hidden rounded-xl border border-[#1a365d]/10 bg-white">
            <SafeImg
              src={src}
              alt={`${title} foto ${idx + 1}`}
              className="h-40 w-full object-cover"
              hideOnError={true}
            />
          </div>
        ))}
      </div>
    </main>
  )
}