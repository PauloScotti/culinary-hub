# Arquitetura da Aplicação CulinaryHub

## Conceitos Implementados

### 1. Gerenciamento de Estado (Context API)
- **FavoritesContext**: Gerencia o estado global de receitas favoritas
  - Persistência em localStorage
  - Funções: addFavorite, removeFavorite, isFavorite
  - Compartilhado entre todos os componentes

- **AuthContext**: Gerencia o estado de autenticação OAuth 2.0
  - Armazena dados do usuário autenticado
  - Controla fluxo de login/logout
  - Validação de tokens e sessões

### 2. PWA (Progressive Web App)
- **manifest.json**: Configuração para instalação do app
- **Service Worker**: Cache de recursos para funcionamento offline
- **Ícones**: Múltiplos tamanhos para diferentes dispositivos
- **Tema**: Configuração de cores e aparência

### 3. OAuth 2.0
- **Fluxo Completo de Autenticação**:
  1. Usuário clica em "Login com Provider"
  2. Redirecionamento para authorization endpoint
  3. Geração de state para proteção CSRF
  4. Callback com authorization code
  5. Troca de code por access token
  6. Armazenamento de sessão

- **Providers Suportados**: Google, GitHub, Facebook
- **Segurança**: Validação de state, tokens, proteção CSRF

### 4. Micro-frontends
- **Arquitetura Modular**: Aplicação dividida em módulos independentes
  - **Auth Module**: Sistema de autenticação OAuth 2.0
  - **Recipes Module**: Listagem e busca de receitas
  - **Favorites Module**: Gerenciamento de favoritos

- **Carregamento Dinâmico**: 
  - React.lazy() para code splitting
  - Suspense para loading states
  - ModuleLoader como orquestrador

- **Benefícios**:
  - Desenvolvimento independente de cada módulo
  - Carregamento sob demanda (performance)
  - Manutenção facilitada
  - Escalabilidade

## Estrutura de Diretórios

\`\`\`
app/
├── auth/
│   └── callback/          # Callback OAuth 2.0
├── favoritos/             # Página de favoritos
├── login/                 # Página de login
├── receita/[id]/          # Detalhes da receita
└── page.tsx               # Home

components/
├── header.tsx             # Header com navegação e auth
├── module-loader.tsx      # Carregador de micro-frontends
├── protected-route.tsx    # HOC para rotas protegidas
└── recipe-card.tsx        # Card de receita

contexts/
├── auth-context.tsx       # Estado global de autenticação
└── favorites-context.tsx  # Estado global de favoritos

microfrontends/
├── auth-module.tsx        # Micro-frontend de autenticação
├── favorites-module.tsx   # Micro-frontend de favoritos
└── recipes-module.tsx     # Micro-frontend de receitas
\`\`\`

## Fluxo de Dados

1. **Autenticação**: AuthContext → Header → Protected Routes
2. **Favoritos**: FavoritesContext → RecipeCard → FavoritesModule
3. **Módulos**: ModuleLoader → Dynamic Import → Render

## Tecnologias

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Context API
- Service Workers
