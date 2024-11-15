import React, { ComponentProps } from "react";

interface HeadingProps extends ComponentProps<"h1"> {
  children: React.ReactNode;
  subTitle?: string;
  subTitleClassName?: string;
}
export default function Heading({
  children,
  subTitle,
  subTitleClassName,
  className,
}: HeadingProps) {
  return (
    <div className="flex flex-col gap-4 mb-2">
      <h1
        className={`text-5xl md:text-[1.6em] leading-4 font-bold text-co-black ${className}`}
      >
        {children}
      </h1>
      {subTitle && (
        <p
          className={`text-black  mt-1 text-lg leading-4 ${subTitleClassName}`}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
}
