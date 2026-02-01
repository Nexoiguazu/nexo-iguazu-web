"use client"

import { useEffect, useMemo, useState } from "react"

const LAT = -25.597
const LON = -54.578
const TZ = "America/Argentina/Catamarca"

type WeatherData = {
  current_weather?: {
    temperature: number
    windspeed: number
    weathercode: number
    time: string
  }
  daily?: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weathercode: number[]
    precipitation_probability_max?: number[]
  }
}

function codeToTextES(code: number) {
  if (code === 0) return "Despejado"
  if (code === 1) return "Mayormente despejado"
  if (code === 2) return "Parcialmente nublado"
  if (code === 3) return "Nublado"
  if (code === 45 || code === 48) return "Niebla"
  if ([51, 53, 55].includes(code)) return "Llovizna"
  if ([56, 57].includes(code)) return "Llovizna helada"
  if ([61, 63, 65].includes(code)) return "Lluvia"
  if ([66, 67].includes(code)) return "Lluvia helada"
  if ([71, 73, 75, 77].includes(code)) return "Nieve"
  if ([80, 81, 82].includes(code)) return "Chubascos"
  if ([85, 86].includes(code)) return "Chubascos de nieve"
  if (code === 95) return "Tormenta"
  if ([96, 99].includes(code)) return "Tormenta con granizo"
  return "Clima"
}

function codeToEmoji(code: number) {
  if (code === 0) return "☀️"
  if ([1, 2].includes(code)) return "🌤️"
  if (code === 3) return "☁️"
  if ([45, 48].includes(code)) return "🌫️"
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️"
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️"
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"
  if ([95, 96, 99].includes(code)) return "⛈️"
  return "🌡️"
}

function formatDowEs(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00")
  // abreviado para que entre bien: lun, mar, mié...
  return d.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "")
}

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let canceled = false

    async function run() {
      try {
        setLoading(true)
        setErr(null)

        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${LAT}&longitude=${LON}` +
          `&current_weather=true` +
          `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
          `&timezone=${encodeURIComponent(TZ)}`

        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) throw new Error("No se pudo cargar el clima")

        const json = (await res.json()) as WeatherData
        if (!canceled) setData(json)
      } catch (e: any) {
        if (!canceled) setErr(e?.message ?? "Error cargando clima")
      } finally {
        if (!canceled) setLoading(false)
      }
    }

    run()
    return () => {
      canceled = true
    }
  }, [])

  const week = useMemo(() => {
    const d = data?.daily
    if (!d) return []
    const days = d.time.slice(0, 7).map((date, i) => ({
      date,
      dow: formatDowEs(date),
      code: d.weathercode?.[i] ?? 0,
      max: Math.round(d.temperature_2m_max?.[i] ?? 0),
      min: Math.round(d.temperature_2m_min?.[i] ?? 0),
      pop: d.precipitation_probability_max?.[i],
    }))
    return days
  }, [data])

  const cw = data?.current_weather
  const headline =
    cw ? `${Math.round(cw.temperature)}°C · ${codeToTextES(cw.weathercode)}` : "—"

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0b1f3a]/80 backdrop-blur p-5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/70">Clima en Iguazú · 7 días</p>

          {loading ? (
            <h3 className="mt-1 text-xl font-semibold text-white">Cargando…</h3>
          ) : err ? (
            <h3 className="mt-1 text-xl font-semibold text-white">No disponible</h3>
          ) : (
            <h3 className="mt-1 text-xl font-semibold text-white">
              {headline}
            </h3>
          )}

          {!loading && !err && week[0] ? (
            <p className="mt-2 text-sm text-white/70">
              Hoy: Máx {week[0].max}° · Mín {week[0].min}°
              {typeof week[0].pop === "number" ? ` · Lluvia ${week[0].pop}%` : ""}
            </p>
          ) : null}

          {!loading && err ? (
            <p className="mt-2 text-sm text-white/70">{err}</p>
          ) : null}
        </div>

        <div className="text-3xl leading-none">
          {!loading && !err ? codeToEmoji(cw?.weathercode ?? week[0]?.code ?? 0) : "🌡️"}
        </div>
      </div>

      {/* Pronóstico 7 días */}
      <div className="mt-4 grid grid-cols-7 gap-2">
        {week.length === 0 && !loading && !err ? (
          <div className="col-span-7 text-sm text-white/70">Sin datos.</div>
        ) : null}

        {week.map((d) => (
          <div
            key={d.date}
            className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center"
            title={codeToTextES(d.code)}
          >
            <div className="text-xs text-white/70">{d.dow}</div>
            <div className="mt-1 text-lg">{codeToEmoji(d.code)}</div>
            <div className="mt-1 text-xs text-white">
              <span className="font-semibold">{d.max}°</span>
              <span className="text-white/60"> / {d.min}°</span>
            </div>
            {typeof d.pop === "number" ? (
              <div className="mt-1 text-[10px] text-white/60">{d.pop}%</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}