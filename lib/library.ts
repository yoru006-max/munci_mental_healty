export type BookVisibility = 'private' | 'public'

export interface LibraryBook {
  id: string
  userId: string
  userName: string
  title: string
  author: string
  description: string
  category: string
  fileName: string
  fileUrl: string
  fileType: string
  format: string
  coverImage?: string
  visibility: BookVisibility
  createdAt: string
  updatedAt: string
}

const LIBRARY_STORAGE_KEY = 'munci_library_books'

export function getLibraryBooks(): LibraryBook[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(LIBRARY_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveLibraryBooks(books: LibraryBook[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(books))
}

export function addBookToLibrary(book: LibraryBook) {
  const books = getLibraryBooks()
  const nextBooks = [book, ...books]
  saveLibraryBooks(nextBooks)
  return nextBooks
}

export function getBookById(id: string): LibraryBook | null {
  return getLibraryBooks().find((book) => book.id === id) ?? null
}

export function deleteBookById(id: string) {
  const books = getLibraryBooks().filter((book) => book.id !== id)
  saveLibraryBooks(books)
  return books
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function getFormatFromFile(fileName: string, fileType?: string): string {
  const extension = (fileName.split('.').pop() || '').toLowerCase()

  if (fileType?.includes('pdf') || extension === 'pdf') return 'pdf'
  if (fileType?.includes('epub') || extension === 'epub') return 'epub'
  if (fileType?.includes('text') || extension === 'txt') return 'txt'
  if (extension === 'doc' || extension === 'docx') return 'doc'
  if (extension === 'mobi' || extension === 'azw') return 'mobi'

  return extension || 'file'
}

export function getBookVisibilityLabel(visibility: BookVisibility): string {
  return visibility === 'public' ? 'Público' : 'Privado'
}

export function getBookReaderMode(format: string): 'pdf' | 'epub' | 'download' {
  if (format === 'pdf') return 'pdf'
  if (format === 'epub') return 'epub'
  return 'download'
}
