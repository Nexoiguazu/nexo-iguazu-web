"use client"

import Link from "next/link"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"

type Category = "farmacias" | "supermercados" | "comidas" | "otros"
type Contact = {
  id: string
  name: string
  category: Category
  zone: string
  hours: string
  phone: string | null
  whatsapp: string | null
  address: string
  maps_url: string | null
  tags: string[]
  is_published: boolean
  position: number
}
type ContactDraft = Omit<Contact, "id"> & { id?: string }
type Access = "loading" | "login" | "denied" | "ready" | "setup"

const categories: { value: Category; label: string }[] = [
  { value: "farmacias", label: "Farmacias" },
  { value: "supermercados", label: "Supermercados" },
  { value: "comidas", label: "Comidas" },
  { value: "otros", label: "Otros" },
]
const blank: ContactDraft = {
  name: "", category: "farmacias", zone: "", hours: "", phone: null,
  whatsapp: null, address: "", maps_url: null, tags: [], is_published: false,
  position: 50,
}
const phoneDigits = (value: string) => value.replace(/\D/g, "")
const validPhone = (value: string) => value === "" || /^\d{10,15}$/.test(phoneDigits(value))
const validMapsUrl = (value: string) => {
  if (!value) return true
  try {
    const parsed = new URL(value)
    return parsed.protocol === "https:" && (
      parsed.hostname === "maps.app.goo.gl" ||
      parsed.hostname === "maps.google.com" ||
      ((parsed.hostname === "www.google.com" || parsed.hostname === "google.com") &&
        parsed.pathname.startsWith("/maps")) ||
      (parsed.hostname === "goo.gl" && parsed.pathname.startsWith("/maps"))
    )
  } catch { return false }
}

export default function AdminContactsPage() {
  const supabase = getSupabaseClient()
  const [access, setAccess] = useState<Access>("loading")
  const [items, setItems] = useState<Contact[]>([])
  const [draft, setDraft] = useState<ContactDraft>({ ...blank })
  const [tagsText, setTagsText] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<Category | "todas">("todas")
  const [query, setQuery] = useState("")
  const [advice, setAdvice] = useState("")
  const [savingAdvice, setSavingAdvice] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (!supabase) { setAccess("setup"); return }
    let active = true
    async function verify() {
      if (!supabase) return
      const { data: auth, error: authError } = await supabase.auth.getUser()
      if (!active) return
      if (authError || !auth.user) { setAccess("login"); return }
      const { data, error } = await supabase.from("nexo_admins")
        .select("user_id").eq("user_id", auth.user.id).maybeSingle()
      if (!active) return
      if (error) { setAccess("setup"); setFeedback("No se pudo comprobar el rol administrador."); return }
      if (!data) { setAccess("denied"); return }
      setAccess("ready")
      const [contacts, settings] = await Promise.all([
        supabase.from("nexo_contacts").select(
          "id,name,category,zone,hours,phone,whatsapp,address,maps_url,tags,is_published,position"
        ).order("position", { ascending: true }).order("name", { ascending: true }),
        supabase.from("nexo_settings").select("value_text").eq("key", "advisory_whatsapp").maybeSingle(),
      ])
      if (!active) return
      if (contacts.error) {
        setFeedback("Falta crear la tabla de contactos en Supabase. Seguí la guía de configuración.")
      } else setItems((contacts.data ?? []) as Contact[])
      if (!settings.error) setAdvice(settings.data?.value_text ?? "")
    }
    void verify()
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" || event === "SIGNED_IN") void verify()
    })
    return () => { active = false; listener.subscription.unsubscribe() }
  }, [supabase])

  async function refresh() {
    if (!supabase) return
    const { data, error } = await supabase.from("nexo_contacts").select(
      "id,name,category,zone,hours,phone,whatsapp,address,maps_url,tags,is_published,position"
    ).order("position", { ascending: true }).order("name", { ascending: true })
    if (error) setFeedback("No pudimos actualizar el listado: " + error.message)
    else setItems((data ?? []) as Contact[])
  }

  function edit(item: Contact) {
    setDraft({ ...item })
    setTagsText((item.tags ?? []).join(", "))
    setFeedback("")
    document.getElementById("editar-contacto")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function reset() {
    setDraft({ ...blank })
    setTagsText("")
  }

  async function saveContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || access !== "ready" || saving) return
    const phone = draft.phone?.trim() ?? ""
    const whatsapp = draft.whatsapp?.trim() ?? ""
    const maps = draft.maps_url?.trim() ?? ""
    if (!validPhone(phone) || !validPhone(whatsapp)) {
      setFeedback("Teléfono y WhatsApp deben tener entre 10 y 15 dígitos, o quedar vacíos.")
      return
    }
    if (!validMapsUrl(maps)) {
      setFeedback("Pegá una dirección HTTPS válida de Google Maps, o dejá el campo vacío.")
      return
    }
    setSaving(true)
    setFeedback("")
    const payload = {
      name: draft.name.trim(),
      category: draft.category,
      zone: draft.zone.trim(),
      hours: draft.hours.trim(),
      phone: phone ? "+" + phoneDigits(phone) : null,
      whatsapp: whatsapp ? "+" + phoneDigits(whatsapp) : null,
      address: draft.address.trim(),
      maps_url: maps || null,
      tags: [...new Set(tagsText.split(",").map(x=>x.trim()).filter(Boolean))].slice(0, 20),
      is_published: draft.is_published,
      position: Number.isFinite(draft.position) ? draft.position : 50,
      updated_at: new Date().toISOString(),
    }
    const response = draft.id
      ? await supabase.from("nexo_contacts").update(payload).eq("id", draft.id)
      : await supabase.from("nexo_contacts").insert(payload)
    setSaving(false)
    if (response.error) { setFeedback("No se pudo guardar: " + response.error.message); return }
    setFeedback("Contacto guardado. Actualizá la página principal para ver los cambios.")
    reset()
    await refresh()
  }

  async function remove(item: Contact) {
    if (!supabase || access !== "ready" || saving) return
    if (!window.confirm('¿Eliminar el contacto "' + item.name + '"? También podés ocultarlo desde Editar.')) return
    const { error } = await supabase.from("nexo_contacts").delete().eq("id", item.id)
    if (error) setFeedback("No se pudo eliminar: " + error.message)
    else { reset(); setFeedback("Contacto eliminado."); await refresh() }
  }

  async function saveAdvice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || access !== "ready" || savingAdvice) return
    const digits = phoneDigits(advice)
    if (digits.length > 0 && !/^\d{10,15}$/.test(digits)) {
      setFeedback("El WhatsApp de asesoramiento debe tener entre 10 y 15 dígitos, con código de país (Argentina: 54).")
      return
    }
    setSavingAdvice(true)
    setFeedback("")
    const { error } = await supabase.from("nexo_settings").upsert({
      key: "advisory_whatsapp", value_text: digits,
      updated_at: new Date().toISOString(),
    }, { onConflict: "key" })
    setSavingAdvice(false)
    setFeedback(error ? "No se pudo guardar el WhatsApp: " + error.message
      : "WhatsApp de asesoramiento guardado. Actualizá la página principal para probarlo.")
    if (!error) setAdvice(digits)
  }

  const visible = useMemo(() => items.filter(item =>
    (categoryFilter === "todas" || item.category === categoryFilter) &&
    (item.name + " " + item.zone + " " + item.hours + " " + item.tags.join(" "))
      .toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es").trim())
  ), [items, categoryFilter, query])
  const field = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900"
  const button = "rounded-lg bg-[#d4a84b] px-5 py-2.5 font-semibold text-[#0b1f3a] disabled:opacity-50"

  if (access !== "ready") return (
    <main className="min-h-[70vh] bg-[#0b1f3a] p-6 text-white">
      <div className="mx-auto max-w-xl rounded-xl border border-white/20 p-6">
        <h1 className="text-2xl font-semibold">Contactos útiles — Administración</h1>
        {access === "loading" && <p className="mt-4">Comprobando tu acceso...</p>}
        {access === "login" && <p className="mt-4">Iniciá sesión desde <Link className="underline" href="/login">Ingresar</Link>.</p>}
        {access === "denied" && <p className="mt-4">Tu cuenta no tiene permisos de administración.</p>}
        {access === "setup" && <p className="mt-4">{feedback || "Falta configurar Supabase."} Revisá <code>docs/CONTACTS_SETUP.md</code>.</p>}
      </div>
    </main>
  )

  return <main className="min-h-screen bg-[#0b1f3a] px-4 py-8 text-white">
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#d4a84b]">NEXO IGUAZÚ · ADMINISTRACIÓN</p>
          <h1 className="mt-1 text-3xl font-bold">Contactos útiles</h1>
          <p className="mt-2 text-white/70">Sumá farmacias, supermercados, comidas y otros servicios sin editar código.</p>
        </div>
        <Link href="/admin" className="h-fit rounded-lg border border-white/30 px-4 py-2 hover:bg-white/10">← Volver al panel</Link>
      </div>

      {feedback && <p role="status" className="rounded-lg border border-[#d4a84b]/50 bg-white/10 p-4 text-sm">{feedback}</p>}

      <section className="rounded-xl border border-[#d4a84b]/35 bg-white/5 p-5">
        <h2 className="text-xl font-semibold">WhatsApp de asesoramiento</h2>
        <p className="mb-4 mt-1 text-sm text-white/70">Por ahora los turistas recibirán asesoramiento solo por WhatsApp. Configurá el número oficial de Nexo Iguazú para los botones del sitio.</p>
        <form onSubmit={saveAdvice} className="flex flex-wrap items-end gap-3">
          <label className="w-full min-w-[220px] flex-1 text-sm">Número con código de país (ej.: 5493757XXXXXXXX)
            <input className={field} type="tel" value={advice} placeholder="549..." onChange={e=>setAdvice(e.target.value)} />
          </label>
          <button type="submit" disabled={savingAdvice} className={button}>{savingAdvice ? "Guardando..." : "Guardar WhatsApp"}</button>
        </form>
        <p className="mt-2 text-xs text-white/60">Utilizá un número tuyo de WhatsApp. Si dejás el campo vacío, se ocultarán los botones de asesoramiento con números incompletos.</p>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-white/20 bg-white/5 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Directorio ({items.length})</h2>
            <button type="button" className="text-sm text-[#f0d48d] underline" onClick={reset}>+ Nuevo contacto</button>
          </div>
          <div className="mb-4 flex flex-col gap-3">
            <label className="text-sm">Filtrar por categoría
              <select className={field} value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value as Category | "todas")}>
                <option value="todas">Todas las categorías</option>
                {categories.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </label>
            <label className="text-sm">Buscar
              <input className={field} placeholder="Nombre, zona o servicio..." value={query} onChange={e=>setQuery(e.target.value)} />
            </label>
          </div>
          <div className="space-y-2">
            {visible.length === 0 && <p className="text-sm text-white/70">No hay contactos que coincidan. Si todavía no cargaron, ejecutá la migración de la guía.</p>}
            {visible.map(item => <div key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/15 p-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-white/70">{categories.find(c=>c.value===item.category)?.label} · {item.zone || "Sin zona"}</p>
                <p className="text-xs text-[#f0d48d]">{item.is_published ? "Visible en la web" : "Oculto"}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 text-sm">
                <button className="rounded-md border border-white/30 px-3 py-1.5" type="button" onClick={()=>edit(item)}>Editar</button>
                <button className="text-red-200 underline" type="button" onClick={()=>void remove(item)}>Eliminar</button>
              </div>
            </div>)}
          </div>
        </section>

        <section id="editar-contacto" className="scroll-mt-24 rounded-xl border border-white/20 bg-white/5 p-5">
          <h2 className="mb-4 text-xl font-semibold">{draft.id ? "Editar contacto" : "Agregar contacto"}</h2>
          <form onSubmit={saveContact} className="space-y-4">
            <label className="block text-sm">Nombre del comercio o servicio *
              <input className={field} required minLength={2} maxLength={150} value={draft.name} onChange={e=>setDraft(p=>({...p,name:e.target.value}))}/>
            </label>
            <label className="block text-sm">Categoría *
              <select className={field} value={draft.category} onChange={e=>setDraft(p=>({...p,category:e.target.value as Category}))}>
                {categories.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </label>
            <label className="block text-sm">Zona / Barrio
              <input className={field} value={draft.zone} onChange={e=>setDraft(p=>({...p,zone:e.target.value}))} placeholder="Ej.: Centro, Villa 14..." />
            </label>
            <label className="block text-sm">Dirección
              <input className={field} value={draft.address} onChange={e=>setDraft(p=>({...p,address:e.target.value}))} placeholder="Calle y número (opcional)" />
            </label>
            <label className="block text-sm">Horarios
              <input className={field} value={draft.hours} onChange={e=>setDraft(p=>({...p,hours:e.target.value}))} placeholder="Ej.: Lun a sáb 8 a 20 h" />
            </label>
            <label className="block text-sm">Teléfono para llamadas
              <input className={field} type="tel" value={draft.phone ?? ""} onChange={e=>setDraft(p=>({...p,phone:e.target.value}))} placeholder="+543757..." />
            </label>
            <label className="block text-sm">WhatsApp del comercio
              <input className={field} type="tel" value={draft.whatsapp ?? ""} onChange={e=>setDraft(p=>({...p,whatsapp:e.target.value}))} placeholder="+5493757..." />
            </label>
            <label className="block text-sm">Enlace de Google Maps
              <input className={field} type="url" value={draft.maps_url ?? ""} onChange={e=>setDraft(p=>({...p,maps_url:e.target.value}))} placeholder="https://maps.app.goo.gl/..." />
            </label>
            <label className="block text-sm">Etiquetas (separadas por comas)
              <input className={field} value={tagsText} onChange={e=>setTagsText(e.target.value)} placeholder="delivery, 24 hs, farmacia de turno" />
            </label>
            <label className="block text-sm">Orden de aparición
              <input className={field} type="number" value={draft.position} onChange={e=>setDraft(p=>({...p,position:Number(e.target.value)}))} />
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={draft.is_published} onChange={e=>setDraft(p=>({...p,is_published:e.target.checked}))} />
              <span>Publicar este contacto en la página</span>
            </label>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={saving} className={button}>{saving ? "Guardando..." : draft.id ? "Guardar cambios" : "Agregar contacto"}</button>
              {draft.id && <button type="button" className="rounded-lg border border-white/30 px-4 py-2.5" onClick={reset}>Cancelar</button>}
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
}
