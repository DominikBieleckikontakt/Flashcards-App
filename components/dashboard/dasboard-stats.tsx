import {
  ChartArea,
  EyeIcon,
  ScanEye,
  Star,
  StarHalf,
  SwatchBook,
} from "lucide-react";
import React from "react";

const DashboardSingleStat = ({
  title,
  icon,
  value,
  isTimes,
  isFlashcards,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
  isTimes?: boolean;
  isFlashcards?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        {/* <ScanEye className="stroke-1 rounded-full" size={30} /> */}
        {icon}
        <p className="font-light">{title}:</p>
      </div>
      <p className="font-semibold text-secondary text-right">
        {value} {isTimes && "times"}{" "}
        {isFlashcards ? (value === 1 ? "flashcard set" : "flashcard sets") : ""}
      </p>
    </div>
  );
};

const DashboardStats = ({
  allUserViews,
  allUsersSetsViews,
  allUserSetsNumber,
  allUserSetsFavorites,
  allUserFavorites,
}: {
  allUserViews: number;
  allUsersSetsViews: number;
  allUserSetsNumber: number;
  allUserSetsFavorites: number;
  allUserFavorites: number;
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <ChartArea
          size={40}
          className="stroke-2 text-dark/50 bg-primary/10 p-2 rounded-lg"
        />
        <h4 className="text-2xl font-light">Your stats</h4>
      </div>
      <div className="space-y-5">
        <DashboardSingleStat
          title="You already viewed"
          value={allUserViews}
          icon={<ScanEye className="stroke-1 rounded-full" size={30} />}
          isFlashcards
        />
        <DashboardSingleStat
          title="Your sets were viewed"
          value={allUsersSetsViews}
          icon={<EyeIcon className="stroke-1 rounded-full" size={30} />}
          isTimes
        />
        <DashboardSingleStat
          title="You've already created"
          value={allUserSetsNumber}
          icon={<SwatchBook className="stroke-1 rounded-full" size={30} />}
          isFlashcards
        />
        <DashboardSingleStat
          title="Your sets were added to favorites"
          value={allUserSetsFavorites}
          icon={<Star className="stroke-1 rounded-full" size={30} />}
          isTimes
        />
        <DashboardSingleStat
          title="Number of your favorites"
          value={allUserFavorites}
          icon={<StarHalf className="stroke-1 rounded-full" size={30} />}
        />
      </div>
    </>
  );
};

export default DashboardStats;
