import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-[calc(100%-8rem)] flex justify-center items-center">
      <div className="text-center space-y-5 mx-5">
        <h1 className="text-6xl">404</h1>
        <p>
          You shouldn't bee here...{" "}
          <Link href="/" className="text-secondary font-semibold">
            Go back to the dashboard!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
