"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const emotions = [
  { emoji: "😊", label: "Bien", color: "bg-chart-1/20 hover:bg-chart-1/30 border-chart-1/40" },
  { emoji: "😌", label: "Tranquilo", color: "bg-primary/20 hover:bg-primary/30 border-primary/40" },
  { emoji: "😔", label: "Triste", color: "bg-chart-3/20 hover:bg-chart-3/30 border-chart-3/40" },
  { emoji: "😰", label: "Ansioso", color: "bg-chart-2/20 hover:bg-chart-2/30 border-chart-2/40" },
  { emoji: "😢", label: "Mal", color: "bg-chart-5/20 hover:bg-chart-5/30 border-chart-5/40" },
]

export function EmotionSelector() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
              emotion.color,
              selected === index && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105",
            )}
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className="text-xs font-medium">{emotion.label}</span>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-muted-foreground text-center">
            Gracias por compartir cómo te sientes. Estoy aquí para ti.
          </p>
        </div>
      )}
    </div>
  )
}
