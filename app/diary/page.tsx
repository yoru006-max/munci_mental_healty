"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Save, Trash2, Calendar } from "lucide-react"
import Link from "next/link"

interface DiaryEntry {
  id: string
  date: string
  content: string
  mood?: string
}

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState("")
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("munci-diary")
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  const saveEntry = () => {
    if (!currentEntry.trim()) return

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: currentEntry,
    }

    const updatedEntries = [newEntry, ...entries]
    setEntries(updatedEntries)
    localStorage.setItem("munci-diary", JSON.stringify(updatedEntries))
    setCurrentEntry("")
  }

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id)
    setEntries(updatedEntries)
    localStorage.setItem("munci-diary", JSON.stringify(updatedEntries))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Mi Diario</h1>
            <p className="text-sm text-muted-foreground">Sin juicios, solo tú</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)}>
            <Calendar className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        {!showHistory ? (
          <Card className="p-6 bg-gradient-to-br from-chart-3/20 to-chart-3/5">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-balance">
                Escribe lo que sientes, sin filtros. Este espacio es solo tuyo y permanece privado en tu dispositivo.
              </p>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="¿Qué hay en tu corazón hoy?"
                className="w-full min-h-[200px] p-4 rounded-lg bg-background border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button onClick={saveEntry} className="w-full" disabled={!currentEntry.trim()}>
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {entries.length === 0 ? "Aún no tienes entradas" : `${entries.length} entradas guardadas`}
            </p>
            {entries.map((entry) => (
              <Card key={entry.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -mt-2 -mr-2"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <p className="text-sm text-balance leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
