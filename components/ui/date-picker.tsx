"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import CustomCaption from "@/components/ui/custom-caption";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerProps } from "@/types";

const DatePicker = ({ value, onChange, name }: DatePickerProps) => {
  const handleSelect = (selectedDate: Date | undefined) => {
    if (onChange) onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <button
          className={cn(
            "backdrop-blur-sm w-full rounded-md flex items-center p-2 duration-300 outline-0 border-2 border-transparent bg-dark/5 text-dark text-left justify-start",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 min-w-[300px]">
        <Calendar
          mode="single"
          onSelect={handleSelect}
          fromYear={1900}
          toYear={new Date().getFullYear()}
          selected={value}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          components={{
            Caption: CustomCaption,
          }}
          className="w-full flex justify-center"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
