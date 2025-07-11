"use client";

import { useState, useEffect, useRef } from "react";

interface CategoryDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
  entries: string[];
}

export default function SelectDropdown({
  value,
  onChange,
  entries,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (category: string) => {
    const newValue = value.includes(category)
      ? value.filter((c) => c !== category)
      : [...value, category];
    onChange(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full inline-flex justify-between cursor-pointer items-center px-4 py-2 text-sm font-light text-gray-700 bg-white border border-border rounded-md hover:bg-gray-50"
      >
        {value.length < 1 ? "Select Categories" : value.join(", ")}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white ring-1 ring-border p-2 space-y-2 overflow-auto max-h-36">
          {entries.map((entry: string) => (
            <label key={entry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value.includes(entry)}
                onChange={() => toggleCategory(entry)}
                className="h-4 w-4 hue-rotate-90"
              />
              <span className="text-sm text-dark/70">{entry}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
