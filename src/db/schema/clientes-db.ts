import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { userDb } from "./user-db"

export const clientsDb = pgTable(
  "clients",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userDb.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    document: text("document"), // CPF / CNPJ
    notes: text("notes"),
    // Endereço
    address: text("address"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("clients_name_idx").on(t.name),
    uniqueIndex("clients_user_email_idx").on(t.userId, t.email),
  ]
)

export const clientRelations = relations(clientsDb, ({ one }) => ({
  user: one(userDb, {
    fields: [clientsDb.userId],
    references: [userDb.id],
  }),
}))
