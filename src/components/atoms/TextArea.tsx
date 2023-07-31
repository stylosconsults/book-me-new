import React, { ComponentProps, forwardRef } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  error?: string;
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col">
        {label && (
          <label className="text-co-black font-bold text-base">{label}</label>
        )}
        <textarea
          {...props}
          rows={4}
          ref={ref}
          className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full h-full appearance-none leading-normal
          ${error ? "border-red-500 border-2 " : ""}`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
