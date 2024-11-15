import Image from "next/image";
import React, { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  error?: string;
  label?: string;
  placeholder?:string;
  imageUrl: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label,placeholder,imageUrl, ...props }, ref) => {
    return (


      <div className="h-fit relative w-full flex flex-col gap-2">

        {label && (
          <label className="text-mainAboutUsBlue ps-2">{label}</label>
        )}
        <Image className="w-[15px] h-[15px] absolute top-[50px] left-[18px]" src={imageUrl} alt="no_image" width={10} height={10} />
              
        <input
          {...props}
          ref={ref}
          className={`text-[1.1em] px-4 py-3 ps-10 border-none outline-none  rounded-[27px] bg-mainAboutUsBlue bg-opacity-[4%]
          ${error ? "border-red-500 border-2 " : ""}`}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
