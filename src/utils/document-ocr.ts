import { z } from "zod"
import { generateText, Output } from "ai"
import { google, type GoogleLanguageModelOptions } from "@ai-sdk/google"

const FiscalItemSchema = z.object({
  description: z.string().describe("Nome ou descrição detalhada do produto ou serviço como consta no documento."),
  quantity: z.number().nullable().optional().describe("Quantidade do item comprado."),
  unit: z.string().nullable().optional().describe("Unidade de medida do item (ex: UN, KG, LT)."),
  unitPrice: z.number().nullable().optional().describe("Valor unitário do item em reais."),
  totalPrice: z.number().nullable().optional().describe("Valor total do item (quantidade * valor unitário) em reais."),
  category: z.string().nullable().optional().describe("Categoria sugerida para o produto (ex: Alimentação, Eletrônicos, Transporte)."),
});

const FiscalDocumentSchema = z.object({
  type: z.enum(["nfe", "nfce", "cupom_fiscal", "recibo", "boleto", "desconhecido"])
    .describe("Tipo do documento fiscal identificado."),
  issuer: z.object({
    name: z.string().nullable().optional().describe("Razão social ou nome fantasia do emissor (prestador/vendedor/beneficiário)."),
    cnpj: z.string().nullable().optional().describe("CNPJ do emissor do documento (apenas números ou formatado)."),
  }).describe("Dados da empresa que emitiu o documento."),
  document: z.object({
    number: z.string().nullable().optional().describe("Número sequencial do documento fiscal ou número do documento/nosso número no boleto."),
    series: z.string().nullable().optional().describe("Série do documento fiscal (geralmente um número curto como 1, 2, 25)."),
    accessKey: z.string().nullable().optional().describe("Chave de acesso de 44 dígitos (comum em NF-e e NFC-e)."),
    issuedAt: z.string().nullable().optional().describe("Data e hora de emissão do documento ou data de processamento do boleto no formato ISO 8601 (AAAA-MM-DD)."),
    dueDate: z.string().nullable().optional().describe("Data de vencimento do documento (muito comum em boletos) no formato ISO 8601 (AAAA-MM-DD)."),
    barCode: z.string().nullable().optional().describe("Código de barras numérico do boleto (geralmente 44 dígitos)."),
    digitableLine: z.string().nullable().optional().describe("Linha digitável do boleto (geralmente 47 ou 48 dígitos, com ou sem pontos e espaços)."),
  }).describe("Informações de identificação do documento."),
  items: z.array(FiscalItemSchema).default([]).describe("Lista de produtos ou serviços listados no documento."),
  totals: z.object({
    subtotal: z.number().nullable().optional().describe("Soma dos valores dos itens antes de descontos ou taxas."),
    discount: z.number().nullable().optional().describe("Valor total de desconto aplicado ao documento."),
    tax: z.number().nullable().optional().describe("Valor total de impostos retidos ou informados."),
    total: z.number().describe("Valor total final pago/cobrado no documento."),
  }).describe("Valores monetários totais do documento."),
})

const fiscalOcrPrompt = `
Você é um extrator OCR especializado em documentos fiscais brasileiros, incluindo notas fiscais e boletos bancários.
Sua tarefa é ler a imagem ou PDF enviado e extrair os dados estruturados com máxima fidelidade, seguindo estritamente as descrições fornecidas no schema.

Atenção especial para Boletos:
- Identifique a linha digitável e o código de barras se visíveis.
- Capture a data de vencimento (dueDate) e o beneficiário (issuer.name).
`

export default async function documentOcr(documentUrl: string, type: "pdf" | "img") {
    const response = await fetch(documentUrl)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()

    const result = await generateText({
        model: google("gemma-4-26b-a4b-it"),
        system: fiscalOcrPrompt,
        output: Output.object({
            schema: FiscalDocumentSchema,
        }),
        temperature: 0.1,
        topP: 0.1,
        messages: [
            {
                role: "user",
                content: [
                    type === "img" ? {
                      type: "image",
                      image: arrayBuffer
                    } : {
                      type: "file",
                      data: arrayBuffer,
                      mediaType: "application/pdf"
                    }
                ]
            }
        ],
        providerOptions: {
          google: {
            thinkingConfig: {
              thinkingLevel: "minimal",
            },
          } satisfies GoogleLanguageModelOptions,
        },
    })

    return result.output
}