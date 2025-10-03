import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { RegisterServiceWorker } from "./register-sw"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "CulinaryHub - Gerenciador de Receitas",
  description: "Descubra, salve e organize suas receitas favoritas",
  manifest: "/manifest.json",
  themeColor: "#1a1a1a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CulinaryHub",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </AuthProvider>
          <RegisterServiceWorker />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
