"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"

type Props = {
  className?: string
  /** cantidad máxima de fotos: /public/iguazu-carousel/1.jpg ... N.jpg */
  count?: number
  /** velocidad de scroll en px/seg (recomendado 40–120) */
  speedPx?: number
}

export default function IguazuCarousel({ className, count = 50, speedPx = 60 }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const baseRef = useRef<HTMLDivElement | null>(null)

  const [inView, setInView] = useState(false)
  const [baseWidth, setBaseWidth] = useState(0)

  const pausedRef = useRef(false)
  const pausedUntilRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 })

  // Ajuste: para que en mobile arrastre más (menos "poquito")
  const DRAG_SENSITIVITY = 1.25

  // Guardamos qué imágenes existen (las que fallan se marcan false y se omiten)
  const [ok, setOk] = useState<boolean[]>(() => Array.from({ length: count }, () => true))

  const srcs = useMemo(() => {
    const arr: string[] = []
    for (let i = 1; i <= count; i++) arr.push(`/iguazu-carousel/${i}.jpg`)
    return arr
  }, [count])

  const visibleIndexes = useMemo(() => {
    const idxs: number[] = []
    for (let i = 0; i < srcs.length; i++) if (ok[i]) idxs.push(i)
    return idxs
  }, [ok, srcs.length])

  function pauseFor(ms: number) {
    const until = performance.now() + ms
    pausedUntilRef.current = Math.max(pausedUntilRef.current, until)
  }

  function setHoverPaused(val: boolean) {
    pausedRef.current = val
  }

  // IntersectionObserver: autoplay SOLO cuando el carrusel está visible (más permisivo en mobile)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        setInView(!!e?.isIntersecting) // suficiente, sin threshold alto
      },
      {
        threshold: [0, 0.1, 0.25, 0.5],
        rootMargin: "200px 0px", // ayuda a que no se "apague" al borde del viewport
      }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Pausa si el tab está oculto (mejor performance)
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        pausedRef.current = true
      } else {
        pausedRef.current = false
        pauseFor(300)
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  // Medir ancho del "strip" base (para loop perfecto)
  useEffect(() => {
    const base = baseRef.current
    if (!base) return

    const ro = new ResizeObserver(() => {
      setBaseWidth(base.scrollWidth)
    })
    ro.observe(base)
    return () => ro.disconnect()
  }, [visibleIndexes.length])

  // Scroll continuo (solo si visible + si hay más de 1 imagen válida)
  useEffect(() => {
    if (!inView) return
    if (visibleIndexes.length <= 1) return
    if (!baseWidth) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const scroller = scrollerRef.current
      if (!scroller) return

      // Pausas (hover, interacción, etc.)
      if (pausedRef.current || now < pausedUntilRef.current) {
        last = now
        raf = requestAnimationFrame(tick)
        return
      }

      const delta = now - last
      last = now

      scroller.scrollLeft += (speedPx * delta) / 1000

      // Loop infinito suave
      if (scroller.scrollLeft >= baseWidth) {
        scroller.scrollLeft -= baseWidth
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, visibleIndexes.length, baseWidth, speedPx])

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    if (!scroller) return

    dragRef.current = { active: true, startX: e.clientX, startScroll: scroller.scrollLeft }
    pausedRef.current = true
    pauseFor(999999) // se libera al soltar

    scroller.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    if (!scroller) return
    if (!dragRef.current.active) return

    const dx = (e.clientX - dragRef.current.startX) * DRAG_SENSITIVITY
    scroller.scrollLeft = dragRef.current.startScroll - dx

    // Mantener dentro del loop
    if (scroller.scrollLeft < 0) {
      scroller.scrollLeft += baseWidth
    } else if (scroller.scrollLeft >= baseWidth) {
      scroller.scrollLeft -= baseWidth
    }
  }

  function stopDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    if (scroller) {
      try {
        scroller.releasePointerCapture(e.pointerId)
      } catch {}
    }
    dragRef.current.active = false
    pausedRef.current = false
    pausedUntilRef.current = 0
    pauseFor(900) // un poquito de pausa después del swipe
  }

  const Slide = ({ src, i }: { src: string; i: number }) => (
    <div
      className={[
        "shrink-0",
        // Más chico en general (antes era enorme en desktop)
        "w-[70vw] sm:w-[320px] md:w-[380px] lg:w-[440px] xl:w-[480px]",
      ].join(" ")}
    >
      <div className="overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/10">
        {/* Alturas más controladas y CONSISTENTES (antes base y dup eran distintas) */}
        <div className="w-full h-[170px] sm:h-[210px] md:h-[250px] lg:h-[290px]">
          <img
            src={src}
            alt={`Iguazú ${i + 1}`}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            draggable={false}
            onError={() => {
              setOk((prev) => {
                const next = [...prev]
                next[i] = false
                return next
              })
            }}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div ref={wrapRef} className={["w-full", className ?? ""].join(" ")}>
      <div className="relative">
        <div
          ref={scrollerRef}
          role="region"
          aria-label="Carrusel de fotos de Iguazú"
          className={[
            "w-full",
            // Importante: permitir scroll (y que scrollLeft funcione siempre)
            "overflow-x-auto overflow-y-hidden",
            "flex",
            "touch-pan-x",
            "overscroll-x-contain",
            "pb-4",
            // ocultar scrollbars
            "[-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
            // extra para iOS
            "[-webkit-overflow-scrolling:touch]",
            // UX
            "cursor-grab active:cursor-grabbing",
            "select-none",
          ].join(" ")}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onPointerLeave={(e) => {
            // si se va el pointer fuera, cortamos drag
            if (dragRef.current.active) stopDrag(e)
          }}
          onTouchStart={() => pauseFor(1200)}
          onWheel={() => pauseFor(1200)}
        >
          {/* BASE */}
          <div ref={baseRef} className="flex gap-3 shrink-0">
            {srcs.map((src, i) => (ok[i] ? <Slide key={`base-${src}`} src={src} i={i} /> : null))}
          </div>

          {/* DUPLICADO para loop infinito */}
          <div className="flex gap-3 shrink-0" aria-hidden="true">
            {srcs.map((src, i) => (ok[i] ? <Slide key={`dup-${src}`} src={src} i={i} /> : null))}
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-white/60 md:hidden">
          Se mueve solo. Podés deslizar con el dedo para avanzar más rápido.
        </p>
      </div>
    </div>
  )
}