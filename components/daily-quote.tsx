import { Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

const quotes = [
  "Está bien no estar bien. Tus emociones son válidas.",
  "Cada día es una nueva oportunidad para cuidarte.",
  "Eres más fuerte de lo que crees, incluso en tus momentos más difíciles.",
  "No tienes que ser perfecto para ser valioso.",
  "Tus sentimientos importan. Tú importas.",
]

export function DailyQuote() {
  // In a real app, this would rotate daily
  const quote = quotes[0]

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
      <div className="flex gap-3">
        <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-balance leading-relaxed font-medium">{quote}</p>
      </div>
    </Card>
  )
}
