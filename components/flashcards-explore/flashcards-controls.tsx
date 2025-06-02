"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Button from "../button";
import FlashcardsControlsActions from "./flashcards-controls-actions";

import { Filter, SortDesc } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const sortByName = ["A-Z", "Z-A"];
const sortByPopularity = ["Most Popular", "Least Popular"];

const FlashcardsControls = ({
  toggleLoading,
}: {
  toggleLoading: (isLoading: boolean) => void;
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(
    "Most Popular"
  );
  const firstLoadRef = useRef(true);

  const buttonFilterRef = useRef<HTMLButtonElement>(null);
  const buttonSortRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // const currentCategories = searchParams.getAll("categories");

  useEffect(() => {
    if (firstLoadRef.current) {
      const initialCategories = searchParams.getAll("categories");
      const initialSort = searchParams.get("sort");

      setSelectedCategories(initialCategories);
      setSelectedSort(initialSort);
      firstLoadRef.current = false;
    }
  }, [searchParams]);

  const onSelectSort = (sort: string) => {
    toggleLoading(true);
    setSelectedSort(sort);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("sort");
    params.append("sort", sort);
    router.push(`/flashcards/explore?${params.toString()}`);
  };

  const onSelectCategory = (category: string) => {
    toggleLoading(true);
    const isSelected = selectedCategories.includes(category);
    const updatedCategories = isSelected
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    updatedCategories.forEach((cat) => params.append("categories", cat));
    router.push(`/flashcards/explore?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Button
          className="w-auto p-2 bg-transparent border border-border hover:bg-dark/5"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setIsFiltersVisible((prev) => !prev);
          }}
          ref={buttonFilterRef}
        >
          <Filter className="text-dark/60" />
        </Button>
        <AnimatePresence>
          {isFiltersVisible && (
            <FlashcardsControlsActions
              isVisible={isFiltersVisible}
              onClose={() => setIsFiltersVisible(false)}
              buttonRef={buttonFilterRef}
            >
              <div className="space-y-2">
                <h3 className="font-semibold">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category, index) => (
                    <div className="flex items-center gap-1" key={index}>
                      <Checkbox
                        id={`${category}`}
                        onClick={() => onSelectCategory(category)}
                        checked={selectedCategories.includes(category)}
                      />
                      <label htmlFor={`${category}`} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </FlashcardsControlsActions>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <Button
          className="w-auto p-2 bg-transparent border border-border hover:bg-dark/5"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setIsSortingVisible((prev) => !prev);
          }}
          ref={buttonSortRef}
        >
          <SortDesc className="text-dark/60" />
        </Button>
        <AnimatePresence>
          {isSortingVisible && (
            <FlashcardsControlsActions
              isVisible={isSortingVisible}
              onClose={() => setIsSortingVisible(false)}
              buttonRef={buttonSortRef}
            >
              <RadioGroup defaultValue={selectedSort || "Most Popular"}>
                <div className="space-y-2">
                  <h3 className="font-semibold">By name</h3>
                  <div className="space-y-1">
                    {sortByName.map((sortRule, index) => (
                      <div className="flex items-center gap-1" key={index}>
                        <RadioGroupItem
                          value={sortRule}
                          id={`${sortRule}`}
                          onClick={() => onSelectSort(sortRule)}
                        />
                        <label htmlFor={`${sortRule}`} className="text-sm">
                          {sortRule}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <h3 className="font-semibold">By popularity</h3>
                  <div className="space-y-1">
                    {sortByPopularity.map((sortRule, index) => (
                      <div className="flex items-center gap-1" key={index}>
                        <RadioGroupItem
                          value={sortRule}
                          id={`${sortRule}`}
                          onClick={() => onSelectSort(sortRule)}
                        />
                        <label htmlFor={`${sortRule}`} className="text-sm">
                          {sortRule}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            </FlashcardsControlsActions>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashcardsControls;
