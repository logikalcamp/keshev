import React from "react";
import cx from "classnames";
import {
  MdKeyboardArrowDown as ArrowDown,
  MdKeyboardArrowUp as ArrowUp,
} from "react-icons/md";
import { Checkbox } from "../utils/Checkbox";

const categoryList = {
  name: "categories",
  value: "קטגוריות",
  children: [
    {
      id: 1,
      value: "Category 1",
    },
    {
      id: 2,
      value: "Category 2",
    },
    {
      id: 3,
      value: "Category 3",
    },
    {
      id: 4,
      value: "Category 4",
    },
  ],
};

const catActiveTemplateGenerator = (value) => {
  let catActiveTemplate = {};
  categoryList.children.forEach((item) => {
    catActiveTemplate[item.value] = value;
  });
  return catActiveTemplate;
};

export const Categories = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isHover, setIsHover] = React.useState(false);
  const [allCategory, setAllCategory] = React.useState({ categories: false });
  const [activeCategories, setActiveCategories] = React.useState(
    catActiveTemplateGenerator(false)
  );

  const catSetAll = (state) => {
    let temp = { ...activeCategories };
    for (const key in temp) {
      temp[key] = state["categories"];
    }
    setActiveCategories(temp);
  };

  const handleChange = (currentState, setter, name) => {
    let temp = { ...currentState };
    temp[name] = !temp[name];
    setter(temp);
  };

  React.useEffect(() => {
    let cancelAll = true;
    let temp = { ...activeCategories };
    for (const key in temp) {
      if (temp[key] == false) {
        cancelAll = false;
      }
    }
    if (cancelAll) {
      setAllCategory({ categories: true });
    } else setAllCategory({ categories: false });
  }, [activeCategories]);

  return (
    <div className="w-full flex flex-col flex-wrap">
      <div className="flex rounded-sm px-1 py-1 bg-gray-200 cursor-pointer items-center">
        <button
          className="text-right flex-grow focus:outline-none font-bold"
          onClick={() => setIsOpen(!isOpen)}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          קטגוריות
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
              state={allCategory}
              handleChange={() =>
                handleChange(allCategory, catSetAll, "categories")
              }
              name="categories"
            />
            {allCategory["categories"] ? "בטל הכל" : "בחר הכל"}
          </div>

          {categoryList.children.map((item, n) => {
            return (
              <div key={n} className="flex items-center p-1">
                <Checkbox
                  state={activeCategories}
                  handleChange={() =>
                    handleChange(
                      activeCategories,
                      setActiveCategories,
                      item.value
                    )
                  }
                  name={item.value}
                />
                {item.value}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
