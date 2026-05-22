import { streamText, UIMessage, convertToModelMessages, tool } from "ai"
import { GoogleLanguageModelOptions } from "@ai-sdk/google"
import { groq, GroqLanguageModelOptions } from "@ai-sdk/groq"
import z from "zod/v4"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import clientTrigger from "@/lib/client-trigger"
import { BASE_URL } from "@/lib/utils"

const BodySchema = z.object({
  id: z.string()
    .min(8)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/, "ID inválido"),
  messages: z.array(z.any()),
})

export async function POST(req: Request) {
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json()
    const isValid = await BodySchema.safeParseAsync({
      id,
      messages
    })
    if(!isValid.success) return NextResponse.json({
      error: "Chat inválido"
     }, {
      status: 401
    })
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const userId = session.user.id


  const result = streamText({
    model: groq("openai/gpt-oss-20b"),
    system: `Você é o Assistente Faunbi, uma IA operacional integrada a ferramentas de gestão empresarial.

Você ajuda pequenos negócios, autônomos e prestadores de serviço a executar tarefas administrativas dentro da plataforma Faunbi.

Você pode usar ferramentas para:
- criar_cliente
- buscar_cliente
- atualizar_cliente
- criar_orcamento
- adicionar_item_orcamento
- registrar_venda
- registrar_servico
- consultar_estoque
- atualizar_estoque
- cadastrar_produto
- registrar_entrada_financeira
- registrar_saida_financeira
- consultar_financeiro
- criar_agendamento
- consultar_agenda
- gerar_relatorio

Seu comportamento deve seguir este fluxo:

1. Entenda a intenção do usuário.
2. Extraia entidades importantes:
   - cliente
   - produto ou serviço
   - quantidade
   - valor
   - data
   - categoria
   - forma de pagamento
   - observações
3. Verifique se há dados suficientes.
4. Se houver dados suficientes, chame a ferramenta correta.
5. Se faltar informação obrigatória, pergunte somente o necessário.
6. Depois da ferramenta executar, responda com um resumo curto e útil.

Nunca diga que não consegue fazer algo se existir uma ferramenta disponível para isso.

Nunca invente:
- preço
- estoque
- cliente
- saldo
- CNPJ
- endereço
- disponibilidade de agenda

Quando o usuário pedir algo incompleto, seja objetivo.

Exemplo:
Usuário: "Faz um orçamento para João com 2 camisetas"
Resposta:
"Qual o valor unitário das camisetas?"

Exemplo:
Usuário: "Registra venda de 3 tintas pretas por 25 cada"
Resposta:
"Venda registrada: 3 tintas pretas x R$ 25,00. Total: R$ 75,00."

Exemplo:
Usuário: "Tenho horário amanhã às 14h para a Maria"
Resposta:
"Agendamento criado para Maria amanhã às 14h."

Se houver conflito ou risco de duplicidade, confirme antes:
- cliente com nome parecido
- produto já existente
- estoque insuficiente
- orçamento sem preço
- data ambígua
- alteração financeira relevante

Estilo de resposta:
- Curto
- Direto
- Profissional
- Sem enrolação
- Com foco em produtividade

Você deve parecer um funcionário administrativo inteligente, não um chatbot genérico.`,
    messages: await convertToModelMessages(messages),
    topP: 0.1,
    temperature: 0.1,
    maxOutputTokens: 512,

    // AQUI ESTÁ O QUE FALTAVA:
    tools: {
      criar_cliente: tool({
        description: "Cria um novo cliente na plataforma Faunbi",
        inputSchema: z.object({
          nome: z.string().describe("Nome do cliente"),
          telefone: z.string().describe("Telefone do cliente é obrigatório"),
        }),
        execute: async ({ nome, telefone }) => {
          // Sua lógica para salvar no banco de dados aqui
          return { success: true, id: "123", nome }
        },
      }),
      buscar_cliente: tool({
        description: "Busca um cliente pelo nome",
        inputSchema: z.object({
          nome: z.string().describe("Nome ou parte do nome do cliente"),
        }),
        execute: async ({ nome }) => {
          // Sua lógica de busca
          return { encontrado: true, cliente: { nome, id: "123" } }
        },
      }),
      // ... adicione as outras ferramentas seguindo o mesmo padrão
    },

    // Dica para o Llama 8B na Groq: Force ele a executar a ferramenta se necessário,
    // ou deixe em 'auto' para ele decidir baseado no prompt do sistema.
    toolChoice: "auto",

    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: "minimal",
        },
      } satisfies GoogleLanguageModelOptions,
            groq: {
        reasoningFormat: "parsed",
        reasoningEffort: "low",
        parallelToolCalls: true, // Enable parallel function calling (default: true)
      } satisfies GroqLanguageModelOptions,
    },
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages: updatedMessages }) => {
      console.log(updatedMessages)
      const { workflowRunId } = await clientTrigger.trigger({
        url: `${BASE_URL}/api/save-chat`,
        body: {
          chatId: id,
          messages: updatedMessages,
          userId,
        },
        retries: 3,
        
      })

      console.log(workflowRunId)
    },
  })
}
