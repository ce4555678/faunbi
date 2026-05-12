CREATE TABLE "stock_items" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"sku" text,
	"unit" text DEFAULT 'un' NOT NULL,
	"quantity" numeric(12, 3) DEFAULT '0' NOT NULL,
	"min_quantity" numeric(12, 3) DEFAULT '0' NOT NULL,
	"cost_price" numeric(12, 2) DEFAULT '0',
	"sale_price" numeric(12, 2) DEFAULT '0',
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "stock_items_user_id_idx" ON "stock_items" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "stock_items_name_idx" ON "stock_items" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "stock_items_user_sku_idx" ON "stock_items" USING btree ("user_id","sku");