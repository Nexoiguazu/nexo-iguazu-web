"use client"

import FallbackImg from "@/components/FallbackImg"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Droplets,
  Users,
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Sun,
  Backpack,
  Clock,
  FileText,
  Sparkles,
  CheckCircle,
  Route,
  Compass,
  MessageCircle,
} from "lucide-react"

type InfoCard = {
  title: string
  badge?: string
  bullets: string[]
  highlight?: boolean
  cta?: { label: string; href: string }
  note?: string
}

function InfoCards() {
  const cards: InfoCard[] = [
    {
      title: "Transfer privado (RECOMENDADO)",
      badge: "Más cómodo",
      highlight: true,
      bullets: [
        "Te esperamos en arribos: bajás del avión y ya tenés tu chofer.",
        "Ideal con equipaje, niños o si querés evitar esperas.",
        "Directo a tu alojamiento (sin caminar ni puntos sobre la ruta).",
        "Precio cerrado: te lo confirmamos según hotel y cantidad de pasajeros.",
      ],
      cta: {
        label: "Cotizar transfer",
        href: "https://wa.me/543757558723?text=Hola!%20Quiero%20cotizar%20transfer%20desde%20el%20aeropuerto%20(IGR)%20al%20centro/hotel.",
      },
      note: "Respuesta rápida por WhatsApp. Coordinamos horario de vuelo y equipaje.",
    },
    {
      title: "Transporte público (IGR → Centro) — referencia",
      badge: "Económico",
      bullets: [
        "Frecuencia: cada 30 min aprox. (puede variar).",
        "Tarifa estimada: $10.000 por persona (referencia).",
        "Tip: si vienen 2 personas, por comodidad con valijas y tiempos suele convenir un coche/transfer.",
      ],
      note: "Valores y horarios sujetos a cambios. Te confirmamos alternativas al reservar.",
    },
  ]

  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className={[
              "rounded-2xl border shadow-sm p-6",
              c.highlight
                ? "bg-[#0b2a55] border-white/10 text-white"
                : "bg-white border-slate-200 text-slate-900",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-snug">{c.title}</h3>

              {c.badge && (
                <span
                  className={[
                    "text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap",
                    c.highlight ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700",
                  ].join(" ")}
                >
                  {c.badge}
                </span>
              )}
            </div>

            <ul
              className={[
                "mt-4 space-y-2 text-sm leading-relaxed",
                c.highlight ? "text-white/90" : "text-slate-600",
              ].join(" ")}
            >
              {c.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className={c.highlight ? "text-white/80" : "text-slate-400"}>•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {c.note && (
              <p className={["mt-4 text-xs", c.highlight ? "text-white/70" : "text-slate-500"].join(" ")}>
                {c.note}
              </p>
            )}

            {c.cta && (
              <div className="mt-5">
                <a
                  href={c.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
                    c.highlight ? "bg-[#d4a84b] text-[#0b2a55] hover:opacity-90" : "bg-slate-900 text-white hover:opacity-90",
                  ].join(" ")}
                >
                  {c.cta.label}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const whatsappLink = "https://wa.me/543757558723"

  const excursionsInternational = [
    {
      icon: Droplets,
      title: "Cataratas del Iguazú – Lado Argentino",
      price: "$32.000 por persona",
      duration: "Día completo (aprox. 6–9 h según ritmo)",
      includes: [
        "Traslado ida y vuelta (opcional según modalidad)",
        "Coordinación permanente",
        "Tiempo libre para recorrer los circuitos",
        "Acompañamiento general",
      ],
      ideal: "Primera visita, naturaleza y fotografía.",
      galleryId: "galeria-argentina",
      officialLinks: [
        { label: "Sitio oficial", href: "https://iguazuargentina.com/" },
        { label: "Tickets/planificación", href: "https://iguazuargentina.com/planifica-tu-visita/" },
      ],
    },
    {
      icon: Compass,
      title: "Cataratas Brasil + Parque das Aves",
      price: "Paquete completo: $40.000 por persona",
      duration: "Día completo (4-6 h)",
      notes: [
        "Modalidades disponibles:",
        "✔️ Todo junto (en el día o según itinerario)",
        "✔️ Excursiones individuales (consultar precios por separado)",
      ],
      includes: [
        "Traslado internacional",
        "Coordinación y tiempos organizados",
        "Visita panorámica a Cataratas del lado brasileño",
        "Parque das Aves",
        "AquaFoz (según modalidad)",
      ],
      ideal: "Experiencia completa en Brasil.",
      galleryId: "galeria-brasil",
      officialLinks: [
        { label: "Cataratas BR", href: "https://cataratasdoiguacu.com.br/" },
        { label: "Tickets Cataratas BR", href: "https://tickets.cataratasdoiguacu.com.br/" },
        { label: "Parque das Aves", href: "https://parquedasaves.com.br/" },
      ],
    },
    {
      icon: Sparkles,
      title: "Represa de ITAIPU",
      price: "$",
      duration: "Medio día (4–6 h)",
      includes: [
        "Traslado internacional",
        "Visita guiada (según opción disponible)",
        "Recorrido por una de las mayores obras de ingeniería del mundo",
      ],
      ideal: "Turismo cultural y tecnológico.",
      galleryId: "galeria-itaipu",
      officialLinks: [
        { label: "Itaipú (visitas)", href: "https://www.itaipu.gov.br/visitas/como-visitar-itaipu" },
        { label: "Turismo Itaipú", href: "https://turismoitaipu.com.br/" },
      ],
    },
    {
      icon: Route,
      title: "Compras en Paraguay + Duty Free",
      price: "$32.000 por persona",
      duration: "Día completo (6–9 h)",
      notes: ["Modalidades:", "✔️ Compras en Paraguay", "✔️ Duty Free", "✔️ Ambas opciones juntas o por separado"],
      includes: ["Traslado internacional", "Tiempo libre para compras", "Coordinación general"],
      ideal: "Compras, electrónica y perfumería.",
      galleryId: "galeria-compras",
      officialLinks: [{ label: "Requisitos de cruce", href: "#info" }],
    },
    {
      icon: Calendar,
      title: "Rafain – Restaurante con Show",
      price: "$20.000 por persona",
      duration: "Noche (3–4 h)",
      notes: ["Información adjunta:", "Cena show internacional", "Espectáculo artístico de primer nivel", "Danzas típicas de Latinoamérica", "Ambiente climatizado"],
      includes: [
        "Traslado ida y vuelta",
        "Coordinación",
        "Entrada al show (Cena se abona en el lugar, salvo promoción especial)",
      ],
      ideal: "Noche diferente y experiencia cultural.",
      galleryId: "galeria-rafain",
      officialLinks: [],
    },
  ]

  const excursionsZona = [
    {
      icon: Droplets,
      title: "Salto del Turista",
      price: "$20.000 por persona",
      duration: "Medio día (3–5 h)",
      includes: ["Traslado", "Acceso al salto", "Tiempo para caminatas y fotos"],
      ideal: "Naturaleza y tranquilidad.",
      galleryId: "galeria-salto-turista",
      officialLinks: [],
    },
    {
      icon: Droplets,
      title: "Salto Mbocay",
      price: "$15.000 por persona",
      duration: "Medio día (2–4 h)",
      includes: ["Traslado", "Visita al salto", "Tiempo libre"],
      ideal: "Escapada corta y económica.",
      galleryId: "galeria-mbocay",
      officialLinks: [],
    },
    {
      icon: Heart,
      title: "Minas de Wanda",
      price: "$25.000 por persona",
      duration: "Medio día (4–6 h)",
      includes: ["Traslado", "Visita guiada a las minas", "Explicación geológica y cultural"],
      ideal: "Familias y turismo educativo.",
      galleryId: "galeria-wanda",
      officialLinks: [],
    },
    {
      icon: Sun,
      title: "Paseo Náutico",
      price: "A confirmar",
      duration: "2–3 h",
      includes: ["Navegación por el río", "Vistas panorámicas", "Experiencia relajada"],
      ideal: "Disfrutar del entorno desde el agua.",
      galleryId: "galeria-nautico",
      officialLinks: [],
    },
    {
      icon: Backpack,
      title: "Selva Iryapú – Comunidades Originarias",
      price: "$20.000 por persona",
      duration: "2–4 h",
      includes: [
        "Traslado",
        "Caminatas por senderos selváticos",
        "Guías pertenecientes a comunidades originarias",
        "Experiencia cultural y natural auténtica",
      ],
      ideal: "Conexión con la naturaleza y la cultura local.",
      galleryId: "galeria-iryapu",
      officialLinks: [],
    },
  ]

  const movilidad = [
    {
      title: "Colectivo urbano (referencia)",
      items: ["Tarifa sujeta a cambios: te confirmamos al coordinar.", "Consejo: consultar por tarjeta local según empresa."],
    },
    {
      title: "Bus a Cataratas (referencia)",
      items: ["Salida desde el centro / terminal (según operador).", "Ideal si buscás opción económica; en temporada alta puede haber espera."],
    },
    {
      title: "Aeropuerto (IGR) (referencia)",
      items: ["Si llegás con valijas o en horarios ajustados, conviene transfer coordinado."],
    },
    {
      title: "Cruce a Brasil / Paraguay",
      items: ["Documento vigente (DNI/pasaporte según caso).", "En días pico, planificamos horarios para evitar demoras."],
    },
  ]

  const restaurantes = [
    
    {
      category: "Parrilla & argentino",
      list: [
        { name: "Parrillas del centro", note: "Ideal para carne y porciones abundantes.", area: "Centro" },
        { name: "Opciones premium", note: "Para cena con reserva y ambiente tranquilo.", area: "Ruta / zona hoteles" },
      ],
    },
    {
      category: "Experiencias",
      list: [
        { name: "Cena show", note: "Perfecto para la primera noche y grupos.", area: "Foz / Puerto Iguazú" },
        { name: "Degustación / pasos", note: "Ideal para parejas y aniversarios.", area: "Centro" },
      ],
    },
    {
      category: "Rápido y económico",
      list: [
        { name: "Hamburguesas / lomitos", note: "Cenas rápidas antes de descansar.", area: "Centro" },
        { name: "Pizzerías", note: "Opción rendidora para familias.", area: "Centro" },
      ],
    },
    {
      category: "Cafeterías & meriendas",
      list: [
        { name: "Café de especialidad", note: "Para arrancar temprano o merienda post-paseo.", area: "Centro" },
        { name: "Heladerías", note: "Plan corto para tarde/noche.", area: "Centro" },
      ],
    },
  ]

  const joyasOcultas = [
    { title: "Güirá Oga (rescate de fauna)", why: "Visita distinta y educativa; ideal como plan B si llueve.", how: "En taxi/transfer coordinado (horarios a confirmar)." },
    { title: "Jardín de los Picaflores", why: "Visita corta y fotogénica (ideal para tarde).", how: "Cerca del centro; se coordina según horario del lugar." },
    { title: "La Aripuca", why: "Cultural + recorrido corto; buena opción con niños.", how: "Acceso simple; conviene combinar con otro paseo." },
    { title: "Hito Tres Fronteras (atardecer)", why: "Fotos aseguradas y paseo nocturno fácil.", how: "Se puede ir en transfer o taxi; recomendamos horario de puesta de sol." },
  ]

  const allExcursions = [...excursionsInternational, ...excursionsZona]

  const wa = (name: string) =>
    `${whatsappLink}?text=${encodeURIComponent(`Hola! Quiero consultar por la excursión: ${name}`)}`

  const gallerySrc = (galleryId: string, n: number) => {
    const slug = galleryId.replace("galeria-", "")
    return `/gallery/${slug}/${n}.jpg`
  }

  return (
    <div className="min-h-screen bg-background pt-20 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a365d]/95 backdrop-blur-sm border-b h-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between overflow-x-hidden overflow-y-visible">
          <a href="#" className="flex items-center gap-2 h-full">
            <FallbackImg
              src="/images/mariposa-logo.png"
              alt="NEXO IGUAZU"
              className="h-18 md:h-20 w-auto"
              fallbackSrc="/images/placeholder.png"
              loading="lazy"
            />
            <span className="text-xl leading-none font-semibold text-[#d4a84b] whitespace-nowrap">NEXO IGUAZU</span>
          </a>

          <nav className="hidden md:flex items-center gap-5">
            <a href="#excursiones" className="text-white/70 hover:text-white transition-colors">
              Excursiones
            </a>
            <a href="#movilidad" className="text-white/70 hover:text-white transition-colors">
              Movilidad
            </a>
            <a href="#restaurantes" className="text-white/70 hover:text-white transition-colors">
              Restaurantes
            </a>
            <a href="#joyas" className="text-white/70 hover:text-white transition-colors">
              Joyas ocultas
            </a>
            <a href="#diferencial" className="text-white/70 hover:text-white transition-colors">
              Nuestro diferencial
            </a>
            <a href="#info" className="text-white/70 hover:text-white transition-colors">
              Info útil
            </a>
            <a href="#galerias" className="text-white/70 hover:text-white transition-colors">
              Galerías
            </a>
            <a href="#contacto" className="text-white/70 hover:text-white transition-colors">
              Contacto
            </a>

            <a
              href="#consultar"
              className="ml-2 inline-flex items-center rounded-md bg-[#d4a84b] px-4 py-2 text-[#0b1b2b] font-semibold hover:opacity-90 transition"
            >
              Consultar
            </a>
          </nav>
        </div>
      </header>

      {/* Hero con Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero-iguazu.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#1a365d]/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#d4a84b] leading-tight mb-4 text-balance">NEXO IGUAZU</h1>
            <p className="text-xl md:text-2xl text-[#7cc5e3] font-medium italic mb-6">Experiencias que dejan huella</p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl text-pretty">
              Excursiones y recorridos diseñados con guias profesionales. Organizacion real, atencion humana y coordinacion simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#7cc5e3] text-[#7cc5e3] hover:bg-[#7cc5e3]/10 bg-transparent"
                asChild
              >
                <a href="#excursiones">Ver excursiones</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Excursiones */}
      <section id="excursiones" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Internacionales */}
          <div className="mb-16">
            <p className="text-[#7cc5e3] font-medium mb-2">Excursiones Clásicas Internacionales</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">Experiencias imperdibles</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {excursionsInternational.map((item, i) => {
                const Icon = item.icon
                return (
                  <Card key={i} className="bg-white border border-[#1a365d]/10 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-[#7cc5e3]" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1a365d] mb-1">{item.title}</h3>
                      <p className="font-semibold text-[#d4a84b] mb-2">{item.price}</p>

                      <p className="text-sm text-[#1a365d]/70 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </p>

                      {item.notes && (
                        <ul className="text-sm text-[#1a365d]/70 mb-3 space-y-1">
                          {item.notes.map((n: string, idx: number) => (
                            <li key={idx}>{n}</li>
                          ))}
                        </ul>
                      )}

                      <ul className="text-sm text-[#1a365d]/80 mb-3 list-disc list-inside space-y-1">
                        {item.includes.map((inc: string, idx: number) => (
                          <li key={idx}>{inc}</li>
                        ))}
                      </ul>

                      <p className="text-sm italic text-[#1a365d]/70 mb-4">Ideal para: {item.ideal}</p>

                      {item.officialLinks && item.officialLinks.filter((l: any) => !!l.href).length > 0 ? (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-[#1a365d] mb-2">Fuentes / links oficiales</p>
                          <div className="flex flex-wrap gap-3">
                            {item.officialLinks
                              .filter((l: any) => !!l.href)
                              .map((l: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={l.href}
                                  target={l.href.startsWith("http") ? "_blank" : undefined}
                                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="text-sm text-[#1a365d] underline underline-offset-4 hover:text-[#0f2440]"
                                >
                                  {l.label}
                                </a>
                              ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="flex gap-3">
                        <Button variant="outline" asChild>
                          <a href={`#${item.galleryId}`}>Ver galería</a>
                        </Button>
                        <Button asChild>
                          <a href={wa(item.title)} target="_blank" rel="noopener noreferrer">
                            Consultar
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Zona */}
          <div>
            <p className="text-[#7cc5e3] font-medium mb-2">Paseos en la Zona</p>

            <div className="grid md:grid-cols-2 gap-6">
              {excursionsZona.map((item, i) => {
                const Icon = item.icon
                return (
                  <Card key={i} className="bg-white border border-[#1a365d]/10 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-[#7cc5e3]" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1a365d] mb-1">{item.title}</h3>
                      <p className="font-semibold text-[#d4a84b] mb-2">{item.price}</p>

                      <p className="text-sm text-[#1a365d]/70 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </p>

                      <ul className="text-sm text-[#1a365d]/80 mb-3 list-disc list-inside space-y-1">
                        {item.includes.map((inc: string, idx: number) => (
                          <li key={idx}>{inc}</li>
                        ))}
                      </ul>

                      <p className="text-sm italic text-[#1a365d]/70 mb-4">Ideal para: {item.ideal}</p>

                      <div className="flex gap-3">
                        <Button variant="outline" asChild>
                          <a href={`#${item.galleryId}`}>Ver galería</a>
                        </Button>
                        <Button asChild>
                          <a href={wa(item.title)} target="_blank" rel="noopener noreferrer">
                            Consultar
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section id="diferencial" className="py-20 px-4 bg-[#1a365d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Por que elegirnos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Diferencial</h2>
            <p className="text-white/70 max-w-2xl">Trabajamos para que tu experiencia sea simple, organizada y memorable.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Atencion humana" },
              { icon: CheckCircle, title: "Organizacion real" },
              { icon: Clock, title: "Coordinacion simple" },
              { icon: Sparkles, title: "Propuestas armadas" },
              { icon: Route, title: "Experiencias integradas" },
              { icon: Compass, title: "Diseño de recorridos" },
              { icon: Heart, title: "Enfoque emocional" },
              { icon: Users, title: "Relacion directa" },
            ].map((b, idx) => {
              const Icon = b.icon
              return (
                <div key={idx} className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <h3 className="font-semibold text-white">{b.title}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info util */}
      <section id="info" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Planifica tu viaje</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Info util para el turista</h2>
            <p className="text-[#1a365d]/70 max-w-2xl">Todo lo que necesitas saber para disfrutar tu experiencia en Iguazu.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Mejor epoca / clima</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Se puede visitar todo el año. Otoño y primavera ofrecen temperaturas agradables. En verano hace calor y hay mas caudal de agua.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Backpack className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Que llevar</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Impermeable o piloto, calzado comodo (se moja), repelente de insectos, protector solar y ropa liviana.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Horarios y reservas</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Recomendamos salir temprano para aprovechar el dia completo. Coordinar con anticipacion en temporada alta.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Si cruzas a Brasil</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Tene a mano tu documento de identidad o pasaporte vigente. Te ayudamos con la coordinacion del cruce.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold text-[#1a365d] mb-4">Dónde estamos</h3>
            <div className="overflow-hidden rounded-xl shadow-md">
              <iframe
                src="https://www.google.com/maps?q=Puerto+Iguaz%C3%BA,+Misiones,+Argentina&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Movilidad */}
      <section id="movilidad" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Cómo moverte</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Movilidad y transporte</h2>
            <p className="text-[#1a365d]/70 max-w-3xl">
              Información práctica para planificar tiempos y evitar imprevistos. Las tarifas pueden variar; al reservar te confirmamos valores y alternativas.
            </p>
          </div>

          {/* ✅ Cards nuevas (transfer + transporte público) */}
          <InfoCards />

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movilidad.map((m, i) => (
              <Card key={i} className="bg-white border-[#1a365d]/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Route className="h-5 w-5 text-[#d4a84b]" />
                    <h3 className="font-semibold text-[#1a365d]">{m.title}</h3>
                  </div>
                  <ul className="text-sm text-[#1a365d]/70 list-disc list-inside space-y-2">
                    {m.items.map((it: string, idx: number) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl border border-[#1a365d]/10 bg-[#f8fafc]">
            <h3 className="text-lg font-semibold text-[#1a365d] mb-2">Tip para ahorrar y ganar tiempo</h3>
            <p className="text-[#1a365d]/70 text-sm">
              Si tu objetivo es maximizar recorridos en pocos días, el transfer coordinado suele ahorrar esperas y permite combinar paradas.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurantes */}
      <section id="restaurantes" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Dónde comer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Restaurantes por intención</h2>
            <p className="text-[#1a365d]/70 max-w-3xl">
              En vez de un “top 10”, lo ordenamos por lo que buscás (parrilla, experiencia, rápido y barato, cafeterías).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {restaurantes.map((cat, i) => (
              <Card key={i} className="bg-white border border-[#1a365d]/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#1a365d] mb-4">{cat.category}</h3>
                  <div className="space-y-4">
                    {cat.list.map((r: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-lg bg-[#f8fafc] border border-[#1a365d]/10">
                        <p className="font-semibold text-[#1a365d]">{r.name}</p>
                        <p className="text-sm text-[#1a365d]/70">{r.note}</p>
                        <p className="text-xs text-[#1a365d]/60 mt-2">Zona: {r.area}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-6 rounded-xl bg-[#1a365d]">
            <div>
              <p className="text-white font-semibold">¿Querés recomendaciones según tu estilo?</p>
              <p className="text-white/70 text-sm">Decime presupuesto, horario y preferencias, y te paso 3 opciones concretas.</p>
            </div>
            <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
              <a
                href={`${whatsappLink}?text=${encodeURIComponent(
                  "Hola! Quiero recomendaciones de restaurantes (presupuesto, horario y preferencias)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir recomendaciones
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Joyas ocultas */}
      <section id="joyas" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Diferenciador</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Lugares poco visitados</h2>
            <p className="text-[#1a365d]/70 max-w-3xl">
              Opciones que suman valor si ya hiciste lo clásico, si querés algo corto, o si el clima no acompaña.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {joyasOcultas.map((j, i) => (
              <Card key={i} className="bg-white border border-[#1a365d]/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#1a365d] mb-2">{j.title}</h3>
                  <p className="text-[#1a365d]/70 mb-3">
                    <span className="font-medium text-[#1a365d]">Por qué vale la pena:</span> {j.why}
                  </p>
                  <p className="text-[#1a365d]/70">
                    <span className="font-medium text-[#1a365d]">Cómo ir:</span> {j.how}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galerías */}
{/* Galerías (solo acceso, sin mostrar fotos acá) */}
<section id="galerias" className="py-20 px-4 bg-background">
  <div className="max-w-6xl mx-auto">
    <div className="mb-8">
      <p className="text-[#7cc5e3] font-medium mb-2">Fotos reales</p>
      <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">
        Galerías por excursión
      </h2>
      <p className="text-[#1a365d]/70 max-w-3xl">
        Para que cargue más rápido y quede ordenado, las galerías están en un apartado separado.
      </p>
    </div>

    <div className="flex flex-wrap gap-3">
      <a
        href="/galerias"
        className="px-5 py-3 rounded-xl bg-[#1a365d] text-white font-semibold hover:opacity-90"
      >
        Ver galerías
      </a>

      <a
        href="/contacto?ref=galerias"
        className="px-5 py-3 rounded-xl bg-[#d4a84b] text-black font-semibold hover:opacity-90"
      >
        Consultar
      </a>
    </div>
  </div>
</section>


      {/* Contacto */}
      <section id="contacto" className="py-20 px-4 bg-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7cc5e3] font-medium mb-2">Contactanos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hablemos de tu viaje</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">Respondemos rapido y te armamos una propuesta a medida.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp: +54 3757 558723
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/70">
            <Mail className="h-4 w-4" />
            <a href="mailto:Nexoiguazu@gmail.com" className="hover:text-white transition-colors">
              Nexoiguazu@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0f2440] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <FallbackImg
                src="/images/mariposa-logo.png"
                alt="NEXO IGUAZU"
                className="h-20 w-auto"
                fallbackSrc="/images/placeholder.png"
                loading="lazy"
              />
              <span className="text-xl font-semibold text-[#d4a84b]">NEXO IGUAZU</span>
            </div>
            <p className="text-[#d4a84b] italic text-center md:text-right">Experiencias que dejan huella</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20">
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+54 3757 558723</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Nexoiguazu@gmail.com</span>
              </div>
            </div>
            <p className="text-white/50 text-sm">Lucila Owstroski - NEXO IGUAZU</p>
          </div>
        </div>
      </footer>

      {/* Boton flotante WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Burbuja Clima */}
      <div className="fixed bottom-24 left-6 z-[60]">
        <details className="group">
          <summary className="list-none cursor-pointer select-none">
            <div className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-2 shadow-lg border border-black/10 hover:shadow-xl transition">
              <span className="text-sm font-semibold text-[#1a365d]">Clima</span>
              <span className="text-xs text-[#1a365d]/60">7 días</span>
            </div>
          </summary>

          <div className="mt-3 w-[320px] max-w-[90vw] overflow-hidden rounded-2xl bg-white shadow-xl border border-black/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
              <p className="font-semibold text-[#1a365d]">Puerto Iguazú</p>
              <p className="text-xs text-[#1a365d]/60">Pronóstico 7 días</p>
            </div>

            <div className="p-2">
              <iframe
                src="https://forecast7.com/es/n25d60n54d57/puerto-iguazu/"
                width="100%"
                height="220"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}