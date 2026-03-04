import { Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

const quotes = [
  "Esta bien no estar bien. Tus emociones son validas.",
  "Cada dia es una nueva oportunidad para cuidarte.",
  "Eres mas fuerte de lo que crees, incluso en tus momentos mas dificiles.",
  "No tienes que ser perfecto para ser valioso.",
  "Tus sentimientos importan. Tu importas.",
  "Mereces amor y compasion, especialmente de ti mismo.",
  "Un paso a la vez. No hay prisa en tu camino.",
  "Tus emociones no te definen, pero si importan.",
  "Hoy es un buen dia para ser amable contigo.",
  "Respirar ya es un logro. Estas aqui, y eso es suficiente.",
  "No estas solo. Siempre hay alguien que se preocupa por ti.",
  "Tu bienestar es importante. Cuidarte no es egoismo.",
  "Los dias dificiles hacen que los buenos sean mas especiales.",
  "Cada emocion que sientes tiene un proposito.",
  "Eres valiente por enfrentar cada dia como lo haces.",
  "Tu corazon merece descanso y ternura.",
  "Pedir ayuda es un acto de valentia, no de debilidad.",
  "Hoy puedes empezar de nuevo. Siempre puedes empezar de nuevo.",
  "Eres digno de felicidad, paz y amor.",
  "Tus luchas de hoy son tu fuerza de manana.",
  "No necesitas tener todo resuelto para estar bien.",
  "Celebra los pequenos logros. Todos cuentan.",
  "Tu presencia en este mundo hace la diferencia.",
  "Sentir es humano. Abrazar tus emociones es sabio.",
  "Hoy, simplemente se amable contigo mismo.",
  "El sol siempre vuelve a salir, incluso despues de la tormenta.",
  "Tu historia aun se esta escribiendo. Hay paginas hermosas por venir.",
  "Descansar no es rendirse. Es cuidarte para seguir adelante.",
  "Eres suficiente, tal y como eres en este momento.",
  "Cada respiro es una oportunidad de paz.",
  "Tu fortaleza interior es mas grande de lo que imaginas.",
]

export function DailyQuote() {
  // Rotate quote based on day of the year
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const diff = today.getTime() - startOfYear.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const quoteIndex = dayOfYear % quotes.length
  const quote = quotes[quoteIndex]

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
      <div className="flex gap-3">
        <Quote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-balance leading-relaxed font-medium">{quote}</p>
      </div>
    </Card>
  )
}
