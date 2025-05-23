import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      // className={` ${className} bg-primary text-white font-bold rounded-md px-8 py-2 cursor-pointer duration-300 disabled:cursor-default`}
      className={clsx(
        "bg-primary text-white font-bold rounded-md px-8 py-2 cursor-pointer duration-300 disabled:cursor-default",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
