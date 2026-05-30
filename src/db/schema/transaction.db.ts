// import {
//   pgTable,
//   text,
//   numeric,
//   pgEnum,
//   timestamp,
//   index,
// } from "drizzle-orm/pg-core"
// import { sql } from "drizzle-orm"
// import { userTable } from "./users.db"

// export const transactionTypeEnum = pgEnum("transaction_type", [
//   "entrada",
//   "saida",
// ])

// export const transactionTable = pgTable(
//   "transactions",
//   {
//     id: text("id")
//       .primaryKey()
//       .$defaultFn(() => sql`gen_random_uuid()`),
//     userId: text("user_id")
//       .notNull()
//       .references(() => userTable.id, { onDelete: "cascade" }),
//     type: transactionTypeEnum("type").notNull(),
//     amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
//     description: text("description").notNull(),
//     paidAt: timestamp("paid_at").defaultNow().notNull(),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at"),
//   },
//   (table) => [
//     // ÍNDICE COMPREENSIVO DE SÉRIE TEMPORAL OPERACIONAL:
//     // Permite que o Postgres busque por Usuário, filtre por tipo e ordene por data INSTANTANEAMENTE
//     index("transactions_analytics_idx").on(
//       table.userId,
//       table.type,
//       table.paidAt
//     ),
//   ]
// )
