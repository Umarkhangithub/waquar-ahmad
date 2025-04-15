import React from "react";

const Loader = ({ size = "h-5 w-5", color = "text-white", className = "" }) => {
  return (
    <div className={` ${className}`}>

    <svg
      className={`animate-spin ${size} ${color}`}
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75 Lise"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
      />
    </svg>
    </div>

  );
};

export default Loader;