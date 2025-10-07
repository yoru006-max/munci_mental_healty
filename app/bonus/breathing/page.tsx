"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Play, Pause } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function BreathingPage() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(4)

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1

        // Move to next phase
        if (phase === "inhale") {
          setPhase("hold")
          return 4
        } else if (phase === "hold") {
          setPhase("exhale")
          return 6
        } else {
          setPhase("inhale")
          return 4
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase])

  const phaseText = {
    inhale: "Inhala profundamente",
    hold: "Mantén el aire",
    exhale: "Exhala lentamente",
  }

  const phaseColor = {
    inhale: "from-primary/30 to-chart-1/30",
    hold: "from-chart-4/30 to-chart-2/30",
    exhale: "from-chart-3/30 to-primary/30",
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/bonus">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Respiración Guiada</h1>
            <p className="text-sm text-muted-foreground">Técnica 4-4-6</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 max-w-lg mx-auto">
        <Card className="p-8 text-center space-y-8">
          {/* Breathing Circle */}
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "w-48 h-48 rounded-full bg-gradient-to-br flex items-center justify-center transition-all duration-1000",
                phaseColor[phase],
                isActive && phase === "inhale" && "scale-125",
                isActive && phase === "exhale" && "scale-75",
              )}
            >
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{count}</div>
                <div className="text-sm font-medium text-muted-foreground">{phaseText[phase]}</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {!isActive && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
              <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                Este ejercicio te ayudará a calmar la ansiedad y encontrar paz en momentos difíciles.
              </p>
              <p className="text-xs text-muted-foreground">Inhala 4 segundos • Mantén 4 segundos • Exhala 6 segundos</p>
            </div>
          )}

          {/* Control Button */}
          <Button
            onClick={() => setIsActive(!isActive)}
            size="lg"
            className="w-full"
            variant={isActive ? "secondary" : "default"}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Comenzar
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  )
}
