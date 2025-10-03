import { Header } from "@/components/header"
import { ModuleLoader } from "@/components/module-loader"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-balance">Descubra Receitas Incríveis</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Explore nossa coleção curada de receitas deliciosas para todas as ocasiões
          </p>
        </div>

        <ModuleLoader moduleName="recipes" />
      </main>
    </div>
  )
}
