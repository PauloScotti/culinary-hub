"use client"

import { Header } from "@/components/header"
import { ModuleLoader } from "@/components/module-loader"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-balance">Suas Receitas Favoritas</h1>
          <p className="text-lg text-muted-foreground text-pretty">Gerencie suas receitas salvas em um só lugar</p>
        </div>

        <ModuleLoader moduleName="favorites" />
      </main>
    </div>
  )
}
