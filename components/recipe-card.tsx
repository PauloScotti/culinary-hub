"use client"

import type React from "react"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/contexts/favorites-context"

interface RecipeCardProps {
  id: number
  title: string
  image: string
  prepTime: string
  difficulty: string
  servings: number
}

export function RecipeCard({ id, title, image, prepTime, difficulty, servings }: RecipeCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (favorite) {
      removeFavorite(id)
    } else {
      addFavorite({ id, title, image, prepTime, difficulty, servings })
    }
  }

  return (
    <Link href={`/receita/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-2 top-2 h-9 w-9 rounded-full"
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-accent text-accent" : ""}`} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-balance">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{prepTime}</span>
            <span>•</span>
            <span>{difficulty}</span>
            <span>•</span>
            <span>{servings} porções</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
