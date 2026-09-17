import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center">
        <h1 className="text-3xl font-bold">Página no encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          La sección que buscas no está disponible en este momento.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
