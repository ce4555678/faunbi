// import { numeric, pgTable, text } from "drizzle-orm/pg-core";
// import { orderTable } from "./order.db";
// import { nanoid } from "nanoid";

// export const orderItems = pgTable("order_items", {
//   id: text("id")
//   .$defaultFn(() => `ite_${nanoid()}`).primaryKey(),

//   orderId: text("order_id")
//     .notNull()
//     .references(() => orderTable.id, {
//       onDelete: "cascade",
//     }),

//   itemType: text("item_type").notNull(),

//   itemId: text("item_id"),

//   description: text("description"),

//   quantity: numeric("quantity", {
//     precision: 10,
//     scale: 2,
//   }),

//   unitPrice: numeric("unit_price", {
//     precision: 10,
//     scale: 2,
//   }),

//   totalPrice: numeric("total_price", {
//     precision: 10,
//     scale: 2,
//   }),
// });