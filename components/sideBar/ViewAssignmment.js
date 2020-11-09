import React from "react";
import { useSelector } from "react-redux";

export const ViewAssignmment = () => {
  const data = useSelector((state) => state.assignmment);

  console.log("view", data.assigment);
  return (
    <div>
      {data.assigment.length > 0 ? (
        data.assigment.map((item, i) => (
          <div>
            <div className="shadow-md  p-2  border-gray-400 rounded-lg z-10 border-t-4 m-4 ">
              <div>
                <div className="text-gray-600 text-base font-bold">
                  {item.taskName}
                </div>
              </div>
              <div className="flex ">
                <div className="font-bold text-sm w-full">{item.category}</div>

                <span className="bg-gray-600 w-px m-1"></span>
                <div className="font-bold text-sm w-full">{`${item.fromMonth}/${item.fromYear} - ${item.toMonth}/${item.toYear}`}</div>
              </div>

              {/* <div className="flex justify-between">
                    <div className="font-bold text-sm"> {item.cycle}</div>
                  </div> */}
              <div className="font-bold text-sm">{item.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center p-4 font-semibold">
          אין משימות חדשות
        </div>
      )}
    </div>
  );
};
