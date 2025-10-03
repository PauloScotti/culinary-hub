# 🔧 DEBUG - Autenticação GitHub OAuth

## ❌ ERRO: "Failed to exchange code for token"

### 🔍 Possíveis Causas:

1. **URL de Callback Incorreta no GitHub**

   - Vá para: https://github.com/settings/developers
   - Clique na sua OAuth App "CulinaryHub"
   - Verifique se a **Authorization callback URL** está: `http://localhost:3000/auth/callback`

2. **Variáveis de Ambiente**
   - ✅ GITHUB_CLIENT_ID configurado
   - ✅ GITHUB_CLIENT_SECRET configurado
   - ✅ NEXT_PUBLIC_GITHUB_CLIENT_ID configurado

### 🚀 Como Testar:

1. **Restart o servidor:**

   ```bash
   # Pare o servidor (Ctrl+C) e reinicie
   pnpm dev
   ```

2. **Teste a autenticação:**

   - Acesse: http://localhost:3000/login
   - Clique em "Continuar com GitHub"
   - Verifique os logs no console do navegador e terminal

3. **Verifique os logs:**
   - No terminal: Procure por emojis 🔐 🔄 📡 ✅ ❌
   - No navegador: Abra DevTools > Console

### 🔧 Configurações Críticas:

**GitHub OAuth App deve ter:**

- Application name: CulinaryHub (ou qualquer nome)
- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/auth/callback` ⚠️ EXATO

**Se ainda não funcionar:**

1. Verifique se o Client ID no .env.local é o mesmo do seu OAuth App
2. Verifique se o Client Secret está correto
3. Certifique-se de que não há espaços extras nas variáveis de ambiente

### 📝 Next Steps:

- Execute os testes acima
- Compartilhe os logs se o problema persistir
