import React from "react";

import { WrapperComponent } from "@/types";

const Card = ({ children, classNames }: WrapperComponent) => {
  return (
    <div
      className={`${classNames} rounded-md border border-border max-w-96 p-5`}
    >
      {children}
    </div>
  );
};

export default Card;
