"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar: string
  provider: string
  accessToken: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (provider: string) => void
  logout: () => void
  handleOAuthCallback: (code: string, state: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Função para trocar authorization code por access token via API
const exchangeCodeForToken = async (code: string, provider: string): Promise<User> => {
  const response = await fetch(`/api/auth/${provider}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.details || 'Falha na autenticação')
  }

  return response.json()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Recupera sessão do localStorage
    const storedUser = localStorage.getItem("culinaryHubUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (provider: string) => {
    console.log(`Iniciando login com ${provider}...`)

    if (provider !== 'github') {
      console.error('Apenas GitHub OAuth está implementado no momento')
      return
    }

    // Gera state para proteção CSRF (parte do fluxo OAuth 2.0)
    const state = Math.random().toString(36).substring(7)
    localStorage.setItem("oauth_state", state)
    localStorage.setItem("oauth_provider", provider)

    // Configuração para GitHub OAuth
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'your_github_client_id_here',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'read:user user:email',
      state,
    })

    // Redireciona para GitHub OAuth
    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
    window.location.href = authUrl
  }

  const handleOAuthCallback = async (code: string, state: string) => {
    setIsLoading(true)

    try {
      // Valida state para prevenir CSRF attacks
      const storedState = localStorage.getItem("oauth_state")
      if (state !== storedState) {
        throw new Error("OAuth state mismatch - possível ataque CSRF")
      }

      // Pega o provider salvo
      const provider = localStorage.getItem("oauth_provider") || "github"

      // Troca authorization code por access token via API
      const userData = await exchangeCodeForToken(code, provider)

      // Salva usuário
      setUser(userData)
      localStorage.setItem("culinaryHubUser", JSON.stringify(userData))

      // Limpa dados temporários
      localStorage.removeItem("oauth_state")
      localStorage.removeItem("oauth_provider")

      console.log("OAuth 2.0 flow completed successfully")
    } catch (error) {
      console.error("OAuth error:", error)

      // Limpa dados em caso de erro
      localStorage.removeItem("oauth_state")
      localStorage.removeItem("oauth_provider")

      // Aqui você pode adicionar uma notificação de erro para o usuário
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("culinaryHubUser")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, handleOAuthCallback }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
