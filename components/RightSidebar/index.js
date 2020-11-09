import React from "react";
import { Categories } from "./Categories";
import { UnitTree } from "./UnitTree";

export const RightSidebar = () => {
  return (
    <div className="relative h-full w-full p-1 flex flex-col flex-wrap">
      <div className="flex-grow w-full h-full">
        <UnitTree />
        <Categories />
      </div>
    </div>
  );
};
