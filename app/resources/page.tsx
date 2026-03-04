"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Phone, MessageCircle, ExternalLink, MapPin, Heart } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const emergencyContacts = [
    {
      name: "Línea de Crisis Nacional",
      phone: "988",
      description: "Disponible 24/7 para crisis de salud mental",
      type: "emergency",
    },
    {
      name: "Línea de Prevención del Suicidio",
      phone: "911",
      description: "Ayuda inmediata en situaciones de emergencia",
      type: "emergency",
    },
  ]

  const professionalHelp = [
    {
      title: "Terapia Online",
      description: "Conecta con profesionales certificados desde casa",
      link: "https://www.betterhelp.com",
      icon: MessageCircle,
    },
    {
      title: "Directorio de Psicólogos",
      description: "Encuentra terapeutas cerca de ti",
      link: "https://www.psychologytoday.com/us/therapists",
      icon: MapPin,
    },
    {
      title: "Grupos de Apoyo",
      description: "Comunidades de personas que entienden",
      link: "https://www.nami.org/Support-Education/Support-Groups",
      icon: Heart,
    },
  ]

  const selfCareArticles = [
    "Entendiendo la ansiedad y cómo manejarla",
    "Técnicas de grounding para momentos difíciles",
    "Cómo construir una rutina de autocuidado",
    "Señales de que es momento de buscar ayuda profesional",
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Recursos</h1>
            <p className="text-sm text-muted-foreground">No estás solo</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-6 max-w-lg mx-auto">
        {/* Emergency Contacts */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Ayuda Inmediata</h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-destructive/20 to-destructive/5 border-destructive/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-destructive/20">
                    <Phone className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                    <a href={`tel:${contact.phone}`}>
                      <Button variant="destructive" size="sm">
                        Llamar {contact.phone}
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Help */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Ayuda Profesional</h2>
          <div className="space-y-3">
            {professionalHelp.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Visitar
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Self-Care Articles */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Artículos de Autocuidado</h2>
          <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5">
            <ul className="space-y-3">
              {selfCareArticles.map((article, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm text-balance leading-relaxed">{article}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Reminder */}
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-chart-1/10 border-primary/20">
          <p className="text-sm text-balance leading-relaxed">
            Recuerda: Pedir ayuda no es señal de debilidad, es un acto de valentía y autocuidado. Mereces sentirte
            mejor.
          </p>
        </Card>
      </div>
    </div>
  )
}
