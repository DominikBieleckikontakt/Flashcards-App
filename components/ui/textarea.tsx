import clsx from "clsx";
import React from "react";

type TextareaProps = {
  label: string;
  placeholder: string;
  ariaInvalid?: boolean;
  registerProps?: any;
  errors?: any;
  value?: string;
  styles?: string;
  textareaClassnames?: string;
  labelClassnames?: string;
  rows?: number;
  cols?: number;
  onChange?: (e: any) => void;
};

const Textarea = ({
  label,
  placeholder,
  registerProps,
  ariaInvalid,
  errors,
  styles,
  value,
  textareaClassnames,
  labelClassnames,
  onChange,
  rows,
  cols,
}: TextareaProps) => {
  return (
    <div className={`flex flex-col gap-2 relative ${styles}`}>
      {label && label.length > 0 && (
        <label htmlFor={label.trim().toLowerCase()} className={labelClassnames}>
          {label}
        </label>
      )}
      <textarea
        onChange={onChange && onChange}
        placeholder={placeholder}
        autoComplete="off"
        {...registerProps}
        defaultValue={value}
        rows={rows}
        cols={cols}
        aria-invalid={ariaInvalid}
        className={clsx(
          textareaClassnames,
          "backdrop-blur-sm w-full rounded-md p-2 duration-300 outline-0 border-2 border-transparent focus:border-primary"
        )}
        id={label?.trim().toLocaleLowerCase()}
      ></textarea>
      {errors && <p className="text-red-500 font-bold">{errors}</p>}
    </div>
  );
};

export default Textarea;
