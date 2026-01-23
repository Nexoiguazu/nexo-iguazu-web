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
  MessageCircle
} from "lucide-react"

export default function HomePage() {
  const whatsappLink = "https://wa.me/543757558723"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a365d]/95 backdrop-blur-sm border-b border-[#2a4a7a]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img 
              src="/images/mariposa-logo.png" 
              alt="NEXO IGUAZU" 
              className="h-16 w-auto"
            />
            <span className="text-xl font-semibold text-[#d4a84b]">NEXO IGUAZU</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#excursiones" className="text-white/70 hover:text-white transition-colors">Excursiones</a>
            <a href="#diferencial" className="text-white/70 hover:text-white transition-colors">Nuestro diferencial</a>
            <a href="#info" className="text-white/70 hover:text-white transition-colors">Info util</a>
            <a href="#contacto" className="text-white/70 hover:text-white transition-colors">Contacto</a>
          </nav>
          <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Consultar</a>
          </Button>
        </div>
      </header>

      {/* Hero con Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-[#1a365d]/70" />
        
        {/* Contenido */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#d4a84b] leading-tight mb-4 text-balance">
              NEXO IGUAZU
            </h1>
            <p className="text-xl md:text-2xl text-[#7cc5e3] font-medium italic mb-6">
              Experiencias que dejan huella
            </p>
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
              <Button size="lg" variant="outline" className="border-[#7cc5e3] text-[#7cc5e3] hover:bg-[#7cc5e3]/10 bg-transparent" asChild>
                <a href="#excursiones">Ver excursiones</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Excursiones */}
      <section id="excursiones" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Nuestras propuestas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Excursiones</h2>
            <p className="text-[#1a365d]/70 max-w-2xl">
              Recorridos pensados para que vivas Iguazu de manera autentica y sin complicaciones.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white border-[#1a365d]/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-[#7cc5e3]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a365d] mb-2">Cataratas del Iguazu (lado argentino)</h3>
                <p className="text-[#1a365d]/70 mb-4">
                  Recorrido completo por los circuitos del Parque Nacional Iguazu con guia profesional.
                </p>
                <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Consultar</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-[#7cc5e3]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a365d] mb-2">Cataratas (lado brasileño)</h3>
                <p className="text-[#1a365d]/70 mb-4">
                  Vista panoramica de las cataratas desde Brasil. Coordinamos todo el cruce fronterizo.
                </p>
                <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Consultar</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#7cc5e3]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a365d] mb-2">City tour + hitos locales</h3>
                <p className="text-[#1a365d]/70 mb-4">
                  Recorrido por la ciudad y sus puntos de interes. Conoce la historia y cultura de la region.
                </p>
                <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Consultar</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#1a365d]/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-[#1a365d] flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-[#7cc5e3]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a365d] mb-2">Experiencias personalizadas</h3>
                <p className="text-[#1a365d]/70 mb-4">
                  Armamos propuestas a medida segun tus intereses, tiempos y preferencias.
                </p>
                <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#1a365d] font-semibold" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Consultar</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Diferencial */}
      <section id="diferencial" className="py-20 px-4 bg-[#1a365d]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Por que elegirnos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestro Diferencial</h2>
            <p className="text-white/70 max-w-2xl">
              Trabajamos para que tu experiencia sea simple, organizada y memorable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Heart className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Atencion humana</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Organizacion real</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Coordinacion simple</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Propuestas armadas</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Route className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Experiencias integradas</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Compass className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Diseño de recorridos</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Heart className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Enfoque emocional</h3>
            </div>

            <div className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-[#d4a84b] flex items-center justify-center">
                <Users className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h3 className="font-semibold text-white">Relacion directa</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Info util */}
      <section id="info" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#7cc5e3] font-medium mb-2">Planifica tu viaje</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Info util para el turista</h2>
            <p className="text-[#1a365d]/70 max-w-2xl">
              Todo lo que necesitas saber para disfrutar tu experiencia en Iguazu.
            </p>
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
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 px-4 bg-[#1a365d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#7cc5e3] font-medium mb-2">Contactanos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hablemos de tu viaje
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Respondemos rapido y te armamos una propuesta a medida.
          </p>
          
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
              <img 
                src="/images/mariposa-logo.png" 
                alt="NEXO IGUAZU" 
                className="h-20 w-auto"
              />
              <span className="text-xl font-semibold text-[#d4a84b]">NEXO IGUAZU</span>
            </div>
            <p className="text-[#d4a84b] italic text-center md:text-right">
              Experiencias que dejan huella
            </p>
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
            <p className="text-white/50 text-sm">
              Lucila Owstroski - NEXO IGUAZU
            </p>
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
    </div>
  )
}
