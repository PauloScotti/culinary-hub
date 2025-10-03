import { Header } from "@/components/header"
import { ModuleLoader } from "@/components/module-loader"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-balance">Bem-vindo ao CulinaryHub</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Faça login para salvar suas receitas favoritas e acessar recursos exclusivos
          </p>
        </div>

        <ModuleLoader moduleName="auth" />
      </main>
    </div>
  )
}
