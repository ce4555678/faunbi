import {
  pgTable,
  text,
  varchar,
  timestamp,
  index,
  numeric,
  bigint,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { companyTable } from "./company.db"

export const serviceTable = pgTable(
  "services",
  {
    id: bigint({
      mode: "number",
    })
      .primaryKey()
      .generatedAlwaysAsIdentity(), // Ou UUIDv7 nativo do banco se disponível

    companyId: text("company_id")
      .notNull()
      .references(() => companyTable.id, { onDelete: "cascade" }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    description: text().notNull(),
    details: text(),
    unit: varchar("unit", { length: 10 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    index("service_userId_idx").on(table.companyId),
    index("name_service_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.description})`
    ),
  ]
)

export const serviceRelations = relations(serviceTable, ({ one }) => ({
  companie: one(companyTable, {
    fields: [serviceTable.companyId],
    references: [companyTable.id],
  }),
}))
