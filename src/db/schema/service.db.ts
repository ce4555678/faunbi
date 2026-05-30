import {
  pgTable,
  text,
  varchar,
  timestamp,
  index,
  numeric,
} from "drizzle-orm/pg-core"
import { userTable } from "./users.db"
import { relations, sql } from "drizzle-orm"

export const serviceTable = pgTable(
  "services",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => sql`gen_random_uuid()`), // Ou UUIDv7 nativo do banco se disponível

    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    description: text().notNull(),
    details: text(),
    unit: varchar("unit", { length: 10 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    index("service_userId_idx").on(table.userId),
    index("name_service_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.description})`
    ),
  ]
)

export const serviceRelations = relations(serviceTable, ({ one }) => ({
  user: one(userTable, {
    fields: [serviceTable.userId],
    references: [userTable.id],
  }),
}))
