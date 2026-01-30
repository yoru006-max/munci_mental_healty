"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Memory {
  id: string
  text: string
  date: string
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [newMemory, setNewMemory] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("munci_memories")
    if (saved) {
      setMemories(JSON.parse(saved))
    }
  }, [])

  const addMemory = () => {
    if (!newMemory.trim()) return

    const memory: Memory = {
      id: Date.now().toString(),
      text: newMemory,
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }

    const updated = [memory, ...memories]
    setMemories(updated)
    localStorage.setItem("munci_memories", JSON.stringify(updated))
    setNewMemory("")
    setIsAdding(false)
  }

  const deleteMemory = (id: string) => {
    const updated = memories.filter((m) => m.id !== id)
    setMemories(updated)
    localStorage.setItem("munci_memories", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/bonus">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Caja de Recuerdos</h1>
            <p className="text-sm text-muted-foreground">{memories.length} momentos guardados</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-primary/10">
          <p className="text-sm text-balance leading-relaxed mb-4">
            Guarda aquí momentos que te hicieron sentir bien. En días difíciles, vuelve a leerlos.
          </p>
          {!isAdding ? (
            <Button onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Agregar recuerdo
            </Button>
          ) : (
            <div className="space-y-2">
              <textarea
                value={newMemory}
                onChange={(e) => setNewMemory(e.target.value)}
                placeholder="Escribe algo que te hizo sonreír hoy..."
                className="w-full p-3 rounded-lg border bg-background resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={addMemory} className="flex-1">
                  Guardar
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="outline">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </Card>

        {memories.length === 0 && !isAdding && (
          <Card className="p-12 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Aún no tienes recuerdos guardados</p>
            <p className="text-sm text-muted-foreground mt-2">Comienza agregando un momento especial</p>
          </Card>
        )}

        {memories.map((memory) => (
          <Card key={memory.id} className="p-4 hover:shadow-md transition-all">
            <div className="flex gap-3">
              <Heart className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-2">{memory.text}</p>
                <p className="text-xs text-muted-foreground">{memory.date}</p>
              </div>
              <Button onClick={() => deleteMemory(memory.id)} variant="ghost" size="icon" className="flex-shrink-0">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
