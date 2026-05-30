import { pgTable, text, varchar, pgEnum, jsonb, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { userTable } from './users.db';
import { relations, sql } from 'drizzle-orm';
import { orderTable } from './order.db';

export const personTypeEnum = pgEnum('person_type', ['PF', 'PJ']);

export interface AddressType {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string; 
  zipCode: string;
}

export interface PhonesType {
  phone1?: { ddd: string; number: string; };
  phone2?: { ddd: string; number: string; };
}

export const customerTable = pgTable('customers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => sql`gen_random_uuid()`), // Ou UUIDv7 nativo do banco se disponível
    
  name: text('name').notNull(),
  
  // Removido o notNull para evitar fricção no onboarding via WhatsApp
  type: personTypeEnum('type').default('PF'), 
  
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  
  // O documento NÃO pode ser notNull global e o Unique deve ser composto por Tenant/User
  document: varchar('document', { length: 14 }), 
  
  email: text('email'),
  phones: jsonb('phones').$type<PhonesType>(),
  address: jsonb('address').$type<AddressType>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
}, (table) => [
  // ÍNDICE CRÍTICO: Isola a busca de clientes por usuário primeiro
  index("customer_userId_idx").on(table.userId),
  
  // Correção do UNIQUE: O cliente é único DENTRO do universo daquele profissional
  uniqueIndex("customer_user_document_unique_idx").on(table.userId, table.document),
  
  // Busca textual otimizada para o autocomplete no WhatsApp
  index("name_customer_search_index").using(
    "gin",
    sql`to_tsvector('portuguese', ${table.name})`
  ),
]);

export const customerRelations = relations(customerTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [customerTable.userId],
    references: [userTable.id],
  }),
  orders: many(orderTable)
}));