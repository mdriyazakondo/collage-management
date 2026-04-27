"use client";

import React from "react";

interface ShareButtonProps {
  text: string;
  onClick?: () => void;
}

export default function ShareButton({ text, onClick }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      {text}
    </button>
  );
}
