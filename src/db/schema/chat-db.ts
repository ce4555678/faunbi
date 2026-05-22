// lib/db/schema.ts
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core"
import { generateId, UIMessage } from "ai"
import { userDb } from "./user-db"

// ── Chats ────────────────────────────────────────────────────────────────────
export const chatdb = pgTable(
  "chats",
  {
    id: text("id").primaryKey().$defaultFn(() => generateId()),
    userId: text("user_id")
      .notNull()
      .references(() => userDb.id, { onDelete: "cascade" }),
    title: text("title").default("Nova conversa"),                                          // gerado do 1º msg
    messages: jsonb("messages").$type<UIMessage[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("chats_user_id_idx").on(table.userId),                  // listagem rápida
    index("chats_updated_at_idx").on(table.updatedAt),            // ordenar por recente
  ]
)

// ── Types inferidos ──────────────────────────────────────────────────────────
export type Chat = typeof chatdb.$inferSelect
export type NewChat = typeof chatdb.$inferInsert