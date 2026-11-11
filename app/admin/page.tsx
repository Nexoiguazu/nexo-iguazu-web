"use client"

import Link from "next/link"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"

type Excursion = {
  id: string
  title: string
  price_text: string
  duration: string
  description: string
  image_url: string | null
  is_published: boolean
  position: number
}

type Draft = Omit<Excursion, "id"> & { id?: string }

const blank: Draft = {
  title: "",
  price_text: "Consultar",
  duration: "",
  description: "",
  image_url: null,
  is_published: false,
  position: 50,
}

export default function AdminPage() {
  const supabase = getSupabaseClient()
  const [access, setAccess] = useState<"loading" | "login" | "denied" | "ready" | "setup">("loading")
  const [items, setItems] = useState<Excursion[]>([])
  const [draft, setDraft] = useState<Draft>({ ...blank })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (!supabase) { setAccess("setup"); return }
    let active = true

    async function checkAccess() {
      if (!supabase) return
      const { data: auth, error: authError } = await supabase.auth.getUser()
      if (!active) return
      if (authError || !auth.user) { setAccess("login"); return }

      const { data, error } = await supabase.from("nexo_admins")
        .select("user_id")
        .eq("user_id", auth.user.id)
        .maybeSingle()

      if (!active) return
      if (error) {
        setFeedback("Falta preparar la base de datos o revisar los permisos. Consultá la guía de instalación.")
        setAccess("setup")
      } else if (!data) {
        setAccess("denied")
      } else {
        setAccess("ready")
        const response = await supabase.from("nexo_excursions")
          .select("id,title,price_text,duration,description,image_url,is_published,position")
          .order("position", { ascending: true })
          .order("title", { ascending: true })
        if (!active) return
        if (response.error) setFeedback("No se pudieron leer las excursiones: " + response.error.message)
        else setItems((response.data ?? []) as Excursion[])
      }
    }

    void checkAccess()
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        void checkAccess()
      }
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [supabase])

  async function refresh() {
    if (!supabase) return
    const { data, error } = await supabase.from("nexo_excursions")
      .select("id,title,price_text,duration,description,image_url,is_published,position")
      .order("position", { ascending: true })
      .order("title", { ascending: true })
    if (error) setFeedback("Error al actualizar la lista: " + error.message)
    else setItems((data ?? []) as Excursion[])
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || access !== "ready" || saving) return
    setSaving(true)
    setFeedback("")
    const payload = {
      title: draft.title.trim(),
      price_text: draft.price_text.trim() || "Consultar",
      duration: draft.duration.trim(),
      description: draft.description.trim(),
      image_url: draft.image_url?.trim() || null,
      is_published: draft.is_published,
      position: Number.isFinite(draft.position) ? draft.position : 50,
    }

    const response = draft.id
      ? await supabase.from("nexo_excursions").update(payload).eq("id", draft.id)
      : await supabase.from("nexo_excursions").insert(payload)

    setSaving(false)
    if (response.error) {
      setFeedback("No se pudo guardar: " + response.error.message)
      return
    }
    setFeedback("Cambios guardados. Revisá la vista previa del sitio.")
    setDraft({ ...blank })
    await refresh()
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file || !supabase || access !== "ready") return
    event.target.value = ""
    const allowed: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }
    if (!allowed[file.type] || file.size > 5 * 1024 * 1024) {
      setFeedback("Elegí una imagen JPG, PNG o WebP de hasta 5 MB.")
      return
    }
    setUploading(true)
    setFeedback("")
    const path = "excursiones/" + crypto.randomUUID() + "." + allowed[file.type]
    const { error } = await supabase.storage.from("nexo-excursions").upload(path, file, {
      contentType: file.type,
      upsert: false,
    })
    setUploading(false)
    if (error) { setFeedback("No se pudo subir la foto: " + error.message); return }
    const { data } = supabase.storage.from("nexo-excursions").getPublicUrl(path)
    setDraft(current => ({ ...current, image_url: data.publicUrl }))
    setFeedback("Fotografía subida. Ahora presioná Guardar excursión para asociarla.")
  }

  async function remove(item: Excursion) {
    if (!supabase || access !== "ready") return
    if (!window.confirm('¿Eliminar "' + item.title + '" de la lista?')) return
    const { error } = await supabase.from("nexo_excursions").delete().eq("id", item.id)
    if (error) setFeedback("No se pudo eliminar: " + error.message)
    else { setDraft({ ...blank }); setFeedback("Excursión eliminada."); await refresh() }
  }

  const field = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900"
  const gold = "rounded-lg bg-[#d4a84b] px-4 py-3 font-semibold text-[#0b1f3a] disabled:opacity-50"

  if (access !== "ready") {
    return <main className="min-h-[70vh] bg-[#0b1f3a] px-4 py-12 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/20 p-7">
        <h1 className="mb-4 text-2xl font-bold">Administración · Nexo Iguazú</h1>
        {access === "loading" && <p>Comprobando el acceso...</p>}
        {access === "login" && <>
          <p className="mb-5">Iniciá sesión para acceder al panel.</p>
          <Link href="/login" className={gold}>Ir al inicio de sesión</Link>
        </>}
        {access === "denied" && <p>Esta cuenta no tiene permisos de administración. El acceso se habilita de forma segura desde Supabase, no desde el registro público.</p>}
        {access === "setup" && <p>{feedback || "Falta configurar Supabase."} El procedimiento está en <code>docs/ADMIN_SETUP.md</code> del repositorio.</p>}
        <p className="mt-6 text-sm text-white/60">Los visitantes y usuarios normales no pueden editar excursiones.</p>
      </div>
    </main>
  }

  return <main className="min-h-[80vh] bg-[#0b1f3a] px-4 py-8 text-white">
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#d4a84b]">Acceso verificado</p>
          <h1 className="text-3xl font-bold">Panel de Nexo Iguazú</h1>
          <p className="text-sm text-white/70">Editá excursiones, precios y fotografías desde acá.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/contactos" className="rounded-lg bg-[#d4a84b] px-4 py-2 text-sm font-semibold text-[#0b1f3a]">
            Gestionar contactos útiles
          </Link>
          <Link href="/" className="rounded-lg border border-white/30 px-4 py-2 text-sm">Ver página pública</Link>
        </div>
      </div>

      {feedback && <p role="status" className="rounded-lg border border-[#d4a84b]/40 bg-white/10 p-3 text-sm">{feedback}</p>}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="rounded-xl border border-white/20 bg-white/5 p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Tus excursiones ({items.length})</h2>
            <button className="text-sm text-[#f0d48d] underline" onClick={() => { setDraft({ ...blank }); setFeedback("") }}>+ Nueva</button>
          </div>
          <div className="space-y-2">
            {items.length === 0 && <p className="text-sm text-white/70">Todavía no hay excursiones. Ejecutá la migración de la guía para cargar las existentes.</p>}
            {items.map(item => <div key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 p-3">
              <div className="min-w-0">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-[#f0d48d]">{item.price_text}</p>
                <p className="text-xs text-white/60">{item.is_published ? "Publicada" : "Oculta"}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button className="rounded border border-white/30 px-3 py-1 text-sm" onClick={() => { setDraft({ ...item }); setFeedback("") }}>Editar</button>
                <button className="text-xs text-red-200 underline" onClick={() => void remove(item)}>Eliminar</button>
              </div>
            </div>)}
          </div>
        </section>

        <section className="rounded-xl border border-white/20 bg-white/5 p-5">
          <h2 className="mb-4 text-xl font-semibold">{draft.id ? "Editar excursión" : "Nueva excursión"}</h2>
          <form onSubmit={save} className="space-y-4">
            <label className="block text-sm">Nombre de la excursión
              <input className={field} required minLength={3} maxLength={150} value={draft.title} onChange={e=>setDraft(p=>({...p,title:e.target.value}))} />
            </label>
            <label className="block text-sm">Precio mostrado (ej.: Desde $32.000 por persona)
              <input className={field} required value={draft.price_text} onChange={e=>setDraft(p=>({...p,price_text:e.target.value}))} />
            </label>
            <label className="block text-sm">Duración
              <input className={field} value={draft.duration} onChange={e=>setDraft(p=>({...p,duration:e.target.value}))} />
            </label>
            <label className="block text-sm">Descripción
              <textarea className={field} rows={3} value={draft.description} onChange={e=>setDraft(p=>({...p,description:e.target.value}))} />
            </label>
            <label className="block text-sm">Fotografía (JPG, PNG o WebP, máximo 5 MB)
              <input className="mt-2 block w-full text-sm" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>void upload(e)} />
            </label>
            {draft.image_url && <>
              <img src={draft.image_url} alt="Vista previa de la excursión" className="h-48 w-full rounded-lg object-cover" />
              <button type="button" className="text-sm text-white/80 underline" onClick={()=>setDraft(p=>({...p,image_url:null}))}>Quitar foto de esta excursión</button>
            </>}
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={draft.is_published} onChange={e=>setDraft(p=>({...p,is_published:e.target.checked}))} />
              <span>Mostrar excursión en el sitio</span>
            </label>
            <label className="block text-sm">Orden de aparición
              <input className={field} type="number" value={draft.position} onChange={e=>setDraft(p=>({...p,position:Number(e.target.value)}))} />
            </label>
            <div className="flex flex-wrap gap-3">
              <button disabled={saving || uploading} className={gold} type="submit">
                {saving ? "Guardando..." : draft.id ? "Guardar cambios" : "Guardar excursión"}
              </button>
              {draft.id && <button type="button" className="rounded-lg border border-white/30 px-4 py-3" onClick={()=>setDraft({...blank})}>Cancelar edición</button>}
            </div>
          </form>
        </section>
      </div>
      <p className="text-sm text-white/60">Los cambios se almacenan en Supabase. Para subir y publicar imágenes, la base de datos y el bucket deben estar configurados según la guía del repositorio.</p>
    </div>
  </main>
}
