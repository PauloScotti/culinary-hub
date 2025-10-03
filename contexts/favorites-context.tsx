"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Recipe {
  id: number
  title: string
  image: string
  prepTime: string
  difficulty: string
  servings: number
}

interface FavoritesContextType {
  favorites: Recipe[]
  addFavorite: (recipe: Recipe) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("culinaryHubFavorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("culinaryHubFavorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => [...prev, recipe])
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((recipe) => recipe.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
