"use client";
import React from "react";
import { CalendarPlus, Eye } from "lucide-react";
import { motion } from "framer-motion";

import { useUserStore } from "@/stores/user";
import { FlashcardsList } from "@/types";

import DashboardTable from "./dashboard-table";
import DashboardStats from "./dasboard-stats";
import Loader from "../loader";

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
    <div className="space-y-8 w-full h-full">
      {user && (
        <>
          <h1 className="text-4xl font-light text-left w-full">
            Hello{" "}
            <span className="font-semibold bg-gradient-to-r from-secondary via-secondary/80 to-primary text-transparent bg-clip-text break-words">
              {user?.username || user?.firstname}!
            </span>{" "}
            Nice to see you again.
          </h1>
          <div className="grid 2xl:grid-cols-3 gap-8">
            <motion.div
              className="rounded-lg border border-border p-5 2xl:col-span-2 overflow-x-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
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
            </motion.div>
            <motion.div
              className="rounded-lg border border-border space-y-5 p-5 2xl:row-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <DashboardStats
                allUserViews={allUserViews}
                allUsersSetsViews={allUsersSetsViews}
                allUserSetsNumber={allUserSetsNumber}
                allUserSetsFavorites={allUserSetsFavorites}
                allUserFavorites={allUserFavorites}
              />
            </motion.div>
            <motion.div
              className="rounded-lg border border-border p-5 2xl:col-span-2 overflow-x-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
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
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
