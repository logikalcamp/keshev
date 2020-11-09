import React from "react";
import { RightSidebar } from "../components/RightSidebar";

export const FilterSidebar = ({ children }) => {
  return (
    <div className="w-64 flex-grow-0 border-l-2 border-gray-400">
      {children}
      <RightSidebar />
    </div>
  );
};
