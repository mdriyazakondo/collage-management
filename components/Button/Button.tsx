"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-accent/60 shadow-lg shadow-yellow-500/20",
  secondary:
    "bg-primary text-white hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-primary/60 shadow-md shadow-slate-900/10",
  ghost:
    "bg-transparent text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-3.5 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
