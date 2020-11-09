import React from "react";
import { Checkbox } from "../../utils/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateAction } from "../../../redux/actions/unitTree";
import set from "lodash.set";

export const Element = ({ element, path }) => {
  const dispatch = useDispatch();
  const stateTree = useSelector((state) => state.unitTree);

  const handleChange = (path) => {
    let tempTree = { ...stateTree };
    const checkedPath = path + ".isChecked";
    let checkboxValue = !Object.byString(tempTree, checkedPath);
    set(tempTree, checkedPath, checkboxValue);
    dispatch(updateAction(tempTree));
  };
  return (
    <li className="flex items-center px-1 w-full">
      <Checkbox
        state={stateTree}
        handleChange={() => handleChange(path)}
        name={path + ".isChecked"}
      />
      {element.value}
    </li>
  );
};
