import { FlashcardsList } from "@/types";
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Link from "next/link";

const DashboardTable = ({
  flashcardsSets,
  isAuthor,
  title,
  icon,
}: {
  flashcardsSets: FlashcardsList[];
  isAuthor?: boolean;
  title?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-2xl font-light">{title}</h4>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-[100px] font-normal">Name</TableHead>
            <TableHead className="w-[100px] font-normal">Categories</TableHead>
            {isAuthor && (
              <TableHead className="w-[100px] font-normal">Author</TableHead>
            )}
            <TableHead className="w-[100px] font-normal">Privacy</TableHead>
            <TableHead className="w-[100px] font-normal">Flashcards</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flashcardsSets.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-light">
                <Link
                  href={`/flashcard-set/${item.set.id}/${item.set.title
                    .replaceAll(" ", "-")
                    .toLocaleLowerCase()}`}
                  className="text-secondary"
                >
                  {item.set.title}
                </Link>
              </TableCell>
              <TableCell className="font-light">
                {item.set.category?.join(", ") || "No categories"}
              </TableCell>
              {isAuthor && (
                <TableCell className="font-light">
                  {item.author.username}
                </TableCell>
              )}
              <TableCell className="font-light">
                {item.set.privacy[0].toUpperCase() + item.set.privacy.slice(1)}
              </TableCell>
              <TableCell className="font-light">
                {item.numberOfFlashcards}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardTable;
