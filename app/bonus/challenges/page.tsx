"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([
    {
      id: "write",
      title: "Escribe 3 cosas buenas",
      description: "Pueden ser pequeñas, como el sabor del café",
      completed: false,
    },
    {
      id: "water",
      title: "Toma agua",
      description: "Un vaso completo, despacio",
      completed: false,
    },
    {
      id: "stretch",
      title: "Estira tu cuerpo",
      description: "5 minutos de movimiento suave",
      completed: false,
    },
    {
      id: "breathe",
      title: "Respira conscientemente",
      description: "3 respiraciones profundas",
      completed: false,
    },
    {
      id: "contact",
      title: "Contacta a alguien",
      description: "Un mensaje simple a quien te importa",
      completed: false,
    },
  ])

  useEffect(() => {
    const saved = localStorage.getItem("munci_challenges")
    if (saved) {
      setChallenges(JSON.parse(saved))
    }
  }, [])

  const toggleChallenge = (id: string) => {
    const updated = challenges.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    setChallenges(updated)
    localStorage.setItem("munci_challenges", JSON.stringify(updated))
  }

  const completedCount = challenges.filter((c) => c.completed).length

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
            <h1 className="text-2xl font-bold">Retos Suaves</h1>
            <p className="text-sm text-muted-foreground">
              {completedCount} de {challenges.length} completados hoy
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10">
          <p className="text-sm text-balance leading-relaxed">
            No tienes que completar todos. Elige uno o dos que se sientan posibles hoy. Cada pequeño paso cuenta.
          </p>
        </Card>

        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className={`p-4 hover:shadow-md transition-all cursor-pointer ${challenge.completed ? "bg-primary/5" : ""}`}
            onClick={() => toggleChallenge(challenge.id)}
          >
            <div className="flex items-start gap-4">
              <Button
                size="icon"
                variant={challenge.completed ? "default" : "outline"}
                className={`flex-shrink-0 rounded-full h-10 w-10 border-2 ${
                  challenge.completed ? "bg-primary" : "bg-transparent"
                }`}
              >
                <Check className={`w-4 h-4 ${challenge.completed ? "opacity-100" : "opacity-0"}`} />
              </Button>
              <div className="flex-1 pt-2">
                <h3 className={`font-semibold mb-1 ${challenge.completed ? "line-through text-muted-foreground" : ""}`}>
                  {challenge.title}
                </h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
            </div>
          </Card>
        ))}

        {completedCount === challenges.length && (
          <Card className="p-6 bg-gradient-to-br from-accent/20 to-primary/10 border-accent/30 text-center">
            <p className="font-semibold mb-2">Completaste todos los retos</p>
            <p className="text-sm text-muted-foreground">Cada logro, por pequeño que sea, merece celebrarse</p>
          </Card>
        )}
      </div>
    </div>
  )
}
