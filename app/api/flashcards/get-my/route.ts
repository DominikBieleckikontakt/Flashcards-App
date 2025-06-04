import { getCurrentSession } from "@/actions/cookies";
import { PAGE_SIZE } from "@/constants";
import { getFlashcards } from "@/lib/server/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const sort = url.searchParams.get("sort") || "Most Popular";
  const categories = url.searchParams.getAll("categories");
  const search = url.searchParams.get("search") || "";

  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const flashcards = await getFlashcards(
    page,
    PAGE_SIZE,
    user.id,
    true,
    categories,
    sort,
    search,
    false,
    true
  );

  return NextResponse.json(
    {
      flashcards,
    },
    { status: 200 }
  );
}
