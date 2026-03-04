"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eraser, Download } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export default function ArtPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#E9B4C6")
  const [brushSize, setBrushSize] = useState(8)

  const colors = [
    { name: "Rosa", hex: "#E9B4C6" },
    { name: "Lavanda", hex: "#C9B4E6" },
    { name: "Melocotón", hex: "#F5C3A1" },
    { name: "Verde", hex: "#B8D4C6" },
    { name: "Amarillo", hex: "#F5E6A1" },
    { name: "Gris", hex: "#A8A8A8" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fill with white background
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadArt = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = `munci-art-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/bonus">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Arte Libre</h1>
            <p className="text-sm text-muted-foreground">Expresa tus emociones</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        <Card className="p-4">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-96 border-2 border-border rounded-lg touch-none cursor-crosshair"
          />
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Color</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      color === c.hex ? "border-foreground scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Grosor del pincel: {brushSize}px</p>
              <input
                type="range"
                min="2"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={clearCanvas} variant="outline">
            <Eraser className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
          <Button onClick={downloadArt} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>

        <Card className="p-6 bg-gradient-to-br from-chart-3/20 to-primary/5">
          <p className="text-sm text-balance leading-relaxed text-center text-muted-foreground">
            No hay dibujos correctos o incorrectos. Solo expresa lo que sientes en este momento.
          </p>
        </Card>
      </div>
    </div>
  )
}
