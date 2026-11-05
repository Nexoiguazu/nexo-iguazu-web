"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function MiCuenta() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) { setLoading(false); return }
    let active = true
    void supabase.auth.getUser().then(({ data }) => {
      if (active) { setEmail(data.user?.email ?? null); setLoading(false) }
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setEmail(session?.user?.email ?? null)
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [])
  async function logout() {
    await getSupabaseClient()?.auth.signOut()
    setEmail(null)
  }
  return <main className="min-h-[70vh] bg-[#0b1f3a] p-8 text-white">
    <div className="mx-auto max-w-lg rounded-xl border border-white/20 p-6">
      <h1 className="mb-4 text-2xl font-bold">Mi cuenta</h1>
      {loading ? <p>Comprobando sesión...</p> : email ? <>
        <p>Sesión iniciada: {email}</p>
        <p className="my-4">Próximamente: consultas y chat privado.</p>
        <button onClick={logout} className="rounded bg-[#d4a84b] px-4 py-2 text-slate-900">Cerrar sesión</button>
      </> : <Link href="/login" className="underline">Ingresá para continuar</Link>}
    </div>
  </main>
}
