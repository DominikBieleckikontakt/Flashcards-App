import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full py-16 border-t-border/50 border-t px-8 md:px-36 xl:px-48">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 2xl:gap-16">
        <div className="space-y-2">
          <p className="font-extralight text-2xl">
            Next
            <span className="font-normal bg-gradient-to-br from-primary to-secondary inline-block text-transparent bg-clip-text">
              Flash
            </span>
          </p>
          <p className=" text-dark/80">
            Effortlessly create, organize, and study flashcards—anytime,
            anywhere. Boost your learning with smart reviews and interactive
            features.
          </p>
        </div>
        <div>
          <h3 className="text-dark/80 font-semibold mb-2">Navigation</h3>
          <ul className="text-dark/80 space-y-2">
            <li>
              <Link href="#features">Features</Link>
            </li>
            <li>
              <Link href="#about">About us</Link>
            </li>
            <li>
              <Link href="#reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-dark/80 font-semibold mb-2">Note</h3>
          <p className="text-dark/80">
            All reviews and testimonials displayed are for demonstration
            purposes only. This is a hobby project created for my portfolio and
            does not represent a real product or service.
          </p>
        </div>
        <div>
          <h3 className="text-dark/80 font-semibold mb-2">Important Links</h3>
          <ul className="text-dark/80 space-y-2">
            <li className="hover:text-secondary duration-300">
              <Link
                href="https://github.com/DominikBieleckikontakt"
                target="_blank"
              >
                GitHub
              </Link>
            </li>
            <li className="hover:text-secondary duration-300">
              <Link
                href="https://www.linkedin.com/in/dominik-bielecki-11b53a307/"
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
