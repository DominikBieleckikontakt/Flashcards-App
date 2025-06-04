import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  defaultValue?: string;
  value?: string;
  name?: string;
  type: string;
  placeholder: string;
  ariaInvalid?: boolean;
  registerProps?: any; // ReturnType<UseFormRegister<{ email: string; password: string }>>
  errors?: any;
  styles?: string;
  id?: string;
  icon?: React.ReactNode;
  inputClassnames?: string;
  labelClassnames?: string;
  accept?: string;
  onChange?: (e: any) => void;
};

const Input = ({
  label,
  id,
  type,
  name,
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
          name={name}
          {...registerProps}
          aria-invalid={ariaInvalid}
          defaultValue={defaultValue}
          value={value}
          className={cn(
            "backdrop-blur-sm w-full rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary",
            icon && "pl-10",
            inputClassnames
          )}
          accept={type === "file" ? accept : undefined}
          id={id || label?.trim().toLocaleLowerCase()}
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
