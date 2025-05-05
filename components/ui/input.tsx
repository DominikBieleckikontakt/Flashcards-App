import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  defaultValue?: string;
  value?: string;
  type: string;
  placeholder: string;
  ariaInvalid?: boolean;
  registerProps?: any; // ReturnType<UseFormRegister<{ email: string; password: string }>>
  // registerProps?:
  //   | ReturnType<UseFormRegister<{ email: string; password: string }>>
  //   | ReturnType<
  //       UseFormRegister<{
  //         firstname: string;
  //         lastname: string;
  //         username: string;
  //         email: string;
  //         password: string;
  //         confirmPassword: string;
  //         gender: string;
  //       }>
  //     >
  //   | ReturnType<
  //       UseFormRegister<{
  //         currentPassword: string;
  //         newPassword: string;
  //         confirmNewPassword: string;
  //       }>
  //     >;
  errors?: any;
  styles?: string;
  icon?: React.ReactNode;
  inputClassnames?: string;
  labelClassnames?: string;
  accept?: string;
  onChange?: (e: any) => void;
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
  defaultValue,
  value,
  accept,
  onChange,
  labelClassnames,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-2 relative ${styles}`}>
      {label && label.length > 0 && (
        <label htmlFor={label.trim().toLowerCase()} className={labelClassnames}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center cursor-pointer z-10">
            {icon}
          </div>
        )}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          onChange={onChange && onChange}
          placeholder={placeholder}
          autoComplete="off"
          {...registerProps}
          aria-invalid={ariaInvalid}
          defaultValue={defaultValue}
          value={value}
          className={clsx(
            inputClassnames, // Najpierw użytkownikowe klasy, by mogły nadpisywać inne
            "backdrop-blur-sm w-full rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary",
            icon && "pl-10"
          )}
          accept={type === "file" ? accept : undefined}
          id={label?.trim().toLocaleLowerCase()}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={20} className="hover:text-light/60 duration-300" />
            ) : (
              <Eye size={20} className="hover:text-light/60 duration-300" />
            )}
          </button>
        )}
      </div>

      {errors && <p className="text-red-500 font-bold">{errors}</p>}
    </div>
  );
};

export default Input;
