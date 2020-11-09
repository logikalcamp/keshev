import React from "react";
import { MdSearch as SearchIcon, MdClose as CancelIcon } from "react-icons/md";
import cx from "classnames";
import Tooltip from "../utils/Tooltip";
const Garbage = [
  {
    key: "1",
    data: "fire",
  },
  {
    key: "2",
    data: "safety",
  },
  {
    key: "3",
    data: "weapons",
  },
  {
    key: "4",
    data: "vehicle",
  },
];

const activitySearch = (partial) => {
  let results = [];
  if (partial == "") return results;
  results = Garbage.filter((par) => par.data.includes(partial));
  console.log("results is", results);
  return results;
};

export const Searchbar = () => {
  const [resultsOpen, setResultsOpen] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [partial, setPartial] = React.useState("");

  React.useEffect(() => {
    if (partial != "") {
      let temp = Garbage.filter((par) => par.data.includes(partial));
      setResults(temp);
      if (temp.length != 0) setResultsOpen(true);
    } else setResultsOpen(false);
  }, [partial]);
  return (
    <div className="relative h-full left-0">
      <div
        className={cx(
          "h-full outline-none flex px-3 items-center relative z-20",
          {
            "border-gray-500 border rounded-lg hover:border-gray-600": !resultsOpen,
            "shadow-customtop rounded-t-lg": resultsOpen,
          }
        )}
      >
        <Tooltip placement="right" trigger="hover" tooltip="חיפוש" hideArrow>
          <SearchIcon className="text-gray-600 w-8 h-8 p-1 hover:bg-gray-200 rounded-full" />
        </Tooltip>
        <input
          value={partial}
          className="outline-none w-64 h-6"
          onChange={(e) => setPartial(e.target.value)}
        />
        <Tooltip placement="bottom" trigger="hover" tooltip="מחיקה" hideArrow>
          <CancelIcon
            className="text-gray-600 w-8 h-8 p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            onClick={() => {
              setResultsOpen(false);
              setPartial("");
            }}
          />
        </Tooltip>
      </div>
      {resultsOpen && (
        <div className="w-full bg-white shadow-custombottom border-t border-gray-400 rounded-b-lg px-3 relative left-0 mt-0 p-2 flex flex-col z-50">
          {results.map((item, j) => {
            return (
              <div
                key={j}
                className="flex-grow w-full border-b-2 border-gray-200 cursor-pointer"
              >
                {item.data}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
