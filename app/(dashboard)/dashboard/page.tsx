import { getCurrentSession } from "@/actions/cookies";
import Dashboard from "@/components/dashboard/dashboard";
import {
  getAllUserSetsViews,
  getAllUserViews,
  getCountOfAllUserFavorites,
  getCountOfAllUserSetsFavorites,
  getCountOfUserSets,
  getFlashcards,
  getLastViewedSets,
} from "@/lib/server/utils";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const userId = user.id;

  const lastViewed = await getLastViewedSets(userId, 4);

  // const lastCreated = await getFlashcards(
  //   1,
  //   4,
  //   userId,
  //   undefined,
  //   undefined,
  //   "Newest",
  //   undefined,
  //   false,
  //   true
  // );

  const lastCreated = await getFlashcards("my-flashcards", 1, 4, user.id, {
    sort: "Newest",
  });

  const allUserViews = await getAllUserViews(userId);
  const allUsersSetsViews = await getAllUserSetsViews(userId);
  const allUserSetsNumber = await getCountOfUserSets(userId);
  const allUserSetsFavorites = await getCountOfAllUserSetsFavorites(userId);
  const allUserFavorites = await getCountOfAllUserFavorites(userId);

  return (
    <main className="flex justify-center items-center flex-col mx-5 2xl:mx-32 my-24 gap-10 h-full">
      <Dashboard
        lastViewed={lastViewed}
        lastCreated={lastCreated}
        allUserViews={allUserViews}
        allUsersSetsViews={allUsersSetsViews}
        allUserSetsNumber={allUserSetsNumber}
        allUserSetsFavorites={allUserSetsFavorites}
        allUserFavorites={allUserFavorites}
      />
    </main>
  );
};

export default SettingsPage;
