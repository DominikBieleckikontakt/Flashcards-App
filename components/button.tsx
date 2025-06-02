import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ref?: React.Ref<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  type,
  onClick,
  disabled,
  className,
  ref,
}: ButtonProps) => {
  return (
    <button
      // className={` ${className} bg-primary text-white font-bold rounded-md px-8 py-2 cursor-pointer duration-300 disabled:cursor-default`}
      className={cn(
        "bg-primary text-white font-bold rounded-md px-8 py-2 cursor-pointer duration-300 disabled:cursor-default",
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={ref || null}
    >
      {children}
    </button>
  );
};

export default Button;
