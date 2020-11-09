import React from "react";
import * as isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import locale from "dayjs/locale/he"; // import locale
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import dayjs from "dayjs";

dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale(locale);
const calendarDefaultState = {
  hebMonths: [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ],

  hebDays: ["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", "שבת"],

  currentDate: dayjs(),
  previousMonth: dayjs().subtract(1, "month"),
  nextMonth: dayjs().add(1, "month"),
};
export default (state = calendarDefaultState, action) => {
  switch (action.type) {
    case "STEP_UP":
      return {
        ...state,
        currentDate: dayjs(state.currentDate).add(1, "month"),
        previousMonth: dayjs(state.previousMonth).add(1, "month"),
        nextMonth: dayjs(state.nextMonth).add(1, "month"),
      };
    case "STEP_DOWN":
      return {
        ...state,
        currentDate: dayjs(state.currentDate).subtract(1, "month"),
        previousMonth: dayjs(state.previousMonth).subtract(1, "month"),
        nextMonth: dayjs(state.nextMonth).subtract(1, "month"),
      };
    default:
      return state;
  }
};
