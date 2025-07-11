import React from "react";
import classNames from "classnames";
// import { LucideIcon } from "lucide-react"; // Якщо використовуєш lucide-react або іншу іконку

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400",
  danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  children,
  className,
  disabled = false,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  icon,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={classNames(
        "inline-flex items-center justify-center border border-transparent font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition",
        sizeStyles[size],
        isLoading || disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : variantStyles[variant],
        className
      )}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
