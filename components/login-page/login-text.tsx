import React from "react";

import { Heart, Infinity, User } from "lucide-react";

const LoginText = () => {
  return (
    <div className="text-dark/80 z-10 space-y-10 p-8 rounded-3xl max-xl:hidden border border-border">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">FlashApp</h1>
        <p className="text-base">
          Welcome back! Log in to access your account.
        </p>
      </div>
      <ul className="space-y-8">
        <li>
          <Infinity className="size-8 text-secondary" />
          <h2 className="font-semibold text-lg">
            Create unlimited amount flashcards.
          </h2>
          <p className="text-dark/70">
            Easily make and organize as many flashcards as you need.
          </p>
        </li>
        <li>
          <Heart className="size-8 text-secondary" />
          <h2 className="font-semibold text-lg">
            Add other users' flashcards to your favorites!
          </h2>
          <p className="text-dark/70">
            Save other users' flashcards for quick access anytime.
          </p>
        </li>
        <li>
          <User className="size-8 text-secondary" />
          <h2 className="font-semibold text-lg">
            Browse other users' flashcards.
          </h2>
          <p className="text-dark/70">
            Explore a wide collection of flashcards shared by the community.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default LoginText;
