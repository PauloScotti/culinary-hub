"use client"

import type React from "react"

import { lazy, Suspense, type ComponentType } from "react"

interface ModuleLoaderProps {
  moduleName: string
  fallback?: React.ReactNode
}

const modules: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  auth: () => import("@/microfrontends/auth-module").then((mod) => ({ default: mod.AuthModule })),
  recipes: () => import("@/microfrontends/recipes-module").then((mod) => ({ default: mod.RecipesModule })),
  favorites: () => import("@/microfrontends/favorites-module").then((mod) => ({ default: mod.FavoritesModule })),
}

export function ModuleLoader({ moduleName, fallback }: ModuleLoaderProps) {
  const moduleLoader = modules[moduleName]

  if (!moduleLoader) {
    return <div>Módulo não encontrado: {moduleName}</div>
  }

  const LazyModule = lazy(moduleLoader)

  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
              <p className="text-muted-foreground">Carregando módulo...</p>
            </div>
          </div>
        )
      }
    >
      <LazyModule />
    </Suspense>
  )
}
