import {
  pgTable,
  text,
  varchar,
  numeric,
  jsonb,
  index,
  vector,
  timestamp,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { nanoid } from "nanoid"
import { userTable } from "./users.db"

// 1. Tipagem para o campo JSONB de precificação
export interface PricingType {
  costPrice: string // Preço de custo (salvo como string para evitar perda de precisão numérica em JS)
  profitMarginPct: number // Margem de lucro em %
  markupPct: number // Markup em %
}

// 3. Definição da Tabela de Estoque (Inventory)
export const inventoryTable = pgTable(
  "inventory",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),

    name: text("name").notNull(),

    details: text("details"), // Opcional

    barCode: varchar("bar_code", { length: 128 }),

    internalCode: varchar("internal_code", { length: 64 }),

    price: numeric("price", { precision: 10, scale: 2 }).notNull(),

    // Unidade de medida (pç, kg, lt, cx, etc.)
    unit: varchar("unit", { length: 10 }).notNull(),

    // Objeto JSONB contendo custo, margem% e markup% com tipagem estrita
    pricing: jsonb("pricing").$type<PricingType>().notNull(),

    brand: varchar("brand", { length: 100 }), // Opcional

    // Coluna para armazenamento do Embedding (Vetor)
    embedding: vector({
      dimensions: 1024,
    }),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),

    // Coluna gerada (Generated Column) para Full-Text Search combinando nome e detalhes
    // Usamos o dicionário 'portuguese' para ignorar stop-words em português (como "de", "com", "para")
  },
  (table) => [
    index("embedding_inventory_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
    index("name_inventory_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.name})`
    ),
    index("inventory_userId_idx").on(table.userId),
  ]
)

export const inventoryRelations = relations(inventoryTable, ({ one }) => ({
  user: one(userTable, {
    fields: [inventoryTable.userId],
    references: [userTable.id],
  }),
}))
