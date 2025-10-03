import { NextRequest, NextResponse } from 'next/server'

interface GitHubTokenResponse {
    access_token: string
    token_type: string
    scope: string
}

interface GitHubUser {
    id: number
    login: string
    name: string | null
    email: string | null
    avatar_url: string
}

interface GitHubEmail {
    email: string
    primary: boolean
    verified: boolean
    visibility: string | null
}

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json()
        console.log('🔐 GitHub OAuth: Recebido code:', code?.substring(0, 10) + '...')

        if (!code) {
            return NextResponse.json(
                { error: 'Authorization code is required' },
                { status: 400 }
            )
        }

        // Verificar se as variáveis de ambiente estão configuradas
        if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
            console.error('❌ Variáveis de ambiente não configuradas:', {
                clientId: !!process.env.GITHUB_CLIENT_ID,
                clientSecret: !!process.env.GITHUB_CLIENT_SECRET
            })
            throw new Error('GitHub OAuth credentials not configured')
        }

        console.log('🔄 Trocando code por access token...')

        // 1. Trocar authorization code por access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        })

        console.log('📡 Token response status:', tokenResponse.status)

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text()
            console.error('❌ Token exchange failed:', errorText)
            throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorText}`)
        }

        const tokenData: GitHubTokenResponse = await tokenResponse.json()
        console.log('✅ Token recebido com sucesso')

        if (!tokenData.access_token) {
            console.error('❌ Nenhum access token na resposta:', tokenData)
            throw new Error('No access token received')
        }

        console.log('👤 Buscando dados do usuário...')

        // 2. Buscar dados do usuário
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        })

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data')
        }

        const userData: GitHubUser = await userResponse.json()

        // 3. Buscar email se não estiver público
        let userEmail = userData.email
        if (!userEmail) {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
            })

            if (emailResponse.ok) {
                const emails: GitHubEmail[] = await emailResponse.json()
                const primaryEmail = emails.find(email => email.primary && email.verified)
                userEmail = primaryEmail?.email || emails[0]?.email || null
            }
        }

        // 4. Retornar dados do usuário formatados
        const user = {
            id: userData.id.toString(),
            email: userEmail || `${userData.login}@github.local`,
            name: userData.name || userData.login,
            avatar: userData.avatar_url,
            provider: 'github',
            accessToken: tokenData.access_token,
        }

        console.log('✅ Usuário autenticado com sucesso:', userData.login)
        return NextResponse.json(user)

    } catch (error) {
        console.error('❌ GitHub OAuth Error:', error)

        // Log mais detalhado do erro
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
            })
        }

        return NextResponse.json(
            {
                error: 'Authentication failed',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}