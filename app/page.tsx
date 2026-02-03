"use client"

import IguazuCarousel from "@/components/IguazuCarousel"
import { useState } from "react"
import WeatherCard from "@/components/WeatherCard"
import FallbackImg from "@/components/FallbackImg"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Droplets,
  Heart,
  Calendar,
  Phone,
  Mail,
  Sun,
  Backpack,
  Clock,
  FileText,
  Sparkles,
  Route,
  Compass,
  MessageCircle,
  Car,
  Menu,
  X,
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
        "Te esperamos en arribos: bajás del avión y ya tenés a tu chofer.",
        "Ideal con equipaje, niños o si querés evitar esperas.",
        "Directo a tu alojamiento (sin caminar ni esperar sobre la ruta).",
        "Precio cerrado: te lo confirmamos según hotel y cantidad de pasajeros.",
      ],
      cta: {
        label: "Cotizar transfer",
        href: "https://wa.me/543757558723?text=Hola!%20Quiero%20cotizar%20un%20transfer%20desde%20el%20aeropuerto%20(IGR)%20al%20centro/hotel.",
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
              c.highlight ? "bg-[#0b2a55] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900",
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

            <ul className={["mt-4 space-y-2 text-sm leading-relaxed", c.highlight ? "text-white/90" : "text-slate-600"].join(" ")}>
              {c.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className={c.highlight ? "text-white/80" : "text-slate-400"}>•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {c.note && <p className={["mt-4 text-xs", c.highlight ? "text-white/70" : "text-slate-500"].join(" ")}>{c.note}</p>}

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

type OfficialLink = { label: string; href: string }

type Excursion = {
  icon: any
  title: string
  price: string
  duration: string
  includes: string[]
  ideal: string
  notes?: string[]
  officialLinks?: OfficialLink[]
}

function buildWhatsAppUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

function buildExcursionWhatsAppUrl(phone: string, excursionTitle: string) {
  const msg = `Hola 👋 Quiero consultar por la excursión: ${excursionTitle}. ¿Me pasás precios y disponibilidad?`
  return buildWhatsAppUrl(phone, msg)
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const excursionsPhone = "543757558723" // Excursiones
  const remisPhone = "543757508950" // Remis

  const whatsappMessage = "¡Hola! 👋 Quiero info y precios de las excursiones de Nexo Iguazú. ¿Me ayudás?"
  const remisMessage = "¡Hola! 🚗 Quiero pedir un remis/transfer. ¿Me decís disponibilidad, precio y tiempo de espera? Origen: ___  Destino: ___"

  const whatsappLink = buildWhatsAppUrl(excursionsPhone, whatsappMessage)
  const remisLink = buildWhatsAppUrl(remisPhone, remisMessage)

  const excursionesInternational: Excursion[] = [
    {
      icon: Droplets,
      title: "Cataratas del Iguazú – Lado Argentino",
      price: "Desde $32.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar",
      duration: "Día completo (aprox. 6–9 h según ritmo)",
      includes: [
        "Traslado ida y vuelta (opcional según modalidad).",
        "Coordinación y tiempos organizados con 24 h de anticipación.",
        "Tiempo libre para recorrer los circuitos.",
        "Acompañamiento general con guías profesionales del Parque.",
      ],
      ideal: "Primera visita, naturaleza y fotografía.",
      officialLinks: [
        { label: "Sitio oficial", href: "https://iguazuargentina.com/" },
        { label: "Tickets/planificación", href: "https://iguazuargentina.com/planifica-tu-visita/" },
      ],
    },
    {
      icon: Compass,
      title: "Cataratas Brasil + Parque das Aves",
      price: "Paquete completo: $40.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar",
      duration: "Día completo (4–6 h)",
      notes: ["Modalidades disponibles:", "✔️ Todo junto (en el día o según itinerario).", "✔️ Excursiones individuales (consultar precios por separado)."],
      includes: [
        "Traslado internacional.",
        "Coordinación y tiempos organizados.",
        "Visita panorámica a Cataratas del lado brasileño.",
        "Parque das Aves.",
        "AquaFoz (según modalidad).",
      ],
      ideal: "Experiencia completa en Brasil.",
      officialLinks: [
        { label: "Cataratas BR", href: "https://cataratasdoiguacu.com.br/" },
        { label: "Tickets Cataratas BR", href: "https://tickets.cataratasdoiguacu.com.br/" },
        { label: "Parque das Aves", href: "https://parquedasaves.com.br/" },
      ],
    },
    {
      icon: Sparkles,
      title: "Paraguay/Itaipú",
      price: "$50.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar",
      duration: "Medio día (4–6 h)",
      includes: ["Traslado internacional.", "Visita guiada (según opción disponible).", "Recorrido por una de las mayores obras de ingeniería del mundo."],
      ideal: "Turismo cultural y tecnológico.",
      officialLinks: [
        { label: "Itaipú (visitas)", href: "https://www.itaipu.gov.br/visitas/como-visitar-itaipu" },
        { label: "Turismo Itaipú", href: "https://turismoitaipu.com.br/" },
      ],
    },
    {
      icon: Route,
      title: "Compras en Paraguay — Shopping + auto con espera",
      price: "$34.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar",
      duration: "3 h (auto en espera)",
      notes: [
        "Modalidad:",
        "✔️ Te llevamos al shopping que elijas (zona Foz / Ciudad del Este).",
        "✔️ 3 horas de espera con el coche.",
        "✔️ Ideal para compras puntuales y sin complicaciones.",
        "Tip: con la web https://comprasparaguay.com.ar/ verificás en qué shopping está lo que necesitás y vas directo.",
        "Encargos (opcional): si no hay tiempo, coordinamos con gente que trae productos.",
      ],
      includes: ["Traslado ida y vuelta.", "3 horas de espera del vehículo.", "Coordinación."],
      ideal: "Compras rápidas con movilidad privada y guía de dónde conviene ir.",
      officialLinks: [{ label: "Web Compras Paraguay", href: "https://comprasparaguay.com.ar/" }],
    },
  ]

  const excursionesZona: Excursion[] = [
    { icon: Droplets, title: "Salto del Turista", price: "$20.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar", duration: "Medio día (3–5 h)", includes: ["Traslado.", "Acceso al salto.", "Tiempo para caminatas y fotos."], ideal: "Naturaleza y tranquilidad." },
    { icon: Droplets, title: "Salto Mbocay", price: "$15.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar", duration: "Medio día (2–4 h)", includes: ["Traslado.", "Visita al salto.", "Tiempo libre."], ideal: "Escapada corta y económica." },
    { icon: Heart, title: "Minas de Wanda", price: "A confirmar", duration: "Medio día (4–6 h)", includes: ["Traslado.", "Visita guiada a las minas.", "Explicación geológica y cultural."], ideal: "Familias y turismo educativo." },
    { icon: Sun, title: "Paseo náutico", price: "$30.000 por persona(mín. 10 pax) — 4 a 9 pax: consultar", duration: "2–3 h", includes: ["Navegación por el río.", "Vistas panorámicas.", "Experiencia relajada."], ideal: "Disfrutar del entorno desde el agua." },
    {
      icon: Backpack,
      title: "Selva Iryapú – Comunidades originarias",
      price: "$20.000 por persona (mín. 10 pax) — 4 a 9 pax: consultar",
      duration: "2–4 h",
      includes: ["Traslado.", "Caminatas por senderos selváticos.", "Guías pertenecientes a comunidades originarias.", "Experiencia cultural y natural auténtica."],
      ideal: "Conexión con la naturaleza y la cultura local.",
    },
  ]

  const otrasExcursiones = [
    { title: "Güirá Oga (rescate de fauna)", desc: "Visita distinta y educativa; ideal como plan B si llueve." },
    { title: "Jardín de los Picaflores", desc: "Visita corta y fotogénica; ideal para la tarde." },
    { title: "La Aripuca", desc: "Cultural + recorrido corto; buena opción con niños." },
    { title: "Hito Tres Fronteras (atardecer)", desc: "Fotos aseguradas y paseo nocturno fácil." },
  ]

  const movilidad = [
    { title: "Colectivo urbano (referencia)", items: ["Tarifa sujeta a cambios: te confirmamos al coordinar.", "Consejo: consultá por tarjeta local según empresa."] },
    { title: "Bus a Cataratas (referencia)", items: ["Salida desde el centro / terminal (según operador).", "Ideal si buscás opción económica; en temporada alta puede haber espera."] },
    { title: "Aeropuerto (IGR) (referencia)", items: ["Si llegás con valijas o en horarios ajustados, conviene un transfer coordinado."] },
    { title: "Cruce a Brasil / Paraguay", items: ["Documento vigente (DNI/pasaporte según el caso).", "En días pico, planificamos horarios para evitar demoras."] },
  ]

  const navItems = [
    { href: "#excursiones", label: "Excursiones" },
    { href: "#otras-excursiones", label: "Otras excursiones" },
    { href: "#movilidad", label: "Movilidad" },
    { href: "#info", label: "Info útil" },
    { href: "#contacto", label: "Contacto" },
  ]

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0b1f3a] overflow-x-hidden">

      {/* ✅ Carrusel ARRIBA del hero (MÓVIL + DESKTOP) */}
      <section className="bg-[#0b1f3a] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="w-full">
            <IguazuCarousel className="mt-6 shadow-lg" speedPx={60} count={50} />
          </div>
        </div>
      </section>
      {/* Hero con video */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero-iguazu.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#1a365d]/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#d4a84b] leading-tight mb-4 text-balance">NEXO IGUAZÚ</h1>
            <p className="text-xl md:text-2xl text-[#7cc5e3] font-medium italic mb-6">Experiencias que dejan huella</p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl text-pretty">
              Excursiones y recorridos diseñados con guías profesionales. Organización real, atención humana y coordinación simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-[#7cc5e3] text-[#7cc5e3] hover:bg-[#7cc5e3]/10 bg-transparent" asChild>
                <a href="#excursiones">Ver excursiones</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clima */}
      <section className="py-8 bg-[#0b1f3a]">
        <div className="mx-auto max-w-6xl px-4">
          <WeatherCard />
        </div>
      </section>

      {/* Excursiones */}
      <section id="excursiones" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Internacionales */}
          <div className="mb-16">
            <p className="text-[#7cc5e3] font-medium mb-2">Excursiones clásicas internacionales</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">Experiencias imperdibles</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {excursionesInternational.map((item, i) => {
                const Icon = item.icon
                const consultUrl = buildExcursionWhatsAppUrl(excursionsPhone, item.title)

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
                        <ul className="text-sm text-[#1a365d]/70 mb-3 space-y-1 max-w-full break-words">
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

                      {item.officialLinks?.some((l: any) => !!l.href) ? (
                        <div className="mt-5">
                          <div className="flex items-center gap-3">
                            <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-wide">Fuentes / links oficiales</p>
                            <div className="h-px flex-1 bg-[#d4a84b]/30" />
                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                            {item.officialLinks
                              .filter((l: any) => !!l.href)
                              .map((l: any, idx: number) => (
                                <a
                                  key={idx}
                                  href={l.href}
                                  target={l.href.startsWith("http") ? "_blank" : undefined}
                                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="text-sm text-[#1a365d] underline underline-offset-4 hover:text-[#d4a84b]"
                                >
                                  {l.label}
                                </a>
                              ))}
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-6">
                        <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                          <a href={consultUrl} target="_blank" rel="noopener noreferrer">
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
            <p className="text-[#7cc5e3] font-medium mb-2">Paseos en la zona</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">Opciones cercanas</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {excursionesZona.map((item, i) => {
                const Icon = item.icon
                const consultUrl = buildExcursionWhatsAppUrl(excursionsPhone, item.title)

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

                      <div className="mt-6">
                        <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                          <a href={consultUrl} target="_blank" rel="noopener noreferrer">
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

      {/* Otras excursiones */}
      <section id="otras-excursiones" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Más opciones</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Otras excursiones</h2>
            <p className="text-[#1a365d]/70 max-w-3xl">Alternativas cortas y buenas para sumar al itinerario (o como plan B si el clima no acompaña).</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {otrasExcursiones.map((j, i) => {
              const consultUrl = buildExcursionWhatsAppUrl(excursionsPhone, j.title)
              return (
                <Card key={i} className="bg-white border border-[#1a365d]/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#1a365d] mb-2">{j.title}</h3>
                    <p className="text-[#1a365d]/70 mb-5">{j.desc}</p>

                    <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                      <a href={consultUrl} target="_blank" rel="noopener noreferrer">
                        Consultar
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Info útil */}
      <section id="info" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Planificá tu viaje</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Info útil para el turista</h2>
            <p className="text-[#1a365d]/70 max-w-2xl">Todo lo que necesitás saber para disfrutar tu experiencia en Iguazú.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Mejor época / clima</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Se puede visitar todo el año. Otoño y primavera ofrecen temperaturas agradables. En verano hace calor y hay más caudal de agua.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Backpack className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Qué llevar</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">
                  Impermeable o piloto, calzado cómodo (se moja), repelente de insectos, protector solar y ropa liviana.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Horarios y reservas</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">Recomendamos salir temprano para aprovechar el día completo. Coordiná con anticipación en temporada alta.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-[#d4a84b]" />
                  <h3 className="font-semibold text-[#1a365d]">Si cruzás a Brasil</h3>
                </div>
                <p className="text-[#1a365d]/70 text-sm">Tené a mano tu documento de identidad o pasaporte vigente. Te ayudamos con la coordinación del cruce.</p>
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

      {/* Contacto */}
      <section id="contacto" className="py-20 px-4 bg-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7cc5e3] font-medium mb-2">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hablemos de tu viaje</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">Respondemos rápido y te armamos una propuesta a medida.</p>

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
              nexoiguazu@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0f2440] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <FallbackImg src="/images/mariposa-logo.png" alt="NEXO IGUAZÚ" className="h-20 w-auto" fallbackSrc="/images/placeholder.png" loading="lazy" />
              <span className="text-xl font-semibold text-[#d4a84b]">NEXO IGUAZÚ</span>
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
                <span>nexoiguazu@gmail.com</span>
              </div>
            </div>
            <p className="text-white/50 text-sm">Lucila Owstroski - NEXO IGUAZÚ</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante Remis */}
      <a
        href={remisLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#d4a84b] text-[#1a365d] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Pedir remis por WhatsApp"
      >
        <Car className="h-7 w-7" />
      </a>
    </div>
  )
}
