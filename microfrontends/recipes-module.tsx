"use client"

import { RecipeCard } from "@/components/recipe-card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const recipes = [
  {
    id: 1,
    title: "Risoto de Cogumelos Selvagens",
    image: "/creamy-mushroom-risotto-in-elegant-bowl.jpg",
    prepTime: "45 min",
    difficulty: "Médio",
    servings: 4,
  },
  {
    id: 2,
    title: "Salmão Grelhado com Legumes",
    image: "/images/dinner.png",
    prepTime: "30 min",
    difficulty: "Fácil",
    servings: 2,
  },
  {
    id: 3,
    title: "Pasta Carbonara Autêntica",
    image: "/authentic-italian-carbonara-pasta.jpg",
    prepTime: "25 min",
    difficulty: "Médio",
    servings: 4,
  },
  {
    id: 4,
    title: "Bolo de Chocolate Belga",
    image: "/rich-belgian-chocolate-cake-slice.jpg",
    prepTime: "60 min",
    difficulty: "Difícil",
    servings: 8,
  },
  {
    id: 5,
    title: "Salada Caesar com Frango",
    image: "/fresh-caesar-salad-with-grilled-chicken.jpg",
    prepTime: "20 min",
    difficulty: "Fácil",
    servings: 2,
  },
  {
    id: 6,
    title: "Paella Valenciana",
    image: "/traditional-spanish-paella-with-seafood.jpg",
    prepTime: "90 min",
    difficulty: "Difícil",
    servings: 6,
  },
]

export function RecipesModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = filterDifficulty === "all" || recipe.difficulty === filterDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Buscar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button
            variant={filterDifficulty === "all" ? "default" : "outline"}
            onClick={() => setFilterDifficulty("all")}
            size="sm"
          >
            Todas
          </Button>
          <Button
            variant={filterDifficulty === "Fácil" ? "default" : "outline"}
            onClick={() => setFilterDifficulty("Fácil")}
            size="sm"
          >
            Fácil
          </Button>
          <Button
            variant={filterDifficulty === "Médio" ? "default" : "outline"}
            onClick={() => setFilterDifficulty("Médio")}
            size="sm"
          >
            Médio
          </Button>
          <Button
            variant={filterDifficulty === "Difícil" ? "default" : "outline"}
            onClick={() => setFilterDifficulty("Difícil")}
            size="sm"
          >
            Difícil
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Nenhuma receita encontrada</p>
        </div>
      )}
    </div>
  )
}
