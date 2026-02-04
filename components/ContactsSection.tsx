"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Phone,
  MapPin,
  MessageCircle,
  Building2,
  ShoppingCart,
  UtensilsCrossed,
  Search,
} from "lucide-react"

type Category = "farmacias" | "supermercados" | "comidas" | "otros"

type ContactItem = {
  id: string
  name: string
  category: Category
  zone?: string // ej: "Centro", "Zona hoteles"
  hours?: string
  phone?: string // formato: +54375...
  whatsapp?: string // formato: +54375...
  address?: string
  mapsUrl?: string // link directo a Google Maps
  tags?: string[] // ej: ["24 hs", "delivery"]
}

const CATEGORY_META: Record<Category, { title: string; subtitle: string; icon: any }> = {
  farmacias: {
    title: "Farmacias",
    subtitle: "Guardias, medicamentos, primeros auxilios",
    icon: Building2,
  },
  supermercados: {
    title: "Supermercados",
    subtitle: "Compras, perfumería, reposición rápida",
    icon: ShoppingCart,
  },
  comidas: {
    title: "Comidas",
    subtitle: "Delivery de comida y opciones cercanas",
    icon: UtensilsCrossed,
  },
  otros: {
    title: "Otros",
    subtitle: "Heladerías, servicios y contactos varios",
    icon: Building2,
  },
}

// ✅ Cargá acá tus contactos reales (podés empezar con 6–12 y crecer)
const CONTACTS: ContactItem[] = [
  {
    id: "farm-rys",
    name: "Rys",
    category: "farmacias",
    zone: "Av. Republica Argentina 189",
    hours: "Lun a Sab 07:00–21:30 / Dom 09:00–12:30 y 17:00–21:00",
    phone: "+543757434398",
    whatsapp: "+543757434398",
    mapsUrl: "https://maps.app.goo.gl/wYEbvcDJkL8drYsP8",
    tags: [
      "delivery",
      "obra social",
      "OSDE",
      "Prevención Salud",
      "Swiss Medical",
      "Medifé",
      "TV Salud",
    ],
  },
  {
    id: "farm-gio-farma",
    name: "Gio Farma",
    category: "farmacias",
    zone: "Av. Republica Argentina 757",
    hours: "Lun a Sab 07:00–23:00 / Dom 09:30 y 17:00–21:00",
    phone: "+543757363911",
    whatsapp: "+543757363911",
    mapsUrl: "https://maps.app.goo.gl/X9gCevVpch4gmZdc6",
    tags: ["delivery", "mín $5.000", "web: giofarma.ar", "horario a confirmar"],
  },
  {
    id: "sup-autoservicio-cataratas",
    name: "Autoservicio Cataratas",
    category: "supermercados",
    zone: "B. Nuevo Iguazú",
    hours: "08:00–12:30 / 16:00–22:00",
    phone: "+543757502533",
    whatsapp: "+543757502533",
    tags: ["envíos", "mín $6.000"],
  },
  {
    id: "com-la-tucumana",
    name: "La Tucumana (Pizzas y Empanadas)",
    category: "comidas",
    zone: "Centro",
    hours: "20:00–23:55",
    phone: "+543757678538",
    whatsapp: "+543757678538",
    tags: ["delivery", "miércoles cerrado"],
  },
  {
    id: "com-imperio",
    name: "Imperio",
    category: "comidas",
    zone: "Centro",
    hours: "20:00–00:00",
    phone: "+543757516565",
    whatsapp: "+543757516565",
    mapsUrl: "https://maps.app.goo.gl/znMRL4QPGfxoZZ3w6",
    tags: ["delivery", "lunes cerrado"],
  },
  {
    id: "com-lidia-delicias",
    name: "Lidia Delicias",
    category: "comidas",
    zone: "Centro",
    hours: "19:00–23:00",
    phone: "+543757442783",
    whatsapp: "+543757442783",
    tags: ["delivery", "todos los días"],
  },
  {
    id: "otr-heladeria-duomo",
    name: "Heladería Duomo",
    category: "otros",
    zone: "Centro",
    hours: "17:00–23:00",
    phone: "+543757446949",
    whatsapp: "+543757446949",
    mapsUrl: "https://maps.app.goo.gl/m2S2Znm4MhBVnwzt5",
    tags: ["delivery", "heladería"],
  },
  {
    id: "com-gaby-chipas",
    name: "Gaby Chipas",
    category: "comidas",
    zone: "Centro",
    hours: "08:00–18:00",
    phone: "+543757554314",
    whatsapp: "+543757554314",
    mapsUrl: "https://maps.app.goo.gl/GbpF3zZrM5t67XUi9",
    tags: ["envíos", "chipa"],
  },
  {
    id: "com-jasy-restaurante",
    name: "Jasy Restaurante",
    category: "comidas",
    zone: "Centro",
    hours: "18:00–00:00",
    whatsapp: "+543757625928",
    phone: "+543757576678",
    mapsUrl: "https://maps.app.goo.gl/m7q1JDg6AjkxpP5K6",
    tags: ["sin envíos", "2 teléfonos"],
  },
  {
    id: "otr-importado-paraguay",
    name: "Importado Paraguay",
    category: "otros",
    phone: "+543757",
    tags: ["tel incompleto", "compras en Paraguay", "mandado"],
  },
]

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

function toWaLink(numberE164: string, text?: string) {
  const n = numberE164.replace(/[^\d+]/g, "")
  const msg = text ? `?text=${encodeURIComponent(text)}` : ""
  return `https://wa.me/${n.replace("+", "")}${msg}`
}

export default function ContactsSection() {
  const [active, setActive] = useState<Category>("farmacias")
  const [q, setQ] = useState("")

  const items = useMemo(() => {
    const query = normalize(q)
    return CONTACTS.filter((c) => c.category === active).filter((c) => {
      if (!query) return true
      const hay = normalize(
        [
          c.name,
          c.zone,
          c.hours,
          c.address,
          ...(c.tags ?? []),
          c.phone,
          c.whatsapp,
        ]
          .filter(Boolean)
          .join(" ")
      )
      return hay.includes(query)
    })
  }, [active, q])

  const meta = CATEGORY_META[active]
  const Icon = meta.icon

  return (
    <section id="servicios" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[#7cc5e3] font-medium mb-2">Para el turista</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d]">
            Contactos útiles en Iguazú
          </h2>
          <p className="text-[#1a365d]/70 mt-2 max-w-3xl">
            Farmacias, delivery de supermercado y comida. Información orientativa:
            disponibilidad y horarios dependen del proveedor.
          </p>
        </div>

        {/* Selector de categoría + buscador */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {(["farmacias", "supermercados", "comidas", "otros"] as Category[]).map(
              (cat) => {
                const m = CATEGORY_META[cat]
                const CatIcon = m.icon
                const isActive = active === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 border transition",
                      isActive
                        ? "bg-[#1a365d] text-white border-[#1a365d]"
                        : "bg-white text-[#1a365d] border-[#1a365d]/20 hover:border-[#1a365d]/40",
                    ].join(" ")}
                    type="button"
                  >
                    <CatIcon className="h-4 w-4" />
                    <span className="text-sm font-semibold">{m.title}</span>
                  </button>
                )
              }
            )}
          </div>

          <div className="md:ml-auto w-full md:w-[360px]">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1a365d]/60" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por nombre, zona, 24 hs, delivery..."
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Header mini */}
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-[#1a365d]/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-[#1a365d]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a365d]">{meta.title}</h3>
            <p className="text-sm text-[#1a365d]/70">{meta.subtitle}</p>
          </div>
        </div>

        {/* Listado */}
        {items.length === 0 ? (
          <Card className="border-[#1a365d]/15">
            <CardContent className="p-6">
              <p className="text-[#1a365d]/80">
                No hay resultados para “{q}”. Probá con “24 hs”, “delivery” o borrá
                el filtro.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c) => (
              <Card key={c.id} className="border-[#1a365d]/15">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-[#1a365d] leading-snug">
                        {c.name}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.zone && (
                          <Badge variant="secondary" className="rounded-full">
                            {c.zone}
                          </Badge>
                        )}
                        {c.hours && (
                          <Badge variant="secondary" className="rounded-full">
                            {c.hours}
                          </Badge>
                        )}
                        {(c.tags ?? []).slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="rounded-full border-[#1a365d]/20 text-[#1a365d]"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {(c.address || c.mapsUrl) && (
                    <div className="mt-4 text-sm text-[#1a365d]/80 space-y-1">
                      {c.address ? (
                        <p className="flex gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-[#1a365d]/60" />
                          <span>{c.address}</span>
                        </p>
                      ) : (
                        <p className="flex gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-[#1a365d]/60" />
                          <span>Ubicación en el mapa</span>
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.phone && (
                      <Button asChild variant="outline" className="gap-2">
                        <a href={`tel:${c.phone.replace(/\s/g, "")}`}>
                          <Phone className="h-4 w-4" />
                          Llamar
                        </a>
                      </Button>
                    )}
                    {c.whatsapp && (
                      <Button
                        asChild
                        className="gap-2 bg-[#25D366] hover:bg-[#20bd59]"
                      >
                        <a
                          href={toWaLink(
                            c.whatsapp,
                            "Hola! Me pasaron tu contacto desde Nexo Iguazú. Quería consultar por..."
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                    )}
                    {c.mapsUrl && (
                      <Button asChild variant="secondary" className="gap-2">
                        <a
                          href={c.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="h-4 w-4" />
                          Cómo llegar
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA para sumar contactos */}
        <div className="mt-10 rounded-2xl border border-[#1a365d]/15 bg-[#1a365d]/5 p-6">
          <p className="text-[#1a365d] font-semibold">
            ¿Querés sumar un contacto o corregir datos?
          </p>
          <p className="text-sm text-[#1a365d]/70 mt-1">
            Enviame el nombre, zona, horarios y WhatsApp, y lo agrego al listado.
          </p>
        </div>
      </div>
    </section>
  )
}