import { getSupabaseClient, hasSupabaseConfig } from './client'

export type BookVisibility = 'private' | 'public'

export interface SupabaseBookRecord {
  id: string
  owner_id: string
  title: string
  author: string
  description: string
  category: string
  file_name: string
  file_url: string
  file_type: string
  format: string
  visibility: BookVisibility
  cover_image_url?: string | null
  created_at?: string
  updated_at?: string
}

export function isSupabaseReady() {
  return hasSupabaseConfig
}

export async function getBooksForUser(userId: string) {
  if (!isSupabaseReady()) return []

  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .or(`owner_id.eq.${userId},visibility.eq.public`)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as SupabaseBookRecord[]
}

export async function getPublicBooks() {
  if (!isSupabaseReady()) return []

  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as SupabaseBookRecord[]
}

export async function uploadBookFile(file: File, userId: string) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no está disponible')
  }

  const supabase = getSupabaseClient()
  const timestamp = Date.now()
  const safeName = file.name.replace(/\s+/g, '-')
  const path = `${userId}/${timestamp}-${safeName}`

  const { data, error } = await supabase.storage.from('books').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'application/octet-stream',
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data: publicUrlData } = supabase.storage.from('books').getPublicUrl(data.path)

  return {
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  }
}

export async function createBookRecord(book: Omit<SupabaseBookRecord, 'id' | 'created_at' | 'updated_at'>) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no está disponible')
  }

  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('books')
    .insert([{
      ...book,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as SupabaseBookRecord
}

export async function deleteBookRecord(bookId: string) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no está disponible')
  }

  const supabase = getSupabaseClient()
  const { error } = await supabase.from('books').delete().eq('id', bookId)

  if (error) {
    throw new Error(error.message)
  }
}
