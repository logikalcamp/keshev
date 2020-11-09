import React from "react";

import { Assignment } from "./Assignment";
import { Search } from "./Search";
import { ViewAssignmment } from "./ViewAssignmment";

export const AssignmentComponent = () => {
  return (
    <div>
      <div className="m-2">
        <Search />
      </div>
      <Assignment />
      <ViewAssignmment />
    </div>
  );
};
