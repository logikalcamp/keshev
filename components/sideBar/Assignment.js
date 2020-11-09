import React, { useState, useRef, useEffect } from "react";
import { ViewAssignmment } from "./ViewAssignmment";
import { Search } from "./Search";
import { MdAdd, MdClose } from "react-icons/md";
import * as isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import locale from "dayjs/locale/he"; // import locale
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale(locale);

const hebMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Assignment = () => {
  const dispatch = useDispatch();
  const category = [
    {
      id: 1,
      type: "אש",
    },
    {
      id: 2,
      type: "בטיחות",
    },
  ];

  let years = [];
  let year;
  for (let index = 0; index < 5; index++) {
    year = dayjs().add(index, "year").format("YYYY");
    years.push(year);
  }
  // console.log(years);
  const cyclic = [
    {
      id: 1,
      type: "כן",
    },
    {
      id: 2,
      type: "לא",
    },
  ];

  // console.log("assignmentData", assignmentData);

  const [isVisibale, setIsVisibale] = useState(false);
  // const [data, setData] = useState("");
  const [change, setChange] = useState("");

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    // console.log(n, v);

    setChange({ ...change, [name]: value });
    // console.log(change);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ASSIGNMMENT_SUBMIT",
      data: change,
    });
    // setData([...data, change]);
    e.target.reset();
    setIsVisibale(!isVisibale);
  };

  return (
    <div>
      <div className="text-blue-700 text-2xl font-bold p-3">משימות</div>
      {!isVisibale ? (
        <div className="mr-4 ml-4">
          <button
            className="w-full bg-gray-100  hover:bg-gray-200 p-2 rounded-2xl text-right text-gray-600 focus:outline-none flex items-center justify-between "
            onClick={() => {
              setIsVisibale(!isVisibale);
            }}
          >
            <MdAdd className=" text-2xl"></MdAdd>
            <span>יצירת משימה חדשה</span>
            <div className="block w-4"></div>
          </button>
        </div>
      ) : null}
      {isVisibale ? (
        <div className="shadow-md  p-2  border-gray-400 rounded-lg z-10 border-t-4 m-4 ">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  autoFocus
                  className="w-full outline-none focus:outline-none p-2"
                  type="text"
                  placeholder="שם המשימה"
                  name="taskName"
                  onChange={(e) => handleOnChange(e)}
                ></input>
                <button
                  className="outline-none focus:outline-none "
                  onClick={() => setIsVisibale(!isVisibale)}
                >
                  <MdClose className="text-gray-700 text-xl  hover:bg-gray-300  rounded-full"></MdClose>
                </button>
              </div>

              <div>
                <div className="w-full ">
                  <select
                    className="border-gray-400 border-solid border rounded-md p-1  outline-none my-1 w-full h-8"
                    name="category"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value="" disabled selected>
                      קטגוריה
                    </option>
                    {category.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <select
                    className="border-gray-400 border-solid border rounded-md p-1  outline-none my-1 w-full h-8 "
                    name="cycle"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option value={undefined} disabled selected>
                      מחזורי
                    </option>
                    {cyclic.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className=" border-gray-400 border-solid border rounded-md mr-1"> */}
                <div className="flex items-center content-evenly border-gray-400 border-solid border rounded-md  my-1 w-full">
                  <span className="p-1 w-3/12">מ-</span>
                  <select
                    className="outline-none focus:outline-none border-gray-400 border-solid border-r h-8 ml-1 w-full "
                    onChange={(e) => handleOnChange(e)}
                    name="fromYear"
                  >
                    <option value={undefined} disabled selected>
                      שנה
                    </option>
                    {years.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </select>
                  <select
                    className="outline-none focus:outline-none border-gray-400 border-r h-8 ml-1 w-full rounded-tl-2xl rounded-bl-2xl"
                    onChange={(e) => handleOnChange(e)}
                    name="fromMonth"
                  >
                    <option value={undefined} disabled selected>
                      חודש
                    </option>
                    {hebMonth.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </select>
                  {/* <input
                    className="bg-transparent outline-none p-2 items-center border-gray-400 border-r border-l w-48"
                    type="date"
                    name="dateFrom"
                    onChange={(e) => handleOnChange(e)}
                  /> */}
                </div>
                <div className="flex items-center content-evenly border-gray-400 border-solid border rounded-md my-1 w-full">
                  <span className="p-1  h-8 w-3/12">עד-</span>

                  <select
                    className=" focus:outline-none border-gray-400 border-r h-8 ml-1 w-full "
                    onChange={(e) => handleOnChange(e)}
                    name="toYear"
                  >
                    <option value={undefined} disabled selected>
                      שנה
                    </option>
                    {years.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </select>
                  <select
                    className="outline-none focus:outline-none border-gray-400 border-r h-8 ml-1 w-full rounded-tl-2xl rounded-bl-2xl "
                    onChange={(e) => handleOnChange(e)}
                    name="toMonth"
                  >
                    <option value={undefined} disabled selected>
                      חודש
                    </option>
                    {hebMonth.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  className="mt-4 w-full outline-none h-40 resize-none"
                  placeholder="תיאור"
                  name="description"
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>
              <div className="self-end">
                <button
                  type="submit"
                  className="bg-gray-500 hover:bg-gray-300 hover:text-gray-600 text-white rounded-lg text-sm w-24 p-1 focus:outline-none"
                >
                  שמירה
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};
