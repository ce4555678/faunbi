import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { accountTable } from "./account.db";
import { customerTable } from "./customer.db";
import { inventoryTable } from "./inventory.db";
import { orderTable } from "./order.db";
import { serviceTable } from "./service.db";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const userRelations = relations(userTable, ({ many }) => ({
  accounts: many(accountTable),
  customers: many(customerTable),
  inventories: many(inventoryTable),
  orders: many(orderTable),
  services: many(serviceTable)
}));