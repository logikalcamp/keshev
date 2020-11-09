import React, { useState, useRef } from "react";
import { MdSearch, MdCancel } from "react-icons/md";
// import { Assignment } from "./Assignment";
// import { MdAdd } from "react-icons/md";
export const Search = () => {
  const [value, setValue] = useState("");
  const handleClear = () => {
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className=" mr-4 mb-4 ml-4 border-b-2 border-gray-400 flex ">
      {/* <div>משימות</div> */}
      <MdSearch className="text-gray-600 text-xl"></MdSearch>
      <input
        className="w-full outline-none mr-1 "
        type="text"
        placeholder="חיפוש משימה..."
        onChange={(e) => handleChange(e)}
        // ref={searchRef}
        value={value}
      />
      {value ? (
        <button onClick={handleClear}>
          <MdCancel className="text-gray-600 text-xl"></MdCancel>
        </button>
      ) : null}
      {/* <div>
        <button
          className="w-full bg-gray-100  hover:bg-gray-200 p-2 rounded-2xl text-right text-gray-600 focus:outline-none flex items-center justify-between "
          onClick={() => setIsVisibale(!isVisibale)}
        >
          <MdAdd className="text-base text-2xl"></MdAdd>
          <span>יצירת משימה חדשה</span>
          <div className="block w-4"></div>
        </button>
      </div> */}
      {/* {isVisibale ? <Assignment></Assignment> : null} */}
    </div>
  );
};
