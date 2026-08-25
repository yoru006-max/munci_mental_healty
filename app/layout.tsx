import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { AuthProvider } from "@/components/auth-provider"
import { SessionTimeoutWrapper } from "@/components/session-timeout-wrapper"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Munci - Tu refugio emocional",
  description: "Un espacio seguro para tu bienestar mental",
  generator: "v0.app",
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f59e0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <SessionTimeoutWrapper>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <main className="pb-20 min-h-screen">{children}</main>
              <BottomNav />
            </Suspense>
          </AuthProvider>
        </SessionTimeoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}
