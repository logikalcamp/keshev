import React from "react";

export const Header = ({ children }) => {
  return (
    <div className="relative w-full h-10 md:h-16 border-b-2 border-gray-400 sticky top-0">
      {children}
    </div>
  );
};
