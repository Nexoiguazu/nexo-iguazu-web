"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function MiCuenta() {
  const [email, setEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) { setLoading(false); return }
    let active = true
    async function checkAdmin(userId: string | undefined) {
      if (!userId) { if (active) setIsAdmin(false); return }
      const { data } = await supabase!.from("nexo_admins")
        .select("user_id").eq("user_id", userId).maybeSingle()
      if (active) setIsAdmin(!!data)
    }
    void supabase.auth.getUser().then(({ data }) => {
      if (active) { setEmail(data.user?.email ?? null); setLoading(false) }
      void checkAdmin(data.user?.id)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setEmail(session?.user?.email ?? null)
      void checkAdmin(session?.user?.id)
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
        {isAdmin && <p className="mb-5"><Link href="/admin" className="rounded-lg border border-[#d4a84b] px-4 py-2 text-[#f0d48d]">Abrir panel de administración</Link></p>}
        <button onClick={logout} className="rounded bg-[#d4a84b] px-4 py-2 text-slate-900">Cerrar sesión</button>
      </> : <Link href="/login" className="underline">Ingresá para continuar</Link>}
    </div>
  </main>
}
