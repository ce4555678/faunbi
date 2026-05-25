import encryptText from "@/lib/encrypt-text"
import Fuse, { IFuseOptions } from "fuse.js"
import { NextResponse } from "next/server"
import { createLoader, parseAsString } from "nuqs/server"

type ChatRole = "user" | "assistant"

type TextPart = {
  type: "text"
  text: string
}

type ToolInvocationPart = {
  type: "tool-invocation"
  toolInvocation: {
    toolCallId: string
    toolName: string
    args: Record<string, unknown>
    state: "call" | "result" | string
    result?: Record<string, unknown>
  }
}

type ChatPart = TextPart | ToolInvocationPart

type ChatMessage = {
  id: string
  role: ChatRole
  parts: ChatPart[]
}

type SearchableMessage = {
  id: string
  role: ChatRole
  searchText: string
  llmText: string
  toolName: string
  toolArgsText: string
  toolResultText: string
}

type FuseOptionsWithTokenSearch<T> = IFuseOptions<T> & {
  useTokenSearch?: boolean
}

const conversa: ChatMessage[] = [
  {
    id: "msg_001",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Adicione o cliente João Pereira, telefone 15998123456",
      },
    ],
  },
  {
    id: "msg_002",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Cliente João Pereira adicionado com sucesso.",
      },
      {
        type: "tool-invocation",
        toolInvocation: {
          toolCallId: "call_001",
          toolName: "createCustomer",
          args: {
            name: "João Pereira",
            phone: "15998123456",
          },
          state: "result",
          result: {
            id: "cli_9a7f2c",
            name: "João Pereira",
            phone: "15998123456",
          },
        },
      },
    ],
  },
  {
    id: "msg_003",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Agora faz um orçamento pra ele com pintura de parede por R$450 e 2 latas de tinta branca de R$80 cada",
      },
    ],
  },
  {
    id: "msg_004",
    role: "assistant",
    parts: [
      {
        type: "tool-invocation",
        toolInvocation: {
          toolCallId: "call_002",
          toolName: "createQuote",
          args: {
            customerId: "cli_9a7f2c",
            customerName: "João Pereira",
            items: [
              {
                description: "Pintura de parede",
                quantity: 1,
                unitPrice: 450,
                total: 450,
              },
              {
                description: "Lata de tinta branca",
                quantity: 2,
                unitPrice: 80,
                total: 160,
              },
            ],
            total: 610,
          },
          state: "result",
          result: {
            id: "orc_3f8b21",
            customerId: "cli_9a7f2c",
            status: "draft",
            total: 610,
          },
        },
      },
      {
        type: "text",
        text: "Orçamento criado para João Pereira no valor total de R$610,00.",
      },
    ],
  },
]

export const paginateSearchParams = {
  query: parseAsString.withDefault(""),
}

export const loadSearchParams = createLoader(paginateSearchParams)

function formatCurrency(value?: unknown) {
  if (typeof value !== "number") return "valor não informado"

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function limitText(text: string, max = 700) {
  const clean = text.replace(/\s+/g, " ").trim()

  if (clean.length <= max) return clean

  return `${clean.slice(0, max)}...`
}

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function getQueryTokens(query: string) {
  const stopwords = new Set([
    "o",
    "a",
    "os",
    "as",
    "de",
    "da",
    "do",
    "das",
    "dos",
    "e",
    "em",
    "pra",
    "para",
    "com",
    "um",
    "uma",
  ])

  return normalizeText(query)
    .split(/\s+/)
    .map((token) => token.replace(/[^\p{L}\p{N}_-]/gu, ""))
    .filter((token) => token.length >= 2)
    .filter((token) => !stopwords.has(token))
}

function getString(value: unknown) {
  return typeof value === "string" ? value : undefined
}

function getNumber(value: unknown) {
  return typeof value === "number" ? value : undefined
}

function compactToolInvocation(part: ToolInvocationPart) {
  const { toolName, args, result } = part.toolInvocation

  if (toolName === "createCustomer") {
    const name =
      getString(result?.name) ?? getString(args.name) ?? "cliente sem nome"

    const phone = getString(result?.phone) ?? getString(args.phone)
    const id = getString(result?.id)

    return [
      `Cliente criado: ${name}.`,
      phone ? `Telefone: ${phone}.` : null,
      id ? `ID do cliente: ${id}.` : null,
    ]
      .filter(Boolean)
      .join(" ")
  }

  if (toolName === "createQuote") {
    const quoteId = getString(result?.id)
    const customerName = getString(args.customerName)
    const total = getNumber(result?.total) ?? getNumber(args.total)
    const status = getString(result?.status)

    const rawItems = Array.isArray(args.items) ? args.items : []

    const items = rawItems
      .map((item) => {
        if (!item || typeof item !== "object") return null

        const safeItem = item as Record<string, unknown>

        const description = getString(safeItem.description) ?? "Item"
        const quantity = getNumber(safeItem.quantity) ?? 1
        const unitPrice = getNumber(safeItem.unitPrice)

        const priceText =
          typeof unitPrice === "number"
            ? ` de ${formatCurrency(unitPrice)} cada`
            : ""

        return `${quantity}x ${description}${priceText}`
      })
      .filter(Boolean)
      .join("; ")

    return [
      `Orçamento criado${quoteId ? `: ${quoteId}` : ""}.`,
      customerName ? `Cliente: ${customerName}.` : null,
      items ? `Itens: ${items}.` : null,
      typeof total === "number" ? `Total: ${formatCurrency(total)}.` : null,
      status ? `Status: ${status}.` : null,
    ]
      .filter(Boolean)
      .join(" ")
  }

  return limitText(
    [
      `Tool executada: ${toolName}.`,
      args ? `Argumentos: ${JSON.stringify(args)}.` : null,
      result ? `Resultado: ${JSON.stringify(result)}.` : null,
    ]
      .filter(Boolean)
      .join(" "),
    500
  )
}

function extractTextParts(message: ChatMessage) {
  return message.parts
    .filter((part): part is TextPart => part.type === "text")
    .map((part) => part.text)
    .join(" ")
}

function extractToolParts(message: ChatMessage) {
  return message.parts.filter(
    (part): part is ToolInvocationPart => part.type === "tool-invocation"
  )
}

function messageToSearchable(message: ChatMessage): SearchableMessage {
  const text = extractTextParts(message)
  const toolParts = extractToolParts(message)

  const toolSummaries = toolParts.map(compactToolInvocation)

  const toolName = toolParts
    .map((part) => part.toolInvocation.toolName)
    .join(" ")

  const toolArgsText = toolParts
    .map((part) => JSON.stringify(part.toolInvocation.args))
    .join(" ")

  const toolResultText = toolParts
    .map((part) => JSON.stringify(part.toolInvocation.result ?? {}))
    .join(" ")

  const llmText = limitText(
    toolSummaries.length > 0 ? toolSummaries.join(" ") : text,
    900
  )

  const searchText = [
    text,
    ...toolSummaries,
    toolName,
    toolArgsText,
    toolResultText,
  ]
    .filter(Boolean)
    .join(" ")

  return {
    id: message.id,
    role: message.role,
    searchText,
    llmText,
    toolName,
    toolArgsText,
    toolResultText,
  }
}

const searchableConversation = conversa.map(messageToSearchable)

const fuseOptions: FuseOptionsWithTokenSearch<SearchableMessage> = {
  keys: [
    { name: "searchText", weight: 0.65 },
    { name: "toolArgsText", weight: 0.2 },
    { name: "toolResultText", weight: 0.1 },
    { name: "toolName", weight: 0.05 },
  ],
  useExtendedSearch: true,
  useTokenSearch: true,
  includeScore: true,
  includeMatches: false,
  ignoreDiacritics: true,
  ignoreLocation: true,
  threshold: 0.45,
  minMatchCharLength: 2,
}

const fuse = new Fuse(searchableConversation, fuseOptions)

function buildLLMContext(memories: SearchableMessage[]) {
  if (!memories.length) {
    return "Memória relevante:\nNenhuma memória relevante encontrada."
  }

  const lines = memories.map((memory) => {
    const role = memory.role === "user" ? "Usuário" : "Assistente"
    return `- ${role}: ${memory.llmText}`
  })

  return `Memória relevante:\n${lines.join("\n")}`
}

function searchByTokens(query: string) {
  const tokens = getQueryTokens(query)

  const ranked = new Map<
    string,
    {
      item: SearchableMessage
      matchedTokens: Set<string>
      bestScore: number
      totalScore: number
      hits: number
    }
  >()

  for (const token of tokens) {
    const tokenResults = fuse.search(token).slice(0, 10)

    for (const result of tokenResults) {
      const score = result.score ?? 1

      if (score > 0.75) continue

      const existing = ranked.get(result.item.id)

      if (!existing) {
        ranked.set(result.item.id, {
          item: result.item,
          matchedTokens: new Set([token]),
          bestScore: score,
          totalScore: score,
          hits: 1,
        })

        continue
      }

      existing.matchedTokens.add(token)
      existing.bestScore = Math.min(existing.bestScore, score)
      existing.totalScore += score
      existing.hits += 1
    }
  }

  return Array.from(ranked.values())
    .sort((a, b) => {
      const tokenDiff = b.matchedTokens.size - a.matchedTokens.size
      if (tokenDiff !== 0) return tokenDiff

      const avgA = a.totalScore / a.hits
      const avgB = b.totalScore / b.hits

      return avgA - avgB
    })
    .slice(0, 5)
    .map((entry) => entry.item)
}

function searchMemory(query: string) {
  const cleanQuery = query.trim()

  if (!cleanQuery) {
    return searchableConversation.slice(-6)
  }

  const directResults = fuse
    .search(cleanQuery)
    .filter((result) => (result.score ?? 1) < 0.75)
    .slice(0, 5)
    .map((result) => result.item)

  const tokenResults = searchByTokens(cleanQuery)

  const merged = new Map<string, SearchableMessage>()

  for (const item of [...directResults, ...tokenResults]) {
    merged.set(item.id, item)
  }

  return Array.from(merged.values()).slice(0, 5)
}

export const GET = async (request: Request) => {
  const { query } = loadSearchParams(request)

  const memories = searchMemory(query)
  const encrypt = encryptText.encrypt(
    "libsql://teste-ce4555678.aws-us-east-1.turso.io"
  )
  return NextResponse.json({
    encrypt,
    decrypt: encryptText.decrypt(encrypt),
  })
  // return NextResponse.json({
  //   query,
  //   count: memories.length,
  //   context: buildLLMContext(memories),
  //   memories: memories.map((memory) => ({
  //     id: memory.id,
  //     role: memory.role,
  //     text: memory.llmText,
  //   })),
  // })
}
