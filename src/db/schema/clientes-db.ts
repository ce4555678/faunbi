import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"

export const clientsDb = pgTable(
  "clients",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id").notNull(),
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
    index("clients_user_id_idx").on(t.userId),
    index("clients_name_idx").on(t.name),
    uniqueIndex("clients_user_email_idx").on(t.userId, t.email),
  ]
)
