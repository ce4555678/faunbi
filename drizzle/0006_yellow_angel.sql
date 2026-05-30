DROP INDEX "customer_userId_idx";--> statement-breakpoint
DROP INDEX "customer_user_document_unique_idx";--> statement-breakpoint
DROP INDEX "name_customer_search_index";--> statement-breakpoint
DROP INDEX "inventory_user_name_ts_idx";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "price" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "details" text;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "unit" varchar(10) NOT NULL;--> statement-breakpoint
CREATE INDEX "service_userId_idx" ON "customers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "name_service_search_index" ON "customers" USING gin (to_tsvector('portuguese', "description"));--> statement-breakpoint
CREATE INDEX "inventory_user_name_details_ts_idx" ON "inventory" USING gin (to_tsvector('portuguese', coalesce("name", '') || ' ' || coalesce("details", '')));--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "document";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "phones";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "address";