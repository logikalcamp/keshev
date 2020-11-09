import React from "react";
import cx from "classnames";
import {
  MdKeyboardArrowDown as ArrowDown,
  MdKeyboardArrowUp as ArrowUp,
} from "react-icons/md";
import { Checkbox } from "../utils/Checkbox";
import { Tree } from "./TreeComponent/Tree";
import { useDispatch, useSelector } from "react-redux";
import { initiateTree, updateAction } from "../../redux/actions/unitTree";

const GarbageTree = {
  name: "units",
  value: "יחידות",
  isChecked: false,
  children: [
    {
      name: "unit 1",
      value: "יחידה 1",
      isChecked: false,
      children: [
        {
          name: "sub-unit 1",
          value: "יחידה 1.1",
          isChecked: false,
          children: [
            {
              name: "sub-sub-unit 1",
              value: "יחידה 1.1.1",
              isChecked: true,
              children: [],
            },
            {
              name: "sub-sub-unit 2",
              value: "יחידה 1.1.2",
              isChecked: false,
              children: [],
            },
          ],
        },
        {
          name: "sub-unit 2",
          value: "יחידה 1.2",
          isChecked: false,
          children: [
            {
              name: "sub-sub-unit 2.1",
              value: "יחידה 1.2.1",
              isChecked: true,
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "unit 2",
      value: "יחידה 2",
      isChecked: false,
      children: [
        {
          name: "unit 2.1",
          value: "יחידה 2.1",
          isChecked: true,
          children: [],
        },
      ],
    },
  ],
};

export const UnitTree = () => {
  const dispatch = useDispatch();
  const stateTree = useSelector((state) => state.unitTree);
  const [isOpen, setIsOpen] = React.useState(true);
  const [isHover, setIsHover] = React.useState(false);

  React.useEffect(() => {
    dispatch(updateAction(GarbageTree));
  }, []);
  // const [stateTree, setStateTree] = React.useState(GarbageTree);
  console.log("state tree is", stateTree);
  let path = "children";

  const checkAllTree = (value) => {
    let temp = { ...stateTree };
    recursiveAllChecker(value, temp);
    dispatch(updateAction(temp));
  };

  const recursiveAllChecker = (value, element) => {
    element.isChecked = value;
    if (element.children.length == 0) return;
    else {
      element.children.forEach((item) => {
        item.isChecked = value;
        recursiveAllChecker(value, item);
      });
    }
  };

  console.log("stateTree on update is", stateTree);
  return (
    <div className="w-full flex flex-col flex-wrap mb-6">
      <div className="flex rounded-sm px-1 py-1 bg-gray-200 cursor-pointer items-center">
        <button
          className="text-right flex-grow focus:outline-none font-bold"
          onClick={() => setIsOpen(!isOpen)}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          יחידות
        </button>
        {isOpen ? (
          <ArrowUp
            className="w-6 h-6 text-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <ArrowDown
            className={cx("w-6 h-6 text-gray-500", {
              hidden: !isHover,
            })}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      {isOpen && (
        <>
          <div className="flex items-center p-1 border-b border-gray-500">
            <Checkbox
              state={stateTree}
              handleChange={() => checkAllTree(!stateTree["isChecked"])}
              name="isChecked"
            />
            {stateTree["isChecked"] ? "בטל הכל" : "בחר הכל"}
          </div>
          <div className="flex">
            <Tree tree={stateTree.children} path={path} />
          </div>
        </>
      )}
    </div>
  );
};
