"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FlashcardsControlsActions = ({
  isVisible,
  onClose,
  buttonRef,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  children?: React.ReactNode;
}) => {
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isVisible) return;
      const target = event.target as Node;

      if (
        controlsRef.current &&
        !controlsRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  return (
    <motion.div
      className={`absolute z-10 bg-white px-3 py-4 min-w-48 border-border border shadow mt-2 rounded-md origin-top-left`}
      ref={controlsRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FlashcardsControlsActions;
