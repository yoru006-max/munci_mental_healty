"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Phone, MessageSquare, X, Eye, Wind, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { loadContacts, saveContact, deleteContact, validatePhone, SupportContact } from '@/lib/contacts'

export function EmergencyButton() {
  const [showEmergency, setShowEmergency] = useState(false)
  const [alertExpanded, setAlertExpanded] = useState(false)
  const [method, setMethod] = useState<"sms" | "whatsapp">("sms")
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState(
    "Hola, estoy pasando por un momento difícil y necesito apoyo. Por favor, respóndeme cuando puedas."
  )
  const [autoSend, setAutoSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [contacts, setContacts] = useState<SupportContact[]>([])
  const [contactName, setContactName] = useState("")
  const [saveContactType, setSaveContactType] = useState<'phone' | 'whatsapp'>('phone')
  const [lastAutoSentMessage, setLastAutoSentMessage] = useState("")

  useEffect(() => {
    try {
      const items = loadContacts()
      setContacts(items)
    } catch (e) {
      setContacts([])
    }
  }, [])

  useEffect(() => {
    if (!autoSend || loading) return
    const trimmedRecipient = recipient.trim()
    const trimmedMessage = message.trim()
    if (!trimmedRecipient || !trimmedMessage || trimmedMessage === lastAutoSentMessage) return

    const timer = window.setTimeout(async () => {
      const success = await sendAutomatic()
      if (success) {
        setLastAutoSentMessage(trimmedMessage)
      }
    }, 900)

    return () => window.clearTimeout(timer)
  }, [autoSend, recipient, message, method, lastAutoSentMessage, loading])

  const sendAutomatic = async () => {
    setLoading(true)
    setStatusMsg(null)
    try {
      // Validar destinatario antes de llamar al API
      const to = recipient.trim()
      if (!to) {
        setStatusMsg('Introduce un destinatario válido')
        setLoading(false)
        return
      }

      if (method === 'sms' || method === 'whatsapp') {
        if (!validatePhone(to)) {
          setStatusMsg('Número inválido. Usa formato internacional, por ejemplo +34123456789')
          setLoading(false)
          return
        }
      }

      const payload = {
        method,
        to,
        message,
      }

      const res = await fetch('/api/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        setStatusMsg('Alerta enviada correctamente')
        return true
      } else {
        setStatusMsg(`Error: ${data.error || 'no se pudo enviar'}`)
        return false
      }
    } catch (err: any) {
      setStatusMsg(`Error: ${err?.message || String(err)}`)
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setShowEmergency(!showEmergency)}
        className="w-full h-auto py-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
        aria-expanded={showEmergency}
      >
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="font-semibold">
          {showEmergency ? 'Cerrar alerta' : 'No estoy bien'}
        </span>
      </Button>

      {showEmergency && (
        <Card className="p-6 bg-destructive/10 border-destructive/30 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive-foreground">Estoy aqui contigo</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowEmergency(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm mb-4 text-balance leading-relaxed">
            Respira conmigo. Inhala... Exhala... Estas a salvo. Este momento pasara.
          </p>

          <div className="space-y-2">
            <Link href="/bonus/breathing" className="block">
              <Button variant="default" className="w-full justify-start gap-2">
                <Wind className="w-4 h-4" />
                Ejercicio de respiracion
              </Button>
            </Link>
            <Link href="/grounding" className="block">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Eye className="w-4 h-4" />
                Anclaje: 5 cosas que veo
              </Button>
            </Link>
            <Link href="/grounding/touch" className="block">
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
              >
                <Zap className="w-4 h-4" />
                4 cosas que puedas tocar
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent"
              onClick={() => (window.location.href = "tel:")}
            >
              <Phone className="w-4 h-4" />
              Llamar a contacto de confianza
            </Button>

            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 overflow-hidden">
              <button
                type="button"
                className="w-full rounded-none bg-transparent px-4 py-3 text-left text-sm font-semibold text-destructive transition hover:bg-destructive/20 flex items-center justify-between"
                onClick={() => setAlertExpanded((prev) => !prev)}
              >
                <span>Enviar alerta</span>
                {alertExpanded ? (
                  <ChevronUp className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-primary" />
                )}
              </button>

              {alertExpanded && (
                <div className="mt-2 space-y-2 px-4 pb-4 pt-2">
                  <div className="flex gap-2 mb-2">
                    <button
                      className={`px-2 py-1 rounded ${method === "sms" ? "bg-primary text-white" : "bg-transparent"}`}
                      onClick={() => setMethod("sms")}
                      type="button"
                    >
                      SMS
                    </button>
                    <button
                      className={`px-2 py-1 rounded ${method === "whatsapp" ? "bg-primary text-white" : "bg-transparent"}`}
                      onClick={() => setMethod("whatsapp")}
                      type="button"
                    >
                      WhatsApp
                    </button>
                  </div>

                  <input
                    placeholder="Número (ej. +34123456789)"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full mb-2 px-2 py-1 rounded border"
                  />

                  {contacts.length > 0 && (
                    <div className="mb-2">
                      <label className="text-xs">Contactos guardados</label>
                      <div className="flex flex-col gap-1 mt-1">
                        {contacts.map((c) => (
                          <div key={c.id} className="flex items-center justify-between gap-2">
                            <button
                              className="text-sm text-left w-full"
                              onClick={() => {
                                setRecipient(c.value)
                                if (c.type === 'whatsapp') setMethod('whatsapp')
                                else if (c.type === 'phone') setMethod('sms')
                              }}
                              type="button"
                            >
                              {c.name ? `${c.name} — ${c.value}` : c.value}
                            </button>
                            <button className="text-xs text-destructive" onClick={() => { deleteContact(c.id); setContacts(loadContacts()) }} type="button">Eliminar</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full mb-2 px-2 py-1 rounded border"
                  />

                  <div className="flex flex-col gap-2 mb-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={autoSend} onChange={(e) => setAutoSend(e.target.checked)} />
                      <span>Enviar automáticamente (usa API)</span>
                    </label>
                    {autoSend && (
                      <p className="text-xs text-muted-foreground">
                        Para enviar sin interacción se necesita back-end configurado: variables `TWILIO_*` para SMS/WhatsApp.
                      </p>
                    )}
                  </div>
                  <div className="p-2 border rounded mb-2">
                    <label className="block text-xs font-medium mb-1">Guardar contacto de apoyo</label>
                    <input placeholder="Nombre (opcional)" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full mb-1 px-2 py-1 rounded border" />
                    <div className="flex gap-2">
                      <select value={saveContactType} onChange={(e) => setSaveContactType(e.target.value as any)} className="px-2 py-1 rounded border">
                        <option value="phone">Teléfono</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                      <Button variant="outline" onClick={() => {
                        const val = recipient.trim()
                        if (!val) { setStatusMsg('Introduce número para guardar'); return }
                        const isPhone = validatePhone(val)
                        if (!isPhone) { setStatusMsg('Teléfono inválido'); return }
                        const genId = (() => {
                          try {
                            if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
                              // @ts-ignore
                              return (crypto as any).randomUUID()
                            }
                          } catch (e) {}
                          return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
                        })()

                        const contact: SupportContact = {
                          id: genId,
                          name: contactName.trim() || undefined,
                          type: saveContactType,
                          value: val,
                        }
                        saveContact(contact)
                        setContacts(loadContacts())
                        setContactName('')
                        setStatusMsg('Contacto guardado')
                      }}>Guardar</Button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="default"
                      className="flex-1 min-w-0"
                      onClick={async () => {
                        if (autoSend) {
                          await sendAutomatic()
                          return
                        }

                        const body = encodeURIComponent(message)
                        const toRaw = recipient.trim()
                        if (!toRaw) { setStatusMsg('Introduce destinatario'); return }

                        if (method === "sms") {
                          if (!validatePhone(toRaw)) { setStatusMsg('Número inválido. Usa formato +34123456789'); return }
                          window.location.href = `sms:${toRaw}?body=${body}`
                          return
                        }

                        if (method === "whatsapp") {
                          if (!validatePhone(toRaw)) { setStatusMsg('Número inválido para WhatsApp'); return }
                          const waNum = toRaw.replace(/[^0-9]/g, '')
                          const url = `https://wa.me/${waNum}?text=${body}`
                          window.open(url, '_blank')
                          return
                        }
                      }}
                    >
                      {loading ? 'Enviando...' : 'Enviar alerta'}
                    </Button>
                    <Button variant="ghost" className="sm:w-auto" onClick={() => { setRecipient(""); setMessage(""); setStatusMsg(null) }}>
                      Limpiar
                    </Button>
                  </div>

                  {statusMsg && <p className="text-sm mt-2">{statusMsg}</p>}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
