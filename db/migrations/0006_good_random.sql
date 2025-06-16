CREATE TABLE "flashcard_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"set_id" uuid NOT NULL,
	"viewed_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "flashcard_views" ADD CONSTRAINT "flashcard_views_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard_views" ADD CONSTRAINT "flashcard_views_set_id_flashcard_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."flashcard_sets"("id") ON DELETE cascade ON UPDATE no action;