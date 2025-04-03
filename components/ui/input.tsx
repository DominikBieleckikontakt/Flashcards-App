import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  value?: string;
  type: string;
  placeholder: string;
  ariaInvalid?: boolean;
  registerProps?:
    | ReturnType<UseFormRegister<{ email: string; password: string }>>
    | ReturnType<
        UseFormRegister<{
          firstname: string;
          lastname: string;
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
          gender: string;
        }>
      >;
  errors?: any;
  styles?: string;
  icon?: React.ReactNode;
  inputClassnames?: string;
};

const Input = ({
  label,
  type,
  placeholder,
  registerProps,
  ariaInvalid,
  errors,
  styles,
  icon,
  inputClassnames,
  value,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-2 relative ${styles}`}>
      {label && label.length > 0 && (
        <label htmlFor={label.trim().toLowerCase()}>{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          autoComplete="off"
          {...registerProps}
          aria-invalid={ariaInvalid}
          defaultValue={value}
          // className={` bg-white/10 backdrop-blur-sm w-full rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary ${inputClassnames} ${
          //   icon && "pl-10"
          // } `}
          className={clsx(
            inputClassnames, // Najpierw użytkownikowe klasy, by mogły nadpisywać inne
            "backdrop-blur-sm w-full rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary",
            icon && "pl-10"
          )}
          id={label?.trim().toLocaleLowerCase()}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={20} className="hover:text-text/60 duration-300" />
            ) : (
              <Eye size={20} className="hover:text-text/60 duration-300" />
            )}
          </button>
        )}
      </div>

      {errors && <p className="text-red-500 font-bold">{errors}</p>}
    </div>
  );
};

export default Input;
