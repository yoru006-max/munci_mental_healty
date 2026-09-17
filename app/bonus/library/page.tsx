'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Eye, Globe, Lock, Plus, Search, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/auth/auth'
import {
  addBookToLibrary,
  deleteBookById,
  getBookVisibilityLabel,
  getFormatFromFile,
  getLibraryBooks,
  readFileAsDataUrl,
  type LibraryBook,
} from '@/lib/library'

export default function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>([])
  const [search, setSearch] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Bienestar',
    description: '',
    visibility: 'private' as 'private' | 'public',
    file: null as File | null,
  })

  useEffect(() => {
    setBooks(getLibraryBooks())
  }, [])

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return books

    return books.filter((book) => {
      const haystack = `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [books, search])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.file || !form.title.trim() || !form.author.trim()) {
      return
    }

    const user = getCurrentUser()
    if (!user) {
      return
    }

    setIsSubmitting(true)

    try {
      const fileUrl = await readFileAsDataUrl(form.file)
      const now = new Date().toISOString()
      const book: LibraryBook = {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
        userId: user.id,
        userName: user.name,
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim() || 'Sin descripción disponible.',
        category: form.category.trim() || 'General',
        fileName: form.file.name,
        fileUrl,
        fileType: form.file.type || 'application/octet-stream',
        format: getFormatFromFile(form.file.name, form.file.type),
        visibility: form.visibility,
        createdAt: now,
        updatedAt: now,
      }

      addBookToLibrary(book)
      setBooks(getLibraryBooks())
      setForm({
        title: '',
        author: '',
        category: 'Bienestar',
        description: '',
        visibility: 'private',
        file: null,
      })
      const input = document.getElementById('book-file-input') as HTMLInputElement | null
      if (input) input.value = ''
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    deleteBookById(id)
    setBooks(getLibraryBooks())
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Biblioteca</p>
          <h1 className="text-3xl font-bold mt-2">Libros de interés</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Guarda, comparte y vuelve a tus lecturas más útiles.
          </p>
        </div>
      </header>

      <div className="px-6 max-w-lg mx-auto space-y-6">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Agregar libro</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Título"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <input
                value={form.author}
                onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
                placeholder="Autor"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                placeholder="Categoría"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />

              <select
                value={form.visibility}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    visibility: event.target.value as 'private' | 'public',
                  }))
                }
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="private">Privado</option>
                <option value="public">Público</option>
              </select>
            </div>

            <textarea
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Descripción breve"
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />

            <input
              id="book-file-input"
              type="file"
              accept=".pdf,.epub,.txt,.doc,.docx,.mobi,.azw,.djvu"
              onChange={(event) => setForm((prev) => ({ ...prev, file: event.target.files?.[0] ?? null }))}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-xl file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />

            <button
              type="submit"
              disabled={isSubmitting || !form.file}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Subiendo...' : 'Guardar libro'}
            </button>
          </form>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar libros por título o autor"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </Card>

        <div className="space-y-4">
          {filteredBooks.length === 0 ? (
            <Card className="p-6 text-center text-sm text-muted-foreground">
              Aún no hay libros en tu biblioteca.
            </Card>
          ) : (
            filteredBooks.map((book) => (
              <Card key={book.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-base truncate">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="rounded-full bg-secondary px-2 py-1 text-secondary-foreground">
                          {book.category}
                        </span>
                        <span className="rounded-full bg-accent/20 px-2 py-1 text-accent-foreground">
                          {book.format.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-muted-foreground">
                          {book.visibility === 'public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {getBookVisibilityLabel(book.visibility)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(book.id)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                    aria-label={`Eliminar ${book.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{book.description}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    {book.userName}
                  </div>

                  <Link
                    href={`/bonus/library/${book.id}`}
                    className="rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                  >
                    Abrir
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
