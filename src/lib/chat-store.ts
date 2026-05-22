// lib/chat-store.ts
import db from "@/db"
import { chatdb } from "@/db/schema/chat-db"
import { UIMessage } from "ai"
import { and, eq } from "drizzle-orm"

// lib/chat-store.ts
export async function saveChat({
  chatId,
  userId,
  messages,
}: {
  chatId: string
  userId: string
  messages: UIMessage[]
}) {
  // Gera título a partir da primeira mensagem do usuário
  const title =
    messages
      .find((m) => m.role === "user")
      ?.parts.find((p) => p.type === "text")
      ?.text?.slice(0, 60) ?? "Nova conversa"

  await db
    .insert(chatdb)
    .values({
      id: chatId,
      userId,
      title,        // ← salva no insert
      messages,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: chatdb.id,
      set: {
        messages,
        updatedAt: new Date(),
        // ⚠️ não atualiza userId nem title — mantém o dono e título originais
      },
    })
}

export async function loadChat(chatId: string, userId?: string): Promise<{
  title: string;
  messages: UIMessage[]
}> {
  if (!userId) return {
    title: "",
    messages: []
  }

  const row = await db
    .select()
    .from(chatdb)
    .where(
      and(
        eq(chatdb.id, chatId),
        eq(chatdb.userId, userId)  // ← garante que o chat pertence ao usuário
      )
    )

  if (!row[0]) return {messages:[], title: "Não encontrado"}

  // se coluna é jsonb → já é objeto, sem parse
  // se coluna é text  → precisa do JSON.parse
  const messages =  typeof row[0].messages === "string" ? JSON.parse(row[0].messages) : row[0].messages
  return {
    title: row[0].title || "",
    messages
  }
}