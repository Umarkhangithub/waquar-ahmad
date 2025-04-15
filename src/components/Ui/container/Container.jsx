import React from "react";

const Container = React.memo(({ children, className = "", style = {} }) => {
  return (
    <div
      className={`min-h-[80vh] max-w-7xl mx-auto px-4 text-white ${className}`}
      style={style}
      aria-live="polite" // Ensures live updates are announced by screen readers (good for dynamic content)
    >
      {children}
    </div>
  );
});

export default Container;
