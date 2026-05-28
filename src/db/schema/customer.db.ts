import { pgTable, text, varchar, pgEnum, jsonb, timestamp, index } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid'; // Certifique-se de ter o pacote nanoid instalado
import { userTable } from './users.db';
import { relations, sql } from 'drizzle-orm';

// 1. Definição do Enum para Tipo de Pessoa
export const personTypeEnum = pgEnum('person_type', ['PF', 'PJ']);

// 2. Interfaces para a tipagem dos campos JSONB
export interface AddressType {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string; // Ex: "SP"
  zipCode: string;
}

export interface PhonesType {
  phone1?: {
    ddd: string;
    number: string;
  };
  phone2?: {
    ddd: string;
    number: string;
  };
}

// 3. Definição da Tabela de Clientes
export const customerTable = pgTable('customers', {
  // ID gerado via função nanoid no lado da aplicação (padrão do Drizzle para inserts)
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
    
  name: text('name').notNull(),
  
  type: personTypeEnum('type').notNull(),
  userId: text("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
  
  // CPF ou CNPJ (o tamanho 14 cobre os dígitos de ambos sem formatação)
  document: varchar('document', { length: 14 }).notNull().unique(),
  
  email: text('email'),
  
  // Telefones como JSONB com a tipagem estrita aplicada
  phones: jsonb('phones').$type<PhonesType>(),
  
  // Endereço como JSONB com a tipagem estrita aplicada
  address: jsonb('address').$type<AddressType>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
}, (table) => [
  index("customer_userId_idx").on(table.userId),
      index("name_customer_search_index").using(
        "gin",
        sql`to_tsvector('portuguese', ${table.name})`
      ),
]);

export const customerRelations = relations(customerTable, ({ one }) => ({
  user: one(userTable, {
    fields: [customerTable.userId],
    references: [userTable.id],
  }),
}));
