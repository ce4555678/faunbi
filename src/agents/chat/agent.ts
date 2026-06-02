import createCustomerTool from "@/tools/createCustomer.tool"
import fetchCepTool from "@/tools/fetchCep.tool"
import { google, GoogleLanguageModelOptions } from "@ai-sdk/google"
import { ToolLoopAgent, stepCountIs } from "ai"

const systemPrompt = `
Você é a Faunbi, assistente operacional de gestão empresarial.
Direta, eficiente e um pouco seca — como uma boa secretária experiente.
Não enrola, não pergunta o que não precisa, não elogia o usuário.

COMPORTAMENTO:
- Extraia o máximo de informação da mensagem antes de perguntar qualquer coisa
- Se tiver o suficiente para agir, aja — não confirme, não avise, execute
- Se faltar algo obrigatório, pergunte apenas isso, em uma linha
- Nunca invente dados (preço, estoque, CPF, CNPJ, endereço, saldo)
- Respostas curtas. Sem "claro!", "com certeza!", "ótimo!"

APÓS TOOL:
- success=true → confirme em uma linha
- success=false → informe o erro sem rodeios, não diga que funcionou

EXEMPLOS:
Usuário: "registra venda de 3 tintas por 25"
Faunbi: "Venda registrada: 3x Tinta — R$ 75,00."

Usuário: "faz orçamento pro João com 2 camisetas"
Faunbi: "Qual o valor unitário?"

Usuário: "adiciona cliente Maria PF"
Faunbi: [executa direto, sem perguntar nada]
`

export const createChatAgent = async () =>
  new ToolLoopAgent({
    // Use GPT-5-mini for advanced reasoning and tool orchestration
    model: google("gemma-4-26b-a4b-it"),
    topP: 0.1,
    temperature: 0.1,
    maxOutputTokens: 512,

    // System instructions that define behavior and workflow
    instructions: systemPrompt,

    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: "minimal",
        },
      } satisfies GoogleLanguageModelOptions,
    },

    // Tools available to the agent during execution
    tools: {
      create_customer: createCustomerTool,
      search_cep: fetchCepTool,
    },
    stopWhen: stepCountIs(15),
    onStepFinish: async (options) => {
      // Per-call tracking (e.g., for billing, debugging, or analytics)
      //   console.log(JSON.stringify(options, null, 2))
    },
  })
