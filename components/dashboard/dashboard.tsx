"use client";
import React from "react";

import { useUserStore } from "@/stores/user";
import { FlashcardsList } from "@/types";
import DashboardTable from "./dashboard-table";
import { CalendarPlus, Eye } from "lucide-react";
import DashboardStats from "./dasboard-stats";

const Dashboard = ({
  lastViewed,
  lastCreated,
  allUserViews,
  allUsersSetsViews,
  allUserSetsNumber,
  allUserSetsFavorites,
  allUserFavorites,
}: {
  lastViewed: FlashcardsList[];
  lastCreated: FlashcardsList[];
  allUserViews: number;
  allUsersSetsViews: number;
  allUserSetsNumber: number;
  allUserSetsFavorites: number;
  allUserFavorites: number;
}) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="space-y-8 w-full">
      <h1 className="text-4xl font-light text-left w-full">
        Hello{" "}
        <span className="font-semibold bg-gradient-to-r from-secondary via-secondary/80 to-primary text-transparent bg-clip-text break-words">
          {user?.username || user?.firstname}!
        </span>{" "}
        Nice to see you again.
      </h1>
      <div className="grid 2xl:grid-cols-3 gap-8">
        <div className="rounded-lg border border-border p-5 2xl:col-span-2 overflow-x-auto">
          <DashboardTable
            flashcardsSets={lastViewed}
            isAuthor
            icon={
              <Eye
                size={40}
                className="stroke-2 text-dark/50 bg-primary/10 p-2 rounded-lg"
              />
            }
            title="Last viewed"
          />
        </div>
        <div className="rounded-lg border border-border space-y-5 p-5 2xl:row-span-2">
          <DashboardStats
            allUserViews={allUserViews}
            allUsersSetsViews={allUsersSetsViews}
            allUserSetsNumber={allUserSetsNumber}
            allUserSetsFavorites={allUserSetsFavorites}
            allUserFavorites={allUserFavorites}
          />
        </div>
        <div className="rounded-lg border border-border p-5 2xl:col-span-2 overflow-x-auto">
          <DashboardTable
            flashcardsSets={lastCreated}
            icon={
              <CalendarPlus
                size={40}
                className="stroke-2 text-dark/50 bg-primary/10 p-2 rounded-lg"
              />
            }
            title="Last created"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
