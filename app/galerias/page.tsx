"use client"

import Link from "next/link"
import SafeImg from "@/components/SafeImg"
import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const galerias = [
  { id: "argentina", title: "Cataratas del Iguazú – Lado Argentino", subtitle: "Día completo (aprox. 6–9 h)" },
  { id: "brasil", title: "Cataratas del Iguazú – Lado Brasilero", subtitle: "Medio día (aprox. 4–6 h)" },
  { id: "compras", title: "Compras (NO Paraguay)", subtitle: "3 h (auto en espera)" },
  { id: "iyapu", title: "Yvapú", subtitle: "Galería" },
  { id: "itaipu", title: "Itaipú", subtitle: "Galería" },
  { id: "mbocay", title: "M’bocay", subtitle: "Galería" },
  { id: "nautico", title: "Náutico", subtitle: "Galería" },
]

export default function GaleriasPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get("g")
  const open = !!selected

  const selectedGaleria = useMemo(() => {
    if (!selected) return null
    return galerias.find((x) => x.id === selected) ?? null
  }, [selected])

  // Cerrar modal con ESC
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/galerias")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, router])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[#7cc5e3] font-medium mb-2">Fotos reales</p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Galerías por excursión</h1>
      <p className="text-[#1a365d]/70 max-w-3xl">
        Elegí una excursión para ver sus fotos. Las imágenes se cargan desde{" "}
        <span className="font-medium">/public/gallery/&lt;id&gt;/1.jpg ...</span>.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {galerias.map((g) => {
          const preview = [1, 2, 3, 4].map((n) => `/gallery/${g.id}/${n}.jpg`)

          return (
            <div key={g.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1a365d]">{g.title}</h3>
              <p className="text-sm text-[#1a365d]/70 mt-1">{g.subtitle}</p>

              {/* 👇 Preview de 4 fotos */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {preview.map((src, idx) => (
                  <div
                    key={src}
                    className="aspect-square overflow-hidden rounded-xl border border-[#1a365d]/10 bg-slate-50"
                  >
                    <SafeImg
                      src={src}
                      alt={`${g.title} preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                      hideOnError={false}
                      fallbackSrc="/images/placeholder.jpg"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/galerias?g=${g.id}`}
                  className="px-4 py-2 rounded-xl bg-[#1a365d] text-white text-sm font-semibold hover:opacity-90"
                >
                  Ver galería
                </Link>

                <Link
                  href={`/contacto?ref=galeria-${g.id}`}
                  className="px-4 py-2 rounded-xl border text-sm font-medium hover:bg-slate-50"
                >
                  Consultar
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* ===== Modal Galería (sin shadcn) ===== */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => router.push("/galerias")} />

          {/* panel */}
          <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b p-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1a365d]">
                  {selectedGaleria ? `Galería: ${selectedGaleria.title}` : "Galería"}
                </h2>
                {selectedGaleria && (
                  <p className="text-sm text-[#1a365d]/70 mt-1">
                    Fotos desde{" "}
                    <span className="font-medium">/public/gallery/{selectedGaleria.id}/1.jpg ...</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => router.push("/galerias")}
                className="px-3 py-2 rounded-xl border text-sm font-medium hover:bg-slate-50"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="p-4 max-h-[75vh] overflow-auto">
              {selectedGaleria ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: 30 }, (_, i) => `/gallery/${selectedGaleria.id}/${i + 1}.jpg`).map(
                    (src, idx) => (
                      <div
                        key={src}
                        className="overflow-hidden rounded-xl border border-[#1a365d]/10 bg-white"
                      >
                        <SafeImg
                          src={src}
                          alt={`${selectedGaleria.title} foto ${idx + 1}`}
                          className="h-40 w-full object-cover"
                          hideOnError={true}
                          fallbackSrc="/images/placeholder.jpg"
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#1a365d]/70">Galería no encontrada.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}