import React from "react";
import Tooltip from "../utils/Tooltip";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  MdKeyboardArrowLeft as ArrowLeft,
  MdKeyboardArrowRight as ArrowRight,
} from "react-icons/md";
import { stepDown, stepUp } from "../../redux/actions/calendar";
export const MonthNavigator = () => {
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.calendar);
  return (
    <div className="relative h-full right-0 mr-32 items-center">
      <div className="flex justify-between h-full items-center px-3">
        <div className="flex items-center">
          <Tooltip placement="bottom" trigger="hover" tooltip="אחורה" hideArrow>
            <ArrowRight
              className="w-8 h-8 text-gray-600 hover:bg-gray-200 rounded-full cursor-pointer "
              onClick={() => {
                dispatch(stepDown());
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" trigger="hover" tooltip="קדימה" hideArrow>
            <ArrowLeft
              className="w-8 h-8 text-gray-600 hover:bg-gray-200 rounded-full cursor-pointer"
              onClick={() => {
                dispatch(stepUp());
              }}
            />
          </Tooltip>
        </div>
        <p className="text-gray-600 mr-6 text-xl font-bold self-center">
          {dayjs(calendar.currentDate).format("MMMM YYYY")}
        </p>
      </div>
    </div>
  );
};
