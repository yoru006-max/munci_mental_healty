"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const emotions = [
  { emoji: "😊", label: "Bien", color: "bg-chart-1/20 hover:bg-chart-1/30 border-chart-1/40", bgColor: "bg-chart-1/30" },
  { emoji: "😌", label: "Tranquilo", color: "bg-primary/20 hover:bg-primary/30 border-primary/40", bgColor: "bg-primary/30" },
  { emoji: "😔", label: "Triste", color: "bg-chart-3/20 hover:bg-chart-3/30 border-chart-3/40", bgColor: "bg-chart-3/30" },
  { emoji: "😰", label: "Ansioso", color: "bg-chart-2/20 hover:bg-chart-2/30 border-chart-2/40", bgColor: "bg-chart-2/30" },
  { emoji: "😢", label: "Mal", color: "bg-chart-5/20 hover:bg-chart-5/30 border-chart-5/40", bgColor: "bg-chart-5/30" },
]

const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]

interface EmotionRecord {
  date: string
  emotionIndex: number
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getLast7Days(): Date[] {
  const days: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date)
  }
  return days
}

export function EmotionSelector() {
  const [selected, setSelected] = useState<number | null>(null)
  const [weeklyEmotions, setWeeklyEmotions] = useState<Record<string, number>>({})
  const [todayKey, setTodayKey] = useState<string>("")

  useEffect(() => {
    const today = new Date()
    const key = getDateKey(today)
    setTodayKey(key)

    // Load saved emotions
    const saved = localStorage.getItem("munci-emotions")
    if (saved) {
      try {
        const records: EmotionRecord[] = JSON.parse(saved)
        const emotionMap: Record<string, number> = {}
        records.forEach((record) => {
          emotionMap[record.date] = record.emotionIndex
        })
        setWeeklyEmotions(emotionMap)

        // If today already has an emotion, set it as selected
        if (emotionMap[key] !== undefined) {
          setSelected(emotionMap[key])
        }
      } catch {
        // Invalid data, reset
        localStorage.removeItem("munci-emotions")
      }
    }
  }, [])

  const handleSelectEmotion = (index: number) => {
    setSelected(index)

    // Save to localStorage
    const newEmotions = { ...weeklyEmotions, [todayKey]: index }
    setWeeklyEmotions(newEmotions)

    // Convert to array format for storage
    const records: EmotionRecord[] = Object.entries(newEmotions).map(([date, emotionIndex]) => ({
      date,
      emotionIndex,
    }))

    // Keep only last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const filteredRecords = records.filter((record) => {
      const [year, month, day] = record.date.split("-").map(Number)
      const recordDate = new Date(year, month - 1, day)
      return recordDate >= thirtyDaysAgo
    })

    localStorage.setItem("munci-emotions", JSON.stringify(filteredRecords))
  }

  const last7Days = getLast7Days()

  return (
    <div className="space-y-6">
      {/* Emotion Selector */}
      <div className="grid grid-cols-5 gap-2">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            onClick={() => handleSelectEmotion(index)}
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
            Gracias por compartir como te sientes. Estoy aqui para ti.
          </p>
        </div>
      )}

      {/* Weekly Emotions */}
      <div className="pt-4 border-t border-border/50">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Tu semana emocional</h3>
        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((date) => {
            const dateKey = getDateKey(date)
            const emotionIndex = weeklyEmotions[dateKey]
            const emotion = emotionIndex !== undefined ? emotions[emotionIndex] : null
            const isToday = dateKey === todayKey
            const dayName = dayNames[date.getDay()]

            return (
              <div key={dateKey} className="flex flex-col items-center gap-1">
                <span className={cn("text-xs", isToday ? "font-bold text-primary" : "text-muted-foreground")}>
                  {dayName}
                </span>
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    emotion ? emotion.bgColor : "bg-muted/50",
                    isToday && "ring-2 ring-primary ring-offset-1 ring-offset-background"
                  )}
                >
                  {emotion ? (
                    <span className="text-lg">{emotion.emoji}</span>
                  ) : (
                    <span className="text-muted-foreground text-lg">-</span>
                  )}
                </div>
                <span className={cn("text-xs", isToday ? "font-medium" : "text-muted-foreground")}>
                  {date.getDate()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
