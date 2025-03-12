import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  ariaInvalid?: boolean;
  registerProps?: ReturnType<
    UseFormRegister<{ email: string; password: string }>
  >;
  errors?: any;
};

const Input = ({
  label,
  type,
  placeholder,
  registerProps,
  ariaInvalid,
  errors,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        // {...register}
        {...registerProps}
        aria-invalid={ariaInvalid}
        className="bg-white/10 backdrop-blur-sm rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary"
      />
      {errors && <p className="text-red-500 font-bold">{errors}</p>}
    </div>
  );
};

export default Input;
