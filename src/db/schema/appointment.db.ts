// import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
// import { sql } from 'drizzle-orm';
// import { userTable } from './users.db';

// export const appointmentTable = pgTable('appointments', {
//   id: text('id').primaryKey().$defaultFn(() => sql`gen_random_uuid()`),
//   userId: text("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
//   title: text('title').notNull(),
//   startTime: timestamp('start_time').notNull(),
//   endTime: timestamp('end_time').notNull(),
// }, (table) => [
//   // ÍNDICE DE INTERVALO: Otimiza cláusulas WHERE start_time BETWEEN X AND Y para o usuário isolado
//   index("appointments_schedule_idx").on(table.userId, table.startTime),
// ]);