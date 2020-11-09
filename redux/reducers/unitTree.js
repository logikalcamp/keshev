import React from "react";
const unitTree = { name: "def", value: "def", children: [] };
export default (state = unitTree, action) => {
  switch (action.type) {
    case "INITIATE":
      return state;
    case "UPDATE":
      return action.val;
    default:
      return state;
  }
};
