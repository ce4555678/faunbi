import { index, jsonb, numeric, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { clientsDb } from "./clientes-db";

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
]);

export const orders = pgTable(
  'orders',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text('user_id').notNull(),
    clientId: text('client_id')
      .notNull()
      .references(() => clientsDb.id, { onDelete: 'restrict' }),
 
    title: text('title').notNull(),
    description: text('description'),
    status: orderStatusEnum('status').notNull().default('pending'),
 
    totalAmount: numeric('total_amount', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    dueDate: timestamp('due_date'),
    completedAt: timestamp('completed_at'),
    notes: text('notes'),
    itens: jsonb(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    index('orders_user_id_idx').on(t.userId),
    index('orders_client_id_idx').on(t.clientId),
    index('orders_status_idx').on(t.status),
    index('orders_due_date_idx').on(t.dueDate),
  ]
);