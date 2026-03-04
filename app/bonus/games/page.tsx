"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Cloud, Puzzle, Sparkles, Undo2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function CloudGame() {
  const [clouds, setClouds] = useState([
    { id: 1, x: 20, y: 30, cleared: false },
    { id: 2, x: 50, y: 60, cleared: false },
    { id: 3, x: 70, y: 40, cleared: false },
  ])
  const [isDragging, setIsDragging] = useState<number | null>(null)

  const handleDragStart = (id: number) => setIsDragging(id)

  const handleDragEnd = (id: number, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Check if cloud reached the sun (top center area)
    if (x > 35 && x < 65 && y < 25) {
      setClouds((prev) => prev.map((c) => (c.id === id ? { ...c, cleared: true } : c)))
    }
    setIsDragging(null)
  }

  const reset = () => {
    setClouds([
      { id: 1, x: 20, y: 30, cleared: false },
      { id: 2, x: 50, y: 60, cleared: false },
      { id: 3, x: 70, y: 40, cleared: false },
    ])
  }

  const allCleared = clouds.every((c) => c.cleared)

  return (
    <div className="space-y-4">
      <div className="relative h-80 bg-gradient-to-b from-chart-1/20 to-primary/10 rounded-xl overflow-hidden">
        {/* Sun */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200/50" />

        {/* Clouds */}
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className={`absolute cursor-move transition-opacity ${cloud.cleared ? "opacity-0" : "opacity-100"}`}
            style={{ left: `${cloud.x}%`, top: `${cloud.y}%` }}
            onMouseDown={() => handleDragStart(cloud.id)}
            onMouseUp={(e) => handleDragEnd(cloud.id, e)}
          >
            <Cloud className="w-16 h-16 text-white drop-shadow-lg fill-white" />
          </div>
        ))}

        {allCleared && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-100/30">
            <div className="text-center p-6 bg-white/90 rounded-xl shadow-lg">
              <p className="text-lg font-semibold mb-2">Dejaste salir el sol</p>
              <p className="text-sm text-muted-foreground">Así de simple es despejar tu mente</p>
            </div>
          </div>
        )}
      </div>
      <Button onClick={reset} variant="outline" className="w-full bg-transparent">
        <Undo2 className="w-4 h-4 mr-2" />
        Reiniciar
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Arrastra las nubes hacia el sol para despejar el cielo
      </p>
    </div>
  )
}

function PuzzleGame() {
  const [pieces, setPieces] = useState([3, 1, 4, 2])
  const correctOrder = [1, 2, 3, 4]

  const shuffle = () => {
    setPieces([...pieces].sort(() => Math.random() - 0.5))
  }

  const swap = (index: number) => {
    if (index < pieces.length - 1) {
      const newPieces = [...pieces]
      ;[newPieces[index], newPieces[index + 1]] = [newPieces[index + 1], newPieces[index]]
      setPieces(newPieces)
    }
  }

  const isComplete = JSON.stringify(pieces) === JSON.stringify(correctOrder)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {pieces.map((piece, index) => (
          <button
            key={index}
            onClick={() => swap(index)}
            className="h-24 rounded-lg bg-gradient-to-br from-chart-3/30 to-chart-2/20 flex items-center justify-center text-3xl font-bold hover:scale-105 transition-transform"
          >
            {piece}
          </button>
        ))}
      </div>
      {isComplete && (
        <Card className="p-4 bg-primary/10 border-primary/30 text-center">
          <p className="font-semibold">Lo lograste</p>
          <p className="text-sm text-muted-foreground">Cada pieza en su lugar</p>
        </Card>
      )}
      <Button onClick={shuffle} variant="outline" className="w-full bg-transparent">
        <Undo2 className="w-4 h-4 mr-2" />
        Mezclar
      </Button>
      <p className="text-xs text-center text-muted-foreground">Toca los números para intercambiarlos y ordenarlos</p>
    </div>
  )
}

function StarGarden() {
  const [stars, setStars] = useState<{ x: number; y: number }[]>([])

  const addStar = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setStars([...stars, { x, y }])
  }

  const clear = () => setStars([])

  return (
    <div className="space-y-4">
      <div
        onClick={addStar}
        className="relative h-80 bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden cursor-crosshair"
      >
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse"
            style={{ left: star.x, top: star.y }}
          />
        ))}
        {stars.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 text-sm">Toca para crear estrellas</p>
          </div>
        )}
      </div>
      <Button onClick={clear} variant="outline" className="w-full bg-transparent">
        <Undo2 className="w-4 h-4 mr-2" />
        Limpiar cielo
      </Button>
      <p className="text-xs text-center text-muted-foreground">Crea tu propia constelación de calma</p>
    </div>
  )
}

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const games = [
    {
      id: "clouds",
      icon: Cloud,
      title: "Mueve las Nubes",
      description: "Arrastra las nubes hacia el sol",
      color: "from-chart-1/20 to-primary/10",
      component: CloudGame,
    },
    {
      id: "puzzle",
      icon: Puzzle,
      title: "Rompecabezas Suave",
      description: "Ordena los números del 1 al 4",
      color: "from-chart-3/20 to-chart-2/10",
      component: PuzzleGame,
    },
    {
      id: "stars",
      icon: Sparkles,
      title: "Jardín de Estrellas",
      description: "Crea constelaciones de calma",
      color: "from-chart-4/20 to-chart-5/10",
      component: StarGarden,
    },
  ]

  const activeGameData = games.find((g) => g.id === activeGame)

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/bonus">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Juegos Tranquilos</h1>
            <p className="text-sm text-muted-foreground">Distrae tu mente con calma</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        {activeGame === null ? (
          <>
            {games.map((game) => {
              const Icon = game.icon
              return (
                <Card
                  key={game.id}
                  className={`p-6 bg-gradient-to-br ${game.color} hover:shadow-lg transition-all cursor-pointer`}
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background/50">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{game.title}</h3>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </div>
                    <Button size="sm" variant="secondary">
                      Jugar
                    </Button>
                  </div>
                </Card>
              )
            })}

            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <p className="text-sm text-balance leading-relaxed text-center text-muted-foreground">
                Estos juegos están diseñados para ser relajantes, no competitivos. No hay puntajes ni presiones.
              </p>
            </Card>
          </>
        ) : (
          <>
            <Button onClick={() => setActiveGame(null)} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver todos los juegos
            </Button>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">{activeGameData?.title}</h2>
              {activeGameData && <activeGameData.component />}
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
