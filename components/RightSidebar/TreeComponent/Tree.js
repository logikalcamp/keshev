import React from "react";
import { SubTree } from "./SubTree";
import cx from "classnames";
import {
  MdKeyboardArrowDown as ArrowDown,
  MdKeyboardArrowUp as ArrowUp,
} from "react-icons/md";
import { Element } from "./Element";

const subTreeLUT = (offspring) => {
  let lut = [];
  offspring.forEach((item, n) => (lut[n] = true));
  return lut;
};

export const Tree = ({ tree, path }) => {
  const [isOpenLUT, setIsOpenLUT] = React.useState(subTreeLUT(tree));
  const lutChange = (key, value) => {
    let lut = [...isOpenLUT];
    lut[key] = value;
    setIsOpenLUT(lut);
  };
  return (
    <ul className="flex flex-col w-full">
      {tree.map((item, n) => {
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
            {item.children.length !== 0 && isOpenLUT[n] && (
              <>
                <React.Fragment>
                  <SubTree
                    subTree={item}
                    path={path + "[" + n + "]" + ".children"}
                  />
                </React.Fragment>
              </>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
