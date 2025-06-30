"use client";
import React from "react";
import Image from "next/image";

import { BrainCircuit, Brush, LibraryBig } from "lucide-react";
import { motion } from "framer-motion";

import dashboardMockup from "@/public/img/dashboard_mockup_2.webp";

export const FeatureCard = ({
  title,
  paragraph,
  icon,
  index,
}: {
  title: string;
  paragraph: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      className="p-5 rounded-lg shadow-lg border border-border flex gap-5 hover:border-secondary duration-300"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "linear",
      }}
      viewport={{ once: true }}
    >
      <div>
        <div className="bg-secondary rounded-full size-10 flex items-center justify-center p-2">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        <p className="text-dark/80 font-light">{paragraph}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <div className="my-36 space-y-5" id="features">
      <motion.div
        className="text-sm border border-secondary w-fit p-2 font-base text-dark/80 rounded-4xl z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Master Learning Effortlessly
      </motion.div>
      <div className="flex max-xl:flex-col justify-between gap-20">
        <div className="space-y-5 xl:w-1/2">
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="text-secondary">Unlock</span> Your Learning
            Potential with Powerful Flashcards
          </h2>
          <p className="text-dark/80">
            Accelerate your study sessions and boost retention with an intuitive
            flashcard app designed for learners of all ages. Effortlessly
            organize your knowledge, track your progress, and enjoy a smarter
            way to learn—anytime, anywhere.
          </p>
          <motion.div
            className=""
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
            viewport={{ once: true }}
          >
            <Image
              src={dashboardMockup}
              alt="Mockup of dasboard on mobile device"
              className="max-h-[40rem] max-w-full object-contain"
            />
          </motion.div>
        </div>
        <div className="xl:w-1/2 flex-1">
          <div className="space-y-8">
            <FeatureCard
              title="Create Custom Flashcards"
              paragraph="Design your own cards with text and images. Tailor your learning experience to your needs."
              icon={<Brush className="text-light size-8" />}
              index={0}
            />
            <FeatureCard
              title="Study Anywhere, Anytime"
              paragraph="Access your flashcards on all devices—study at home, on the go, or anywhere you like."
              icon={<LibraryBig className="text-light size-8" />}
              index={1}
            />
            <FeatureCard
              title="AI-Powered Flashcard Creation from Photos"
              paragraph="Simply snap a picture of your notes or textbook—our advanced AI instantly transforms them into ready-to-use flashcards. Save time and focus on learning, not formatting."
              icon={<BrainCircuit className="text-light size-8" />}
              index={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
