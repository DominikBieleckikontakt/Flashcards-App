import { getCurrentSession } from "@/actions/cookies";
import { PAGE_SIZE } from "@/constants";
import { getFlashcards } from "@/lib/server/utils";
import { ViewType } from "@/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const sort = url.searchParams.get("sort") || "Most Popular";
  const categories = url.searchParams.getAll("categories");
  const search = url.searchParams.get("search") || "";
  const visibilityType =
    (url.searchParams.get("visibility") as ViewType) || "explore";

  const { user } = await getCurrentSession();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const flashcards = await getFlashcards(
    visibilityType,
    page,
    PAGE_SIZE,
    user.id,
    {
      categories: categories,
      sort: sort,
      search: search,
    }
  );

  return NextResponse.json(
    {
      flashcards,
    },
    { status: 200 }
  );
}
