import Link from "next/link"

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
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[#7cc5e3] font-medium mb-2">Fotos reales</p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Galerías por excursión</h1>
      <p className="text-[#1a365d]/70 max-w-3xl">
        Elegí una excursión para ver sus fotos. Las imágenes se cargan desde{" "}
        <span className="font-medium">/public/gallery/&lt;id&gt;/1.jpg ... 6.jpg</span>.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {galerias.map((g) => (
          <div key={g.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1a365d]">{g.title}</h3>
            <p className="text-sm text-[#1a365d]/70 mt-1">{g.subtitle}</p>

            <div className="mt-4 flex gap-3">
              <Link
                href={`/galerias/${g.id}`}
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
        ))}
      </div>
    </main>
  )
}
