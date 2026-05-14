import {
  boolean,
  index,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { userDb } from "./user-db"
import { relations } from "drizzle-orm"

export const estoqueDb = pgTable(
  "estoque",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userDb.id, { onDelete: "cascade" }),
    image: text("image"),

    name: text("name").notNull(),
    description: text("description"),
    sku: text("sku"),
    unit: text("unit").notNull().default("un"), // un, kg, m, l, etc.

    quantity: numeric("quantity", { precision: 12, scale: 3 })
      .notNull()
      .default("0"),
    minQuantity: numeric("min_quantity", { precision: 12, scale: 3 })
      .notNull()
      .default("0"),

    costPrice: numeric("cost_price", { precision: 12, scale: 2 }).default("0"),
    salePrice: numeric("sale_price", { precision: 12, scale: 2 }).default("0"),

    active: boolean("active").notNull().default(true),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("estoque_user_id_idx").on(t.userId),
    index("estoque_name_idx").on(t.name),
    uniqueIndex("estoque_user_sku_idx").on(t.userId, t.sku),
  ]
)

export const estoqueRelations = relations(estoqueDb, ({ one }) => ({
  user: one(userDb, {
    fields: [estoqueDb.userId],
    references: [userDb.id],
  }),
}))
