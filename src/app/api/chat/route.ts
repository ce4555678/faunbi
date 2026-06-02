import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  createAgentUIStreamResponse,
} from "ai"
import { GoogleLanguageModelOptions, google } from "@ai-sdk/google"
import { groq, GroqLanguageModelOptions } from "@ai-sdk/groq"
import z from "zod/v4"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { createChatAgent } from "@/agents/chat/agent"

const BodySchema = z.object({
  id: z
    .string()
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
    messages,
  })
  if (!isValid.success)
    return NextResponse.json(
      {
        error: "Chat inválido",
      },
      {
        status: 401,
      }
    )
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const agent = await createChatAgent()

  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
  })
  // const userId = session.user.id

  // const result = streamText({
  //   // model: groq("openai/gpt-oss-20b"),
  //   model: google("gemma-4-26b-a4b-it"),
  //   system: prompt,
  //   messages: await convertToModelMessages(messages),
  //   topP: 0.1,
  //   temperature: 0.1,
  //   maxOutputTokens: 512,

  //   // AQUI ESTÁ O QUE FALTAVA:
  //   tools: {
  //     criar_cliente: createCustomerTool,
  //     buscar_cliente: tool({
  //       description: "Busca um cliente pelo nome",
  //       inputSchema: z.object({
  //         nome: z.string().describe("Nome ou parte do nome do cliente"),
  //       }),
  //       execute: async ({ nome }) => {
  //         // Sua lógica de busca
  //         return { encontrado: true, cliente: { nome, id: "123" } }
  //       },
  //     }),
  //     // ... adicione as outras ferramentas seguindo o mesmo padrão
  //   },

  //   // Dica para o Llama 8B na Groq: Force ele a executar a ferramenta se necessário,
  //   // ou deixe em 'auto' para ele decidir baseado no prompt do sistema.
  //   toolChoice: "auto",

  //   providerOptions: {
  //     google: {
  //       thinkingConfig: {
  //         thinkingLevel: "minimal",
  //       },
  //     } satisfies GoogleLanguageModelOptions,
  //     groq: {
  //       reasoningFormat: "parsed",
  //       reasoningEffort: "low",
  //       parallelToolCalls: true, // Enable parallel function calling (default: true)
  //     } satisfies GroqLanguageModelOptions,
  //   },
  // })

  // return result.toUIMessageStreamResponse({
  //   originalMessages: messages,
  //   onFinish: async ({ messages: updatedMessages }) => {
  //     console.log(updatedMessages)
  //     const { workflowRunId } = await clientTrigger.trigger({
  //       url: `${BASE_URL}/api/save-chat`,
  //       body: {
  //         chatId: id,
  //         messages: updatedMessages,
  //         userId,
  //       },
  //       retries: 3,
  //     })

  //     console.log(workflowRunId)
  //   },
  // })
}
