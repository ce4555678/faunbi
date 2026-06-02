import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { userTable } from "./users.db"
import { relations } from "drizzle-orm"
import { nanoid } from "nanoid"
import { customerTable } from "./customer.db"
import { inventoryTable } from "./inventory.db"
import { serviceTable } from "./service.db"
import { orderTable } from "./order.db"

export const companyTable = pgTable(
  "company",
  {
    id: text("id")
      .$defaultFn(() => `emp_${nanoid()}`)
      .primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, {
        onDelete: "cascade",
      }),

    businessName: text("business_name").notNull(),

    tradeName: text("trade_name"),

    document: text("document"),

    email: text("email"),

    phone: text("phone"),

    address: text("address"),

    logo: text("logo"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at"),
  },
  (table) => [index("company_userId_idx").on(table.userId)]
)

export const companyRelations = relations(companyTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [companyTable.userId],
    references: [userTable.id],
  }),
  customers: many(customerTable),
  inventories: many(inventoryTable),
  services: many(serviceTable),
  orders: many(orderTable),
}))
