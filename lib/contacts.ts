export type SupportContact = {
  id: string
  name?: string
  type: 'phone' | 'email' | 'whatsapp'
  value: string
}

const STORAGE_KEY = 'support_contacts'

export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone: string) {
  const cleaned = phone.replace(/[^0-9+]/g, '')
  const re = /^\+?[0-9]{7,15}$/
  return re.test(cleaned)
}

export function loadContacts(): SupportContact[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SupportContact[]
  } catch (e) {
    return []
  }
}

export function saveContact(contact: SupportContact) {
  const list = loadContacts()
  const exists = list.find((c) => c.id === contact.id)
  let newList: SupportContact[]
  if (exists) {
    newList = list.map((c) => (c.id === contact.id ? contact : c))
  } else {
    newList = [contact, ...list]
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList))
}

export function deleteContact(id: string) {
  const list = loadContacts()
  const newList = list.filter((c) => c.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList))
}
