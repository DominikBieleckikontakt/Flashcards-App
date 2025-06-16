import { getCurrentSession } from "@/actions/cookies";
import Dashboard from "@/components/profile-settings/dashboard";
import {
  getAllUserSetsViews,
  getAllUserViews,
  getCountOfAllUserFavorites,
  getCountOfAllUserSetsFavorites,
  getCountOfUserSets,
  getFlashcards,
} from "@/lib/server/utils";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/login");
  }

  const userId = user.id;

  const lastViewed = await getFlashcards(
    1,
    4,
    userId,
    undefined,
    undefined,
    "Newest",
    undefined,
    false,
    false
  );

  const lastCreated = await getFlashcards(
    1,
    4,
    userId,
    undefined,
    undefined,
    "Newest",
    undefined,
    false,
    true
  );

  const allUserViews = await getAllUserViews(userId);
  const allUsersSetsViews = await getAllUserSetsViews(userId);
  const allUserSetsNumber = await getCountOfUserSets(userId);
  const allUserSetsFavorites = await getCountOfAllUserSetsFavorites(userId);
  const allUserFavorites = await getCountOfAllUserFavorites(userId);

  return (
    <main className="flex justify-center items-center flex-col mx-5 2xl:mx-32 my-24 gap-10">
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
