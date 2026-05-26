"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { loadContacts, saveContact, deleteContact, validateEmail, validatePhone, SupportContact } from '@/lib/contacts'

export default function SupportContacts() {
  const [contacts, setContacts] = useState<SupportContact[]>([])
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [type, setType] = useState<'phone' | 'email' | 'whatsapp'>('phone')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    setContacts(loadContacts())
  }, [])

  const genId = () => {
    try {
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        // @ts-ignore
        return (crypto as any).randomUUID()
      }
    } catch (e) {}
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
  }

  const handleSave = () => {
    const val = value.trim()
    if (!val) { setStatus('Introduce número o correo'); return }
    const isEmail = validateEmail(val)
    const isPhone = validatePhone(val)
    if (type === 'email' && !isEmail) { setStatus('Correo inválido'); return }
    if ((type === 'phone' || type === 'whatsapp') && !isPhone) { setStatus('Teléfono inválido. Usa formato +34123456789'); return }

    const contact: SupportContact = {
      id: editingId || genId(),
      name: name.trim() || undefined,
      type: type === 'email' ? 'email' : 'phone',
      value: val,
    }

    saveContact(contact)
    setContacts(loadContacts())
    setName('')
    setValue('')
    setEditingId(null)
    setStatus('Contacto guardado')
  }

  const handleEdit = (c: SupportContact) => {
    setEditingId(c.id)
    setName(c.name || '')
    setValue(c.value)
    setType(c.type === 'email' ? 'email' : 'phone')
    setStatus(null)
  }

  const handleDelete = (id: string) => {
    deleteContact(id)
    setContacts(loadContacts())
    setStatus('Contacto eliminado')
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Contactos de apoyo</h2>

      <div className="mb-4 p-3 border rounded">
        <label className="block text-xs mb-1">Nombre (opcional)</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 px-2 py-1 rounded border" />

        <label className="block text-xs mb-1">Tipo</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full mb-2 px-2 py-1 rounded border">
          <option value="phone">Teléfono</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Correo</option>
        </select>

        <label className="block text-xs mb-1">Número o correo</label>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={type === 'email' ? 'apoyo@ejemplo.com' : '+34123456789'} className="w-full mb-2 px-2 py-1 rounded border" />

        <div className="flex gap-2">
          <Button onClick={handleSave} className="w-full">{editingId ? 'Actualizar' : 'Guardar contacto'}</Button>
          <Button variant="ghost" onClick={() => { setName(''); setValue(''); setEditingId(null); setStatus(null) }}>Limpiar</Button>
        </div>
        {status && <p className="text-sm mt-2">{status}</p>}
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Guardados</h3>
        {contacts.length === 0 && <p className="text-sm text-muted-foreground">No hay contactos guardados.</p>}
        <div className="flex flex-col gap-2">
          {contacts.map((c) => (
            <div key={c.id} className="p-2 border rounded flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name || c.value}</div>
                <div className="text-xs text-muted-foreground">{c.type} — {c.value}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleEdit(c)}>Editar</Button>
                <Button variant="destructive" onClick={() => handleDelete(c.id)}>Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
