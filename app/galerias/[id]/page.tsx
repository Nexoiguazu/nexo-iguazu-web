import Link from "next/link"

export default function GaleriaDetalle({ params }: { params: { id: string } }) {
  const { id } = params
  const images = Array.from({ length: 6 }, (_, i) => `/gallery/${id}/${i + 1}.jpg`)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/galerias" className="text-sm text-[#1a365d]/70 hover:underline">
        ← Volver a galerías
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mt-4">
        Galería: {id}
      </h1>

      <p className="text-[#1a365d]/70 mt-2">
        Para cargar tus fotos, reemplazá archivos en{" "}
        <span className="font-medium">/public/gallery/{id}/1.jpg ... 6.jpg</span>.
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, idx) => (
          <div key={src} className="overflow-hidden rounded-xl border border-[#1a365d]/10 bg-white">
            <img
              src={src}
              alt={`${id} foto ${idx + 1}`}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
export const dynamicParams = false

export function generateStaticParams() {
  return ["argentina", "brasil", "compras", "iryapu", "itaipu", "mbocay"].map((id) => ({ id }))
}
