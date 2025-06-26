"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-8 flex justify-between items-center bg-light/80 backdrop-blur-md px-8 md:px-36 xl:px-48 z-30 sticky top-0">
      <div className="flex items-center gap-6 lg:hidden z-20">
        <div className="space-y-[4px]" onClick={() => setIsOpen(!isOpen)}>
          <div className="h-[3px] w-[24px] bg-dark/70 rounded-2xl"></div>
          <div className="h-[3px] w-[24px] bg-dark/70 rounded-2xl"></div>
          <div className="h-[3px] w-[24px] bg-dark/70 rounded-2xl"></div>
        </div>
        <Link
          href="/dashboard"
          className="w-full h-full flex items-center px-8 py-3 text-sm text-light cursor-pointer hover:bg-secondary/95 bg-secondary rounded-4xl"
        >
          Get started
        </Link>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="top-24 left-8 absolute z-20"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col gap-4 text-dark/80 w-64 bg-light rounded-lg shadow-lg p-8 ">
                <Link href="#">About us</Link>
                <Link href="#">Features</Link>
                <Link href="#">Contact</Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden lg:block">
        <Link href="/" className="font-extralight text-2xl">
          Next
          <span className="font-normal bg-gradient-to-br from-primary to-secondary inline-block text-transparent bg-clip-text">
            Flash
          </span>
        </Link>
      </div>
      <div className="lg:hidden">
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
      </div>
      <div className="hidden lg:block">
        <ul className="flex gap-16 text-dark/80">
          <Link href="#">About us</Link>
          <Link href="#">Features</Link>
          <Link href="#">Contact</Link>
        </ul>
      </div>
      <div className="hidden lg:block">
        <Link
          href="/dashboard"
          className="w-full h-full flex items-center px-8 py-3 text-sm text-light cursor-pointer hover:bg-secondary/95 bg-secondary rounded-4xl"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
