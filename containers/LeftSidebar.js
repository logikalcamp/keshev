import React from "react";
import { MdAdd } from "react-icons/md";
import cx from "classnames";
export const LeftSidebar = ({ children, isOpen, setIsOpen }) => {
  return (
    <div className="w-20 border-r-2 border-gray-400 h-full justify-center items-baseline flex pt-3">
      {children}
      <div
        className={cx("flex  w-full ", {
          "justify-center": !isOpen,
          "justify-between": isOpen,
        })}
      >
        <div></div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cx(
            "focus:outline-none outline-none bg-whites rounded-full  p-2 m-2",
            {
              "shadow-customBlueStatic hover:shadow-customBlueHover": isOpen,
              "shadow-customGrayStatic hover:shadow-customGrayHover": !isOpen,
            }
          )}
        >
          <MdAdd className="text-gray-600 text-3xl"></MdAdd>
        </button>
        {isOpen ? <span className="bg-blue-700 w-1"></span> : ""}
      </div>
    </div>
  );
};
