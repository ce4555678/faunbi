CREATE TABLE "inventory" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"details" text,
	"bar_code" varchar(128),
	"internal_code" varchar(64),
	"price" numeric(10, 2) NOT NULL,
	"unit" varchar(10) NOT NULL,
	"pricing" jsonb NOT NULL,
	"brand" varchar(100),
	"embedding" vector(1024),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "embedding_inventory_index" ON "inventory" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "name_inventory_search_index" ON "inventory" USING gin (to_tsvector('portuguese', "name"));--> statement-breakpoint
CREATE INDEX "inventory_userId_idx" ON "inventory" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "customer_userId_idx" ON "customers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "name_customer_search_index" ON "customers" USING gin (to_tsvector('portuguese', "name"));