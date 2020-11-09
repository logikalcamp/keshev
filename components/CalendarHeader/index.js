import React from "react";
import { MonthNavigator } from "./MonthNavigator";
import { Searchbar } from "./Searchbar";

export const CalendarHeader = ({ children }) => {
  return (
    <div className="w-full absolute h-full flex justify-between items-center px-3 py-1 flex-no-wrap">
      <MonthNavigator />
      <Searchbar />
    </div>
  );
};
