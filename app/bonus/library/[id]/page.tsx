'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, BookOpen, Download, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getBookById, getBookReaderMode, type LibraryBook } from '@/lib/library'

export default function LibraryBookDetailPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<LibraryBook | null>(null)

  useEffect(() => {
    setBook(getBookById(params.id))
  }, [params.id])

  if (!book) {
    return (
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-lg mx-auto">
          <Link href="/bonus/library" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Volver a la biblioteca
          </Link>

          <Card className="mt-6 p-6 text-center text-sm text-muted-foreground">
            No se encontró este libro.
          </Card>
        </div>
      </div>
    )
  }

  const readerMode = getBookReaderMode(book.format)

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <Link href="/bonus/library" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            Biblioteca
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">{book.title}</h1>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 max-w-lg mx-auto space-y-6">
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-secondary px-2 py-1 text-secondary-foreground">{book.category}</span>
            <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">{book.format.toUpperCase()}</span>
            <span className="rounded-full bg-accent/20 px-2 py-1 text-accent-foreground">{book.visibility}</span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{book.description}</p>

          <div className="mt-4 flex gap-2">
            <a
              href={book.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir en otra pestaña
            </a>
            <a
              href={book.fileUrl}
              download={book.fileName}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar
            </a>
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          {readerMode === 'pdf' ? (
            <iframe src={book.fileUrl} title={book.title} className="h-[70vh] w-full border-0" />
          ) : readerMode === 'epub' ? (
            <div className="flex min-h-[30vh] flex-col items-center justify-center p-8 text-center">
              <BookOpen className="mb-3 h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground">
                Este archivo EPUB se abrirá en una pestaña nueva para una mejor lectura.
              </p>
            </div>
          ) : (
            <div className="flex min-h-[30vh] flex-col items-center justify-center p-8 text-center">
              <BookOpen className="mb-3 h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground">
                El archivo se puede abrir o descargar desde los botones superiores.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
