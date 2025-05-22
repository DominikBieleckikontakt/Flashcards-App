"use client";
import React from "react";

import { FolderSearch2, Globe, Plus, User } from "lucide-react";
import DashboardCard from "./dashboard-card";
import { useUserStore } from "@/stores/user";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-light">
        Hello{" "}
        <span className="font-semibold bg-gradient-to-r from-secondary via-secondary/80 to-primary text-transparent bg-clip-text">
          {user?.username || user?.firstname}!
        </span>{" "}
        Nice to see you again.
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard href="/dashboard/edit-profile" icon={<User />}>
          <h2 className="font-semibold text-xl mb-5">My Profile</h2>
          <p className="font-light">
            Manage your profile details, including your name, email, profile
            picture, and username.
          </p>
        </DashboardCard>

        <DashboardCard href="/flashcards/new" icon={<Plus />}>
          <h2 className="font-semibold text-xl mb-5">Create a Flashcard</h2>
          <p className="font-light">
            Add a new flashcard and share your knowledge with others.
          </p>
        </DashboardCard>

        <DashboardCard href="#" icon={<FolderSearch2 />}>
          <h2 className="font-semibold text-xl mb-5">Your Flashcards</h2>
          <p className="font-light">
            View and manage your flashcards. Edit, update privacy settings, or
            delete them anytime.
          </p>
        </DashboardCard>

        <DashboardCard href="#" icon={<FolderSearch2 />}>
          <h2 className="font-semibold text-xl mb-5">Favorites</h2>
          <p className="font-light">
            Browse all the flashcards you've marked as favorites.
          </p>
        </DashboardCard>

        <DashboardCard href="/flashcards/explore" icon={<Globe />}>
          <h2 className="font-semibold text-xl mb-5">Explore Flashcards</h2>
          <p className="font-light">
            Discover flashcards created by other users and expand your learning.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
