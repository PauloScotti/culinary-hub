"use client"

import { useFavorites } from "@/contexts/favorites-context"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FavoritesModule() {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-6xl">❤️</div>
        <h2 className="mb-2 text-2xl font-bold">Nenhuma receita favorita ainda</h2>
        <p className="mb-6 text-muted-foreground">Comece a explorar e adicione suas receitas favoritas aqui</p>
        <Button asChild>
          <Link href="/">Explorar Receitas</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Minhas Receitas Favoritas</h2>
        <p className="text-muted-foreground">{favorites.length} receita(s) salva(s)</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  )
}
