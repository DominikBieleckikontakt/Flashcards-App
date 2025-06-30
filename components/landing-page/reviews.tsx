"use client";
import React from "react";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const Reviews = () => {
  return (
    <div className="my-36 space-y-5" id="reviews">
      <motion.div
        className="text-sm border border-secondary w-fit p-2 font-base text-dark/80 rounded-4xl z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Master Learning Effortlessly
      </motion.div>
      <div className="space-y-8 xl:space-y-10">
        <div className="space-y-5">
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="text-secondary">Reviews</span> that speaks for
            themselves
          </h2>
          <div className="text-dark/80">
            Discover What Our Community Is Saying: Real Stories, Honest
            Feedback, and the Successes That Inspire Us All
          </div>
        </div>
        <motion.div
          className="flex gap-8 max-xl:flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="xl:w-1/2 relative xl:flex-1 bg-[#f8f8f8] rounded-lg p-5 space-y-5 before:content-[''] before:bg-gradient-to-br before:from-secondary before:via-transparent before:to-transparent before:-z-10 before:absolute before:rounded-lg before:inset-0 before:-top-[1px] before:-left-[1px]">
            <Quote className="fill-dark/30 text-dark/30 stroke-dark/30" />
            <p className="text-dark/80 font-light italic">
              I’ve tried several flashcard apps before, but none have made
              studying as enjoyable and effective as this one. The AI-powered
              feature that creates flashcards from photos of my notes has saved
              me so much time—especially during exam season.
            </p>
            <div>
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-dark/80 text-sm">University Student</p>
            </div>
          </div>
          <div className="xl:w-1/2 relative xl:flex-1 bg-[#f8f8f8] rounded-lg p-5 space-y-5 before:content-[''] before:bg-gradient-to-tl before:from-secondary before:via-transparent before:to-transparent before:-z-10 before:absolute before:rounded-lg before:inset-0 before:-bottom-[1px] before:-right-[1px]">
            <Quote className="fill-dark/30 text-dark/30 stroke-dark/30" />
            <p className="text-dark/80 font-light italic">
              As both a language learner and a teacher, I’m always looking for
              tools that make memorization easier and more engaging. The app’s
              design is modern and distraction-free, which makes it perfect for
              focused study sessions.
            </p>
            <div>
              <h4 className="font-semibold">Tom Smith</h4>
              <p className="text-dark/80 text-sm">Language Learner & Teacher</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
