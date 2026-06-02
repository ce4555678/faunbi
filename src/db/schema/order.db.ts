import {
  pgTable,
  text,
  numeric,
  jsonb,
  pgEnum,
  timestamp,
  index,
  bigint,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { customerTable } from "./customer.db"
import { companyTable } from "./company.db"

// O ciclo de vida do dinheiro do autônomo
export const orderStatusEnum = pgEnum("order_status", [
  "rascunho",
  "orcamento_enviado",
  "aprovado",
  "recusado",
  "em_execucao",
  "finalizado",
  "cancelado",
])

export interface OrderItemType {
  id?: string
  description: string
  quantity: number
  unitPrice: string // Salvo como string para precisão decimal
  totalPrice: string
  isService: boolean // Diferenciar Mão de Obra de Material
}

export const orderTable = pgTable(
  "orders",
  {
    id: bigint({
      mode: "number",
    })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    companyId: text("company_id")
      .notNull()
      .references(() => companyTable.id, { onDelete: "cascade" }),

    customerId: bigint("customer_id", {
      mode: "number",
    })
      .notNull()
      .references(() => customerTable.id, { onDelete: "cascade" }),

    status: orderStatusEnum("status").default("rascunho").notNull(),

    // Itens do orçamento estruturados de forma flexível
    items: jsonb("items").$type<OrderItemType[]>().default([]).notNull(),

    totalAmount: numeric("total_amount", { precision: 10, scale: 2 })
      .default("0.00")
      .notNull(),
    discountAmount: numeric("discount_amount", {
      precision: 10,
      scale: 2,
    }).default("0.00"),

    observations: text("observations"), // Ex: "Levar escada de 8 metros"

    validUntil: timestamp("valid_until"), // Validade do orçamento
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    index("order_companyId_status_idx").on(table.companyId, table.status),
    index("order_customerId_idx").on(table.customerId),
  ]
)

export const orderRelations = relations(orderTable, ({ one }) => ({
  companie: one(companyTable, {
    fields: [orderTable.companyId],
    references: [companyTable.id],
  }),
  customer: one(customerTable, {
    fields: [orderTable.customerId],
    references: [customerTable.id],
  }),
}))
