import cn from "@/lib/classNames";
import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  theme?: "primary" | "secondary" | "none";
  outline?: boolean;
}

export default function Button({
  isLoading,
  loadingText,
  children,
  icon,
  className,
  disabled,
  onClick,
  outline,
  theme = "none", // Default theme is 'none'
  ...rest
}: ButtonProps) {
  const getThemeStyles = () => {
    switch (theme) {
      case "primary":
        return {
          base: cn("text-white bg-co-primary", "border-co-primary"),
          hover: cn("hover:bg-white hover:text-co-primary"),
        };
      case "secondary":
        return {
          base: cn("text-white bg-co-secondary", "border-co-secondary"),
          hover: cn("hover:bg-white hover:text-co-secondary"),
        };
      default:
        return {
          base: cn("text-co-black bg-transparent", "border-co-gray"),
          hover: cn("hover:bg-co-black"),
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center gap-1 justify-center",
        "px-4 py-3",
        "text-md font-bold",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "transition duration-200 ease-in-out",
        "border-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-black disabled:hover:bg-gray-700 disabled:hover:text-black",
        outline ? themeStyles.base : "focus:border-co-black",
        outline ? themeStyles.hover : "hover:bg-mainAboutUsBlue/70",
        className!,
        "bg-mainAboutUsBlue text-white",
      )}
      {...rest}
    >
      {isLoading && (
        <div className="w-4 h-4 border-4 bg-transparent border-l-blue-700 rounded-full animate-spin" />
      )}
      {icon}
      {isLoading ? loadingText : children}
    </button>
  );
}
