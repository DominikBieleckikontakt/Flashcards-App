CREATE TABLE "flashcard_set_flashcards" (
	"set_id" uuid NOT NULL,
	"flashcard_id" uuid NOT NULL,
	CONSTRAINT "flashcard_set_flashcards_set_id_flashcard_id_pk" PRIMARY KEY("set_id","flashcard_id")
);
--> statement-breakpoint
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_set_id_flashcard_sets_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcard_sets" ADD COLUMN "privacy" text NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcard_sets" ADD COLUMN "category" text[];--> statement-breakpoint
ALTER TABLE "flashcard_set_flashcards" ADD CONSTRAINT "flashcard_set_flashcards_set_id_flashcard_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."flashcard_sets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard_set_flashcards" ADD CONSTRAINT "flashcard_set_flashcards_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "set_id";