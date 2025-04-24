import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
  styles?: string;
};

const Button = ({ children, type, onClick, disabled, styles }: ButtonProps) => {
  return (
    <button
      className={` ${styles} bg-primary text-white font-bold rounded-md px-8 py-2 cursor-pointer duration-300 disabled:cursor-default`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
