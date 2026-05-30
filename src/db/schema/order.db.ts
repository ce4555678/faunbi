import {
  pgTable,
  text,
  numeric,
  jsonb,
  pgEnum,
  timestamp,
  index,
} from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"
import { userTable } from "./users.db"
import { customerTable } from "./customer.db"

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
    id: text("id")
      .primaryKey()
      .$defaultFn(() => sql`gen_random_uuid()`),

    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),

    customerId: text("customer_id")
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
    index("order_userId_status_idx").on(table.userId, table.status),
    index("order_customerId_idx").on(table.customerId),
  ]
)

export const orderRelations = relations(orderTable, ({ one }) => ({
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
  customer: one(customerTable, {
    fields: [orderTable.customerId],
    references: [customerTable.id],
  }),
}))
