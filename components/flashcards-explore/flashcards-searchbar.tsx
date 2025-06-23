"use client";
import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import Input from "../ui/input";
import { Search } from "lucide-react";

const FlashcardsSearchbar = ({
  changeQuery,
  toggleLoading,
}: {
  changeQuery: (value: any) => void;
  toggleLoading: (isLoading: boolean) => void;
}) => {
  const searchParams = useSearchParams();
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (firstLoadRef.current) {
      const initialQuery = searchParams.get("search") || "";
      changeQuery(initialQuery);
      firstLoadRef.current = false;
    } else {
      const currentQuery = searchParams.get("search") || "";
      changeQuery(currentQuery);
    }
  }, [searchParams]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // toggleLoading(true);
    const query = e.target.value.trim();
    changeQuery(query);

    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    window.history.replaceState(
      {},
      "",
      `/flashcards/explore?${params.toString()}`
    );
    // toggleLoading(false);
  };

  return (
    <div className="relative max-sm:w-full">
      <Input
        placeholder="Search flashcards..."
        type="text"
        inputClassnames="border border-border focus:border-secondary active:border-secondary max-sm:w-full md:w-96"
        styles=""
        icon={<Search className="absolute text-dark/50" />}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default FlashcardsSearchbar;
