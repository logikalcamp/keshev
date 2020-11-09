import React from "react";
import { Element } from "./Element";
import cx from "classnames";
import {
  MdKeyboardArrowDown as ArrowDown,
  MdKeyboardArrowUp as ArrowUp,
} from "react-icons/md";
import set from "lodash.set";
import { Checkbox } from "../../utils/Checkbox";

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const subTreeLUT = (offspring) => {
  let lut = [];
  offspring.forEach((item, n) => (lut[n] = true));
  return lut;
};

export const SubTree = ({ subTree, path }) => {
  const [isOpenLUT, setIsOpenLUT] = React.useState(
    subTreeLUT(subTree.children)
  );
  const lutChange = (key, value) => {
    let lut = [...isOpenLUT];
    lut[key] = value;
    setIsOpenLUT(lut);
  };
  console.log(isOpenLUT);
  return (
    <ul className="flex flex-col w-full pr-1 cursor-default select-none">
      {subTree.children.map((item, n) => {
        return (
          <React.Fragment key={n}>
            <div className="flex w-full rounded items-center hover:bg-gray-100">
              <Element element={item} path={path + "[" + n + "]"} />
              {item.children.length != 0 &&
                (isOpenLUT[n] ? (
                  <ArrowUp
                    className="w-5 h-5 cursor-pointer text-gray-500"
                    onClick={() => lutChange(n, false)}
                  />
                ) : (
                  <ArrowDown
                    className="w-5 h-5 cursor-pointer text-gray-500"
                    onClick={() => lutChange(n, true)}
                  />
                ))}
            </div>
            {subTree.children.length !== 0 && isOpenLUT[n] && (
              <SubTree
                subTree={item}
                path={path + "[" + n + "]" + ".children"}
              />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
