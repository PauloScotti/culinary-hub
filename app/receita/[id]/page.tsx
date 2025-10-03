"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Users, ChefHat, Heart } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFavorites } from "@/contexts/favorites-context"

const recipesData: Record<number, any> = {
  1: {
    id: 1,
    title: "Risoto de Cogumelos Selvagens",
    image: "/creamy-mushroom-risotto-in-elegant-bowl.jpg",
    prepTime: "45 min",
    difficulty: "Médio",
    servings: 4,
    description:
      "Um risoto cremoso e aromático com uma seleção de cogumelos selvagens, finalizado com parmesão e ervas frescas.",
    ingredients: [
      "400g de arroz arbóreo",
      "300g de cogumelos variados (shiitake, portobello, paris)",
      "1 litro de caldo de legumes",
      "1 cebola picada",
      "3 dentes de alho",
      "100ml de vinho branco seco",
      "50g de manteiga",
      "100g de queijo parmesão ralado",
      "Azeite, sal e pimenta a gosto",
      "Salsinha fresca",
    ],
    instructions: [
      "Aqueça o caldo de legumes e mantenha em fogo baixo",
      "Em uma panela grande, refogue a cebola e o alho no azeite até ficarem transparentes",
      "Adicione os cogumelos fatiados e cozinhe até dourarem",
      "Acrescente o arroz e mexa por 2 minutos até os grãos ficarem translúcidos",
      "Adicione o vinho branco e deixe evaporar",
      "Comece a adicionar o caldo quente, uma concha de cada vez, mexendo constantemente",
      "Continue adicionando caldo até o arroz ficar al dente (cerca de 18-20 minutos)",
      "Retire do fogo e adicione a manteiga e o parmesão",
      "Mexa vigorosamente para criar cremosidade",
      "Finalize com salsinha fresca e sirva imediatamente",
    ],
  },
  2: {
    id: 2,
    title: "Salmão Grelhado com Legumes",
    image: "/images/dinner.png",
    prepTime: "30 min",
    difficulty: "Fácil",
    servings: 2,
    description: "Filés de salmão perfeitamente grelhados acompanhados de legumes assados coloridos e temperados.",
    ingredients: [
      "2 filés de salmão (150g cada)",
      "2 abobrinhas",
      "1 pimentão vermelho",
      "1 pimentão amarelo",
      "200g de tomates cereja",
      "Azeite extra virgem",
      "Limão siciliano",
      "Alecrim fresco",
      "Sal e pimenta do reino",
    ],
    instructions: [
      "Pré-aqueça o forno a 200°C",
      "Corte os legumes em pedaços médios",
      "Tempere os legumes com azeite, sal, pimenta e alecrim",
      "Disponha os legumes em uma assadeira e leve ao forno por 20 minutos",
      "Tempere o salmão com sal, pimenta e suco de limão",
      "Aqueça uma frigideira antiaderente em fogo médio-alto",
      "Grelhe o salmão com a pele para baixo por 4 minutos",
      "Vire e cozinhe por mais 3 minutos",
      "Sirva o salmão sobre os legumes assados",
      "Finalize com rodelas de limão e alecrim fresco",
    ],
  },
  3: {
    id: 3,
    title: "Pasta Carbonara Autêntica",
    image: "/authentic-italian-carbonara-pasta.jpg",
    prepTime: "25 min",
    difficulty: "Médio",
    servings: 4,
    description: "A clássica receita romana de carbonara com guanciale, ovos, pecorino e pimenta preta.",
    ingredients: [
      "400g de spaghetti",
      "200g de guanciale (ou bacon)",
      "4 gemas de ovo",
      "100g de queijo pecorino romano ralado",
      "Pimenta preta moída na hora",
      "Sal",
    ],
    instructions: [
      "Coloque água para ferver com sal para o macarrão",
      "Corte o guanciale em cubos pequenos",
      "Em uma tigela, misture as gemas com o pecorino ralado",
      "Frite o guanciale em fogo médio até ficar crocante",
      "Cozinhe o spaghetti al dente",
      "Reserve 1 xícara da água do cozimento",
      "Escorra a massa e adicione à frigideira com o guanciale",
      "Retire do fogo e adicione a mistura de ovos e queijo",
      "Mexa rapidamente, adicionando água do cozimento aos poucos",
      "Finalize com bastante pimenta preta moída na hora",
    ],
  },
  4: {
    id: 4,
    title: "Bolo de Chocolate Belga",
    image: "/rich-belgian-chocolate-cake-slice.jpg",
    prepTime: "60 min",
    difficulty: "Difícil",
    servings: 8,
    description: "Um bolo de chocolate intenso e úmido, feito com chocolate belga de alta qualidade.",
    ingredients: [
      "200g de chocolate belga 70% cacau",
      "150g de manteiga",
      "4 ovos",
      "150g de açúcar",
      "100g de farinha de trigo",
      "50g de cacau em pó",
      "1 colher de chá de fermento",
      "Pitada de sal",
      "Ganache de chocolate para cobertura",
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C",
      "Derreta o chocolate com a manteiga em banho-maria",
      "Bata os ovos com o açúcar até obter um creme claro",
      "Adicione o chocolate derretido à mistura de ovos",
      "Peneire a farinha, cacau, fermento e sal",
      "Incorpore delicadamente os ingredientes secos",
      "Despeje em forma untada e enfarinhada",
      "Asse por 35-40 minutos",
      "Deixe esfriar completamente",
      "Cubra com ganache de chocolate",
    ],
  },
  5: {
    id: 5,
    title: "Salada Caesar com Frango",
    image: "/fresh-caesar-salad-with-grilled-chicken.jpg",
    prepTime: "20 min",
    difficulty: "Fácil",
    servings: 2,
    description: "A clássica salada Caesar com frango grelhado, croutons crocantes e molho cremoso.",
    ingredients: [
      "2 peitos de frango",
      "1 pé de alface romana",
      "50g de queijo parmesão",
      "Croutons",
      "Para o molho: 2 anchovas, 1 dente de alho, suco de limão, mostarda dijon, azeite, ovo",
    ],
    instructions: [
      "Tempere e grelhe o frango até cozinhar completamente",
      "Prepare o molho batendo anchovas, alho, limão, mostarda e ovo",
      "Adicione azeite aos poucos até emulsificar",
      "Lave e seque bem a alface",
      "Corte o frango em tiras",
      "Monte a salada com alface, frango e croutons",
      "Regue com o molho",
      "Finalize com parmesão ralado",
    ],
  },
  6: {
    id: 6,
    title: "Paella Valenciana",
    image: "/traditional-spanish-paella-with-seafood.jpg",
    prepTime: "90 min",
    difficulty: "Difícil",
    servings: 6,
    description: "A autêntica paella espanhola com frutos do mar, frango e açafrão.",
    ingredients: [
      "500g de arroz bomba",
      "300g de frango em pedaços",
      "200g de camarões",
      "200g de mexilhões",
      "200g de lulas",
      "1 litro de caldo de peixe",
      "Açafrão",
      "Pimentão vermelho",
      "Ervilhas",
      "Alho e cebola",
      "Azeite",
      "Limão",
    ],
    instructions: [
      "Aqueça o caldo com açafrão",
      "Em uma paellera, doure o frango no azeite",
      "Adicione alho, cebola e pimentão",
      "Acrescente o arroz e refogue",
      "Adicione o caldo quente",
      "Distribua os frutos do mar",
      "Cozinhe sem mexer por 20 minutos",
      "Adicione as ervilhas",
      "Deixe formar a socarrat (crosta no fundo)",
      "Sirva com rodelas de limão",
    ],
  },
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const recipe = recipesData[Number.parseInt(id)]
  const favorite = isFavorite(Number.parseInt(id))

  if (!recipe) {
    return <div>Receita não encontrada</div>
  }

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(recipe.id)
    } else {
      addFavorite({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty,
        servings: recipe.servings,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-balance">{recipe.title}</h1>
                  <p className="text-muted-foreground text-pretty">{recipe.description}</p>
                </div>
                <Button size="icon" variant={favorite ? "default" : "outline"} onClick={handleFavoriteClick}>
                  <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tempo</p>
                    <p className="font-semibold">{recipe.prepTime}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <ChefHat className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dificuldade</p>
                    <p className="font-semibold">{recipe.difficulty}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Porções</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ingredientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modo de Preparo</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-pretty">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Dicas do Chef</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Ingredientes de Qualidade</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Use sempre ingredientes frescos e de boa qualidade para obter o melhor resultado.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Preparação</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Separe todos os ingredientes antes de começar. Isso facilita o processo e evita erros.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Armazenamento</h4>
                  <p className="text-sm text-muted-foreground text-pretty">
                    Esta receita pode ser armazenada na geladeira por até 3 dias em recipiente hermético.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
