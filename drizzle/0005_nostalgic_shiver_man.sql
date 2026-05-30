CREATE TYPE "public"."order_status" AS ENUM('rascunho', 'orcamento_enviado', 'aprovado', 'recusado', 'em_execucao', 'finalizado', 'cancelado');--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"status" "order_status" DEFAULT 'rascunho' NOT NULL,
	"items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"total_amount" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"discount_amount" numeric(10, 2) DEFAULT '0.00',
	"observations" text,
	"valid_until" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_document_unique";--> statement-breakpoint
DROP INDEX "name_inventory_search_index";--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "type" SET DEFAULT 'PF';--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "document" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "inventory" ALTER COLUMN "embedding" SET DATA TYPE vector(384);--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "inventory" ADD COLUMN "ncm" text;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "order_userId_status_idx" ON "orders" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "order_customerId_idx" ON "orders" USING btree ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "customer_user_document_unique_idx" ON "customers" USING btree ("user_id","document");--> statement-breakpoint
CREATE INDEX "inventory_user_name_ts_idx" ON "inventory" USING gin (to_tsvector('portuguese', coalesce("name", '') || ' ' || coalesce("details", '')));