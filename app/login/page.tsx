"use client"

import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!supabase) return
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.replace("/mi-cuenta")
    })
  }, [router, supabase])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || busy) return
    setBusy(true)
    setMessage("")
    const { error } = mode === "signup"
      ? await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/mi-cuenta" },
        })
      : await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) { setMessage(error.message); return }
    if (mode === "signup") {
      setMessage("Revisá tu correo para confirmar la cuenta antes de ingresar.")
    } else {
      router.replace("/mi-cuenta")
    }
  }

  async function googleLogin() {
    if (!supabase || busy) return
    setBusy(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/mi-cuenta" },
    })
    if (error) { setMessage(error.message); setBusy(false) }
  }

  return (
    <main className="min-h-[75vh] bg-[#0b1f3a] px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">{mode === "login" ? "Ingresá a Nexo Iguazú" : "Creá tu cuenta"}</h1>
        <p className="mb-6 text-sm text-white/70">Registrate para solicitar asesoramiento personalizado.</p>
        {!supabase && <p role="alert" className="mb-4 rounded bg-amber-100 p-3 text-amber-950">Falta configurar Supabase en este entorno.</p>}
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">Correo electrónico
            <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900" />
          </label>
          <label className="block text-sm">Contraseña
            <input required minLength={6} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password} onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900" />
          </label>
          {message && <p role="status" className="rounded-lg bg-white/10 p-3 text-sm">{message}</p>}
          <button disabled={!supabase || busy} type="submit" className="w-full rounded-lg bg-[#d4a84b] p-3 font-semibold text-[#0b1f3a] disabled:opacity-50">
            {busy ? "Un momento..." : mode === "login" ? "Iniciar sesión" : "Registrarme"}
          </button>
        </form>
        <button type="button" disabled={!supabase || busy} onClick={googleLogin}
          className="mt-3 w-full rounded-lg border border-white/40 p-3 font-semibold disabled:opacity-50">
          Continuar con Google
        </button>
        <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage("") }}
          className="mt-5 block text-sm text-[#f0d48d] underline">
          {mode === "login" ? "¿No tenés cuenta? Registrate" : "¿Ya tenés cuenta? Ingresá"}
        </button>
        <Link href="/" className="mt-5 block text-sm text-white/70 underline">Volver al inicio</Link>
      </div>
    </main>
  )
}
