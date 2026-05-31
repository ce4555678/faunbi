import {
  pgTable,
  text,
  varchar,
  numeric,
  jsonb,
  index,
  vector,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { companieTable } from "./companie.db"

export interface PricingType {
  costPrice: string
  profitMarginPct: number
  markupPct: number
}

export const inventoryTable = pgTable(
  "inventory",
  {
    id: bigint({
      mode: "number",
    })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    details: text("details"),
    image: text(),
    barCode: varchar("bar_code", { length: 128 }),
    internalCode: varchar("internal_code", { length: 64 }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    unit: varchar("unit", { length: 10 }).notNull(),
    pricing: jsonb("pricing").$type<PricingType>().notNull(),
    brand: varchar("brand", { length: 100 }),
    ncm: text(),

    // REDUÇÃO DE DIMENSÕES: Mudado para 384 para aceitar modelos ultra-baratos e rápidos
    // Se mantiver OpenAI reduza no payload de envio para 512 ou use 1536. Nunca 1024 sem motivo claro.
    embedding: vector({ dimensions: 384 }),

    enterpriseId: text("enterprise_id")
      .notNull()
      .references(() => companieTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    // HNSW Otimizado: O cálculo do operador de cosseno deve bater exatamente com as dimensões reais
    index("embedding_inventory_index").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
    // Índice composto para queries comuns: Filtrar por usuário e buscar por texto
    index("inventory_user_name_details_ts_idx").using(
      "gin",
      sql`to_tsvector('portuguese', coalesce(${table.name}, '') || ' ' || coalesce(${table.details}, ''))`
    ),
    index("inventory_enterpriseId_idx").on(table.enterpriseId),
  ]
)

export const inventoryRelations = relations(inventoryTable, ({ one }) => ({
  companie: one(companieTable, {
    fields: [inventoryTable.enterpriseId],
    references: [companieTable.id],
  }),
}))
