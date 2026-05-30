CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"details" text,
	"unit" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DROP INDEX "service_userId_idx";--> statement-breakpoint
DROP INDEX "name_service_search_index";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "type" "person_type" DEFAULT 'PF';--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "document" varchar(14);--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "phones" jsonb;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "address" jsonb;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "service_userId_idx" ON "services" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "name_service_search_index" ON "services" USING gin (to_tsvector('portuguese', "description"));--> statement-breakpoint
CREATE INDEX "customer_userId_idx" ON "customers" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "customer_user_document_unique_idx" ON "customers" USING btree ("user_id","document");--> statement-breakpoint
CREATE INDEX "name_customer_search_index" ON "customers" USING gin (to_tsvector('portuguese', "name"));--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "details";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "unit";