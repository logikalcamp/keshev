
import React from "react";

export const ViewAssignment = ({ data }) => {
  console.log("view", data);
  return (
    <div>
      {data
        ? data.map((item, i) => (
            <div key={i}>
              <div>{item.taskName}</div>
              <div>{item.category}</div>
              <div> {item.cycle}</div>
              <div>{item.description}</div>
            </div>
          ))
        : "אין משימות חדשות"}
    </div>
  );
};