CREATE TYPE "public"."person_type" AS ENUM('PF', 'PJ');--> statement-breakpoint
CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "person_type" NOT NULL,
	"user_id" text NOT NULL,
	"document" varchar(14) NOT NULL,
	"email" text,
	"phones" jsonb,
	"address" jsonb,
	CONSTRAINT "customers_document_unique" UNIQUE("document")
);
--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;