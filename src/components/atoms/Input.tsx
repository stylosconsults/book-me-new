import React, { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <div className="h-full w-full flex flex-col">
        {label && (
          <label className="text-co-black font-bold text-base">{label}</label>
        )}
        <input
          {...props}
          ref={ref}
          className={`bg-white focus:outline-none focus:shadow-outline border max-h-9 border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal
          ${error ? "border-red-500 border-2 " : ""}`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
