"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Play, RotateCcw, Check } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Phase = "inhale" | "hold" | "exhale" | "rest" | "complete"

export default function BreathingPage() {
  const [hasStarted, setHasStarted] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<Phase>("inhale")
  const [count, setCount] = useState(4)
  const [cycleCount, setCycleCount] = useState(0)
  const [setNumber, setSetNumber] = useState(1)
  const [totalCycles] = useState(5)
  const [totalSets] = useState(2)

  const resetExercise = useCallback(() => {
    setHasStarted(false)
    setIsActive(false)
    setPhase("inhale")
    setCount(4)
    setCycleCount(0)
    setSetNumber(1)
  }, [])

  const startExercise = () => {
    setHasStarted(true)
    setIsActive(true)
    setPhase("inhale")
    setCount(4)
    setCycleCount(0)
    setSetNumber(1)
  }

  useEffect(() => {
    if (!isActive || phase === "complete") return

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
        } else if (phase === "exhale") {
          // Check if we completed a cycle
          const newCycleCount = cycleCount + 1
          setCycleCount(newCycleCount)

          if (newCycleCount >= totalCycles) {
            // Completed 5 cycles
            if (setNumber >= totalSets) {
              // Completed both sets
              setPhase("complete")
              setIsActive(false)
              return 0
            } else {
              // Rest between sets
              setPhase("rest")
              return 10
            }
          } else {
            // Continue with next cycle
            setPhase("inhale")
            return 4
          }
        } else if (phase === "rest") {
          // Start second set
          setSetNumber(2)
          setCycleCount(0)
          setPhase("inhale")
          return 4
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase, cycleCount, totalCycles, setNumber, totalSets])

  const phaseText: Record<Phase, string> = {
    inhale: "Inhala profundamente",
    hold: "Manten el aire",
    exhale: "Exhala lentamente",
    rest: "Descansa un momento",
    complete: "Completado",
  }

  const phaseColor: Record<Phase, string> = {
    inhale: "from-primary/30 to-chart-1/30",
    hold: "from-chart-4/30 to-chart-2/30",
    exhale: "from-chart-3/30 to-primary/30",
    rest: "from-chart-4/20 to-muted/30",
    complete: "from-chart-3/40 to-primary/40",
  }

  // Pre-exercise instructions screen
  if (!hasStarted) {
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
              <h1 className="text-2xl font-bold">Respiracion Guiada</h1>
              <p className="text-sm text-muted-foreground">Tecnica 4-4-6</p>
            </div>
          </div>
        </header>

        <div className="px-6 pb-6 max-w-lg mx-auto space-y-6">
          {/* Important Recommendations */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
            <h2 className="text-lg font-semibold mb-4 text-center">Antes de comenzar</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Sientate o acuestate comodo</p>
                  <p className="text-sm text-muted-foreground">Busca una posicion donde tu cuerpo este relajado y sin tension.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-chart-2/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Pon una mano en el pecho y otra en el abdomen</p>
                  <p className="text-sm text-muted-foreground">Esto te ayudara a sentir como entra y sale el aire de tu cuerpo.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Exercise Description */}
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-center">Como funciona el ejercicio</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold">4s</span>
                </div>
                <span>Inhala lentamente por la nariz</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-chart-4/10">
                <div className="w-10 h-10 rounded-full bg-chart-4/20 flex items-center justify-center">
                  <span className="font-bold">4s</span>
                </div>
                <span>Manten el aire en tus pulmones</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-chart-3/10">
                <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                  <span className="font-bold">6s</span>
                </div>
                <span>Exhala suavemente por la boca</span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">
                Repetiremos esto <strong>5 veces</strong>, descansamos <strong>10 segundos</strong>, y luego <strong>5 veces mas</strong>.
              </p>
            </div>
          </Card>

          {/* Start Button */}
          <Button onClick={startExercise} size="lg" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Estoy listo para comenzar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={resetExercise}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Respiracion Guiada</h1>
            <p className="text-sm text-muted-foreground">
              Serie {setNumber} de {totalSets} - Ciclo {Math.min(cycleCount + 1, totalCycles)} de {totalCycles}
            </p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 max-w-lg mx-auto">
        <Card className="p-8 text-center space-y-8">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalCycles }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i < cycleCount
                    ? "bg-primary"
                    : i === cycleCount && phase !== "rest" && phase !== "complete"
                      ? "bg-primary/50 animate-pulse"
                      : "bg-muted"
                )}
              />
            ))}
            {setNumber === 1 && (
              <>
                <div className="w-1 h-3 bg-muted-foreground/30 mx-1" />
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div key={`set2-${i}`} className="w-3 h-3 rounded-full bg-muted" />
                ))}
              </>
            )}
            {setNumber === 2 && (
              <>
                <div className="w-1 h-3 bg-primary/30 mx-1" />
                {Array.from({ length: totalCycles }).map((_, i) => (
                  <div
                    key={`set2-${i}`}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      i < cycleCount
                        ? "bg-primary"
                        : i === cycleCount && phase !== "complete"
                          ? "bg-primary/50 animate-pulse"
                          : "bg-muted"
                    )}
                  />
                ))}
              </>
            )}
          </div>

          {/* Breathing Circle */}
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "w-48 h-48 rounded-full bg-gradient-to-br flex items-center justify-center transition-all duration-1000",
                phaseColor[phase],
                isActive && phase === "inhale" && "scale-125",
                isActive && phase === "exhale" && "scale-75",
                phase === "complete" && "scale-110"
              )}
            >
              <div className="text-center">
                {phase === "complete" ? (
                  <>
                    <Check className="w-16 h-16 mx-auto mb-2 text-chart-3" />
                    <div className="text-sm font-medium text-muted-foreground">Excelente trabajo</div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl font-bold mb-2">{count}</div>
                    <div className="text-sm font-medium text-muted-foreground">{phaseText[phase]}</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Phase Hints */}
          {phase === "rest" && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <p className="text-sm text-muted-foreground text-balance">
                Lo estas haciendo muy bien. Toma un momento para descansar antes de la siguiente serie.
              </p>
            </div>
          )}

          {phase === "complete" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                Completaste las 10 respiraciones. Tu cuerpo y mente estan mas calmados ahora. Recuerda que puedes volver aqui siempre que lo necesites.
              </p>
              <Button onClick={resetExercise} variant="secondary" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Hacer el ejercicio de nuevo
              </Button>
            </div>
          )}

          {/* Hand Reminder */}
          {isActive && phase !== "rest" && phase !== "complete" && (
            <p className="text-xs text-muted-foreground">
              Recuerda: una mano en el pecho, otra en el abdomen
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
