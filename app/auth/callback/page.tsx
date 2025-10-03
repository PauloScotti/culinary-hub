"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { handleOAuthCallback } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const errorParam = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    // Verifica se houve erro no OAuth
    if (errorParam) {
      setError(errorDescription || `Erro de autenticação: ${errorParam}`)
      setIsProcessing(false)
      return
    }

    if (code && state) {
      console.log("Processing OAuth callback with code:", code)

      handleOAuthCallback(code, state)
        .then(() => {
          // Redireciona para home após autenticação bem-sucedida
          setTimeout(() => {
            router.push("/")
          }, 1500)
        })
        .catch((error) => {
          console.error("OAuth callback error:", error)
          setError(error.message || "Falha na autenticação")
          setIsProcessing(false)
        })
    } else {
      console.error("Missing OAuth parameters")
      setError("Parâmetros de autenticação inválidos")
      setIsProcessing(false)
    }
  }, [searchParams, handleOAuthCallback, router])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/login")} variant="outline" className="flex-1">
              Tentar Novamente
            </Button>
            <Button onClick={() => router.push("/")} className="flex-1">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <h2 className="mb-2 text-xl font-semibold">Autenticando...</h2>
          <p className="text-muted-foreground">Processando seu login via GitHub OAuth</p>
        </div>
      </div>
    )
  }

  return null
}
