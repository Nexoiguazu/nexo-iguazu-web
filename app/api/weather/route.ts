import { NextResponse } from "next/server"

// Puerto Iguazú (aprox.)
const LAT = -25.597
const LON = -54.578

// Open‑Meteo (sin API key): https://open-meteo.com/
// Devuelve "weathercode". Mapeamos a descripción ES + icono simple.
type WeatherMapped = {
  description: string
  icon: string
}

function mapWeatherCode(code: number, isNight: boolean): WeatherMapped {
  // Iconos estilo OpenWeather para mantener compatibilidad visual si ya los usabas.
  const day = !isNight

  // Fuente de códigos: Open‑Meteo / WMO (resumen). Mapeo pragmático.
  // 0: despejado
  if (code === 0) return { description: "cielo despejado", icon: day ? "01d" : "01n" }

  // 1-3: principalmente despejado / parcialmente nublado / nublado
  if (code === 1) return { description: "mayormente despejado", icon: day ? "02d" : "02n" }
  if (code === 2) return { description: "parcialmente nublado", icon: day ? "03d" : "03n" }
  if (code === 3) return { description: "nublado", icon: "04d" }

  // 45,48: niebla
  if (code === 45 || code === 48) return { description: "niebla", icon: "50d" }

  // 51-57: llovizna
  if (code >= 51 && code <= 57) return { description: "llovizna", icon: "09d" }

  // 61-67: lluvia
  if (code >= 61 && code <= 67) return { description: "lluvia", icon: "10d" }

  // 71-77: nieve / granos de nieve
  if (code >= 71 && code <= 77) return { description: "nieve", icon: "13d" }

  // 80-82: chubascos
  if (code >= 80 && code <= 82) return { description: "chubascos", icon: "09d" }

  // 85-86: chubascos de nieve
  if (code === 85 || code === 86) return { description: "chubascos de nieve", icon: "13d" }

  // 95-99: tormenta
  if (code >= 95 && code <= 99) return { description: "tormenta", icon: "11d" }

  // Fallback
  return { description: "clima variable", icon: day ? "03d" : "03n" }
}

export async function GET() {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${LAT}&longitude=${LON}` +
    "&current=temperature_2m,weather_code,is_day" +
    "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
    "&timezone=America%2FArgentina%2FCordoba"

  try {
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) {
      const details = await res.text()
      return NextResponse.json(
        { error: "Weather API error", status: res.status, details },
        { status: 500 }
      )
    }

    const data = await res.json()

    const isDay = Boolean(data?.current?.is_day)
    const currentCode = Number(data?.current?.weather_code ?? 0)
    const currentMapped = mapWeatherCode(currentCode, !isDay)

    const times: string[] = data?.daily?.time ?? []
    const mins: number[] = data?.daily?.temperature_2m_min ?? []
    const maxs: number[] = data?.daily?.temperature_2m_max ?? []
    const codes: number[] = data?.daily?.weather_code ?? []

    // date: usamos timestamp UNIX (segundos) para compatibilidad con el front
    const daily = times.slice(0, 7).map((t, i) => {
      const dtSeconds = Math.floor(new Date(`${t}T12:00:00`).getTime() / 1000)
      const mapped = mapWeatherCode(Number(codes?.[i] ?? 0), false)
      return {
        date: dtSeconds,
        min: Math.round(Number(mins?.[i] ?? 0)),
        max: Math.round(Number(maxs?.[i] ?? 0)),
        icon: mapped.icon,
        description: mapped.description,
      }
    })

    return NextResponse.json({
      current: {
        temp: Math.round(Number(data?.current?.temperature_2m ?? 0)),
        description: currentMapped.description,
        icon: currentMapped.icon,
      },
      daily,
      provider: "open-meteo",
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: "Weather API error", details: String(err?.message ?? err) },
      { status: 500 }
    )
  }
}
