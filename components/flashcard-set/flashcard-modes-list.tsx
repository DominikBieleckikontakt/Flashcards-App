import Link from "next/link";
import React from "react";

const FlashcardModeItem = ({
  label,
  description,
  href,
}: {
  label: string;
  description: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="border border-border rounded-lg w-full p-5 hover:border-secondary duration-300"
    >
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="font-light">{description}</p>
    </Link>
  );
};

const FlashcardModesList = () => {
  return (
    <div className="w-full space-y-5">
      <h3 className="w-full text-xl font-light">Choose mode</h3>
      <div className="grid lg:grid-cols-2 gap-5 w-full">
        <FlashcardModeItem
          label="Flashcards"
          description="Review cards one by one to learn at your own pace."
          href="#"
        />
        <FlashcardModeItem
          label="Test"
          description="Answer questions to check what you’ve learned."
          href="#"
        />
      </div>
    </div>
  );
};

export default FlashcardModesList;
