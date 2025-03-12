import React from "react";
import clsx from "clsx";

const Loader = ({ styles }: { styles?: string }) => {
  return (
    <div
      className={clsx(
        "border-t-transparent border-2 border-primary rounded-full animate-spin",
        {
          "size-16": !styles?.includes("size"),
        },
        styles
      )}
    ></div>
  );
};

export default Loader;
