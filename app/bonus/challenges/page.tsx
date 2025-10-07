import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function ChallengesPage() {
  const challenges = [
    {
      title: "Escribe 3 cosas buenas",
      description: "Pueden ser pequeñas, como el sabor del café",
      completed: false,
    },
    {
      title: "Toma agua",
      description: "Un vaso completo, despacio",
      completed: false,
    },
    {
      title: "Estira tu cuerpo",
      description: "5 minutos de movimiento suave",
      completed: false,
    },
    {
      title: "Respira conscientemente",
      description: "3 respiraciones profundas",
      completed: false,
    },
    {
      title: "Contacta a alguien",
      description: "Un mensaje simple a quien te importa",
      completed: false,
    },
  ]

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
            <h1 className="text-2xl font-bold">Retos Suaves</h1>
            <p className="text-sm text-muted-foreground">Pequeñas metas para hoy</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10">
          <p className="text-sm text-balance leading-relaxed">
            No tienes que completar todos. Elige uno o dos que se sientan posibles hoy. Cada pequeño paso cuenta.
          </p>
        </Card>

        {challenges.map((challenge, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <Button
                size="icon"
                variant="outline"
                className="flex-shrink-0 rounded-full h-10 w-10 border-2 bg-transparent"
              >
                <Check className="w-4 h-4" />
              </Button>
              <div className="flex-1 pt-2">
                <h3 className="font-semibold mb-1">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
