import { pgTable, text, varchar, pgEnum, jsonb, timestamp, index, uniqueIndex, integer, bigint } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { orderTable } from './order.db';
import { companieTable } from './companie.db';

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
  id: bigint({
    mode: "number"
  }).primaryKey().generatedAlwaysAsIdentity(),
    
  name: text('name').notNull(),
  
  // Removido o notNull para evitar fricção no onboarding via WhatsApp
  type: personTypeEnum('type').default('PF'), 
  
  enterpriseId: text("enterprise_id")
    .notNull()
    .references(() => companieTable.id, { onDelete: "cascade" }),
  
  // O documento NÃO pode ser notNull global e o Unique deve ser composto por Tenant/User
  document: varchar('document', { length: 14 }), 
  
  email: text('email'),
  phones: jsonb('phones').$type<PhonesType>(),
  address: jsonb('address').$type<AddressType>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
}, (table) => [
  // ÍNDICE CRÍTICO: Isola a busca de clientes por usuário primeiro
  index("customer_enterpriseId_idx").on(table.enterpriseId),
  
  // Correção do UNIQUE: O cliente é único DENTRO do universo daquele profissional
  uniqueIndex("customer_enterprise_document_unique_idx").on(table.enterpriseId, table.document),
  
  // Busca textual otimizada para o autocomplete no WhatsApp
  index("name_customer_search_index").using(
    "gin",
    sql`to_tsvector('portuguese', ${table.name})`
  ),
]);

export const customerRelations = relations(customerTable, ({ one, many }) => ({
  companie: one(companieTable, {
    fields: [customerTable.enterpriseId],
    references: [companieTable.id],
  }),
  orders: many(orderTable)
}));