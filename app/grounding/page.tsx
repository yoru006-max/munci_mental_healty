"use client"

import { useState } from "react"
import { ArrowLeft, Eye, Check, RotateCcw, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GroundingPage() {
  const [items, setItems] = useState<string[]>(["", "", "", "", ""])
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setItems(["", "", "", "", ""])
    setCurrentStep(0)
    setIsComplete(false)
  }

  const prompts = [
    {
      number: 1,
      color: "from-primary/30 to-primary/10",
      borderColor: "border-primary/40",
      textColor: "text-primary",
      prompt: "Nombra algo que puedas VER a tu alrededor",
      placeholder: "Ej: Una ventana, una planta, un libro...",
      emoji: "👁️",
    },
    {
      number: 2,
      color: "from-chart-2/30 to-chart-2/10",
      borderColor: "border-chart-2/40",
      textColor: "text-chart-2",
      prompt: "Nombra algo mas que puedas VER",
      placeholder: "Ej: Una silla, una lampara, mi mochila...",
      emoji: "👀",
    },
    {
      number: 3,
      color: "from-chart-3/30 to-chart-3/10",
      borderColor: "border-chart-3/40",
      textColor: "text-chart-3",
      prompt: "Otra cosa que veas cerca de ti",
      placeholder: "Ej: El techo, una puerta, mis zapatos...",
      emoji: "🔍",
    },
    {
      number: 4,
      color: "from-chart-4/30 to-chart-4/10",
      borderColor: "border-chart-4/40",
      textColor: "text-chart-4",
      prompt: "Una cosa mas que este en tu espacio",
      placeholder: "Ej: Una taza, un cuadro, el piso...",
      emoji: "✨",
    },
    {
      number: 5,
      color: "from-chart-5/30 to-chart-5/10",
      borderColor: "border-chart-5/40",
      textColor: "text-chart-5",
      prompt: "La ultima cosa que puedas ver",
      placeholder: "Ej: Mi mano, el cielo, una mascota...",
      emoji: "🌟",
    },
  ]

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-6 pt-8 pb-6">
          <div className="max-w-lg mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </div>
        </header>

        <div className="px-6 pb-32 max-w-lg mx-auto space-y-6">
          <Card className="p-8 bg-gradient-to-br from-secondary/40 to-secondary/20 border-2 border-secondary text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Lo lograste</h2>
            <p className="text-muted-foreground text-balance leading-relaxed mb-6">
              Tomaste un momento para conectar con tu entorno. Estas aqui, en este lugar, y eso esta bien.
            </p>
          </Card>

          <Card className="p-6 bg-card">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Las 5 cosas que encontraste:
            </h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-gradient-to-r ${prompts[index].color} ${prompts[index].borderColor} border`}
                >
                  <span className="text-2xl mr-3">{prompts[index].emoji}</span>
                  <span className="font-medium">{item || "..."}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30">
            <p className="text-sm text-balance leading-relaxed">
              <Sparkles className="w-4 h-4 inline mr-2 text-accent-foreground" />
              Puedes repetir este ejercicio cada vez que sientas que necesitas anclarte al presente. No hay limite de
              veces.
            </p>
          </Card>

          <Button onClick={handleReset} variant="outline" className="w-full gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Hacer de nuevo
          </Button>
        </div>
      </div>
    )
  }

  const current = prompts[currentStep]

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
          <h1 className="text-2xl font-bold text-balance">Anclaje al presente</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Nombra 5 cosas que puedas ver a tu alrededor para conectar con el momento
          </p>
        </div>
      </header>

      <div className="px-6 pb-32 max-w-lg mx-auto space-y-6">
        {/* Progress indicator */}
        <div className="flex gap-2">
          {prompts.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                index < currentStep
                  ? "bg-primary"
                  : index === currentStep
                    ? "bg-primary/60"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Current prompt card */}
        <Card
          className={`p-8 bg-gradient-to-br ${current.color} border-2 ${current.borderColor} transition-all duration-300`}
        >
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">{current.emoji}</span>
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/50 ${current.textColor} font-bold text-lg mb-3`}
            >
              {current.number}
            </div>
            <h2 className="text-xl font-semibold text-balance">{current.prompt}</h2>
          </div>

          <input
            type="text"
            value={items[currentStep]}
            onChange={(e) => handleInputChange(currentStep, e.target.value)}
            placeholder={current.placeholder}
            className="w-full p-4 rounded-xl bg-background/70 border-2 border-border/50 focus:border-primary focus:outline-none text-center text-lg placeholder:text-muted-foreground/60"
            autoFocus
          />
        </Card>

        {/* Encouragement message */}
        <Card className="p-4 bg-secondary/30 border-secondary/40">
          <p className="text-sm text-center text-muted-foreground text-balance">
            {currentStep === 0 && "Toma tu tiempo. Mira a tu alrededor con calma."}
            {currentStep === 1 && "Muy bien. Sigue observando tu espacio."}
            {currentStep === 2 && "Vas genial. Ya casi llegas a la mitad."}
            {currentStep === 3 && "Excelente. Solo falta una cosa mas."}
            {currentStep === 4 && "Ultima cosa. Lo estas haciendo increible."}
          </p>
        </Card>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="flex-1 bg-transparent">
            Anterior
          </Button>
          <Button onClick={handleNext} disabled={!items[currentStep].trim()} className="flex-1">
            {currentStep === 4 ? "Terminar" : "Siguiente"}
          </Button>
        </div>

        {/* Show previously filled items */}
        {currentStep > 0 && (
          <Card className="p-4 bg-card/50">
            <p className="text-xs text-muted-foreground mb-3">Ya encontraste:</p>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, currentStep).map(
                (item, index) =>
                  item && (
                    <span key={index} className="px-3 py-1 rounded-full bg-primary/20 text-sm">
                      {prompts[index].emoji} {item}
                    </span>
                  )
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
