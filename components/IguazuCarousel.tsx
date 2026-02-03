"use client"

import { useEffect, useMemo, useRef } from "react"
import Image from "next/image"

type Props = {
  className?: string
  speedPx?: number // px por segundo
  count?: number   // cuántas imágenes existen (1..count)
  folder?: string  // carpeta dentro de /public (ej: "iguazu-carousel")
  ext?: "jpg" | "png" | "webp"
}

export default function IguazuCarousel({
  className = "shadow-lg",
  speedPx = 60,
  count = 29,
  folder = "iguazu-carousel", // ✅ FIX: coincide con /public/iguazu-carousel
  ext = "jpg",
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number>(0)
  const xRef = useRef<number>(0)
  const runningRef = useRef<boolean>(false)

  const baseFolder = useMemo(() => {
    // Asegura que arranque con "/" aunque te pasen "iguazu-carousel"
    if (!folder) return "/iguazu-carousel"
    return folder.startsWith("/") ? folder : `/${folder}`
  }, [folder])

  const images = useMemo(() => {
    // /public/iguazu-carousel/1.jpg ... N.jpg  =>  /iguazu-carousel/1.jpg ... N.jpg
    return Array.from({ length: count }, (_, i) => `${baseFolder}/${i + 1}.${ext}`)
  }, [count, baseFolder, ext])

  // duplicamos para loop infinito
  const loopImages = useMemo(() => [...images, ...images], [images])

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Si querés que SIEMPRE se mueva aunque el user tenga reduce motion,
    // comentá este if.
    if (prefersReduce) return

    const tick = (t: number) => {
      if (!runningRef.current) return
      if (!lastRef.current) lastRef.current = t
      const dt = (t - lastRef.current) / 1000
      lastRef.current = t

      xRef.current -= speedPx * dt

      // ancho del primer set (la mitad del track duplicado)
      const half = track.scrollWidth / 2
      if (half > 0 && Math.abs(xRef.current) >= half) xRef.current = 0

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (runningRef.current) return
      runningRef.current = true
      lastRef.current = 0
      rafRef.current = requestAnimationFrame(tick)
    }

    const stop = () => {
      runningRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    // Solo correr cuando esté en pantalla
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting)
        if (inView) start()
        else stop()
      },
      { threshold: 0.15 }
    )
    io.observe(wrap)

    // Pausar en hover (desktop) pero NO romper mobile
    const onEnter = () => stop()
    const onLeave = () => start()
    wrap.addEventListener("mouseenter", onEnter)
    wrap.addEventListener("mouseleave", onLeave)

    return () => {
      stop()
      io.disconnect()
      wrap.removeEventListener("mouseenter", onEnter)
      wrap.removeEventListener("mouseleave", onLeave)
    }
  }, [speedPx])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        {loopImages.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative h-16 w-28 sm:h-20 sm:w-36 shrink-0 rounded-xl overflow-hidden"
          >
            <Image
              src={src}
              alt="Nexo Iguazu"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover"
              priority={idx < 6}
              onError={(e) => {
                // Oculta el contenedor si falla la imagen (evita “cuadritos rotos”)
                const el = (e.target as HTMLElement).closest("div")
                if (el) (el as HTMLElement).style.display = "none"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}