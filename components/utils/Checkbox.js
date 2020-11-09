import React from "react";
import styled from "styled-components";
import { MdCheck as Check } from "react-icons/md";

const changeChecked = (isChecked, setIsChecked, name, handleChange, state) => {
  setIsChecked(!isChecked);
  handleChange();
};

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

export const Checkbox = ({
  height = "1.1rem",
  width = "1.1rem",
  color = "black",
  state,
  handleChange,
  name,
}) => {
  const [isChecked, setIsChecked] = React.useState(
    Object.byString(state, name)
  );
  React.useEffect(() => {
    setIsChecked(Object.byString(state, name));
  }, [state]);
  return (
    <div
      className="rounded border flex ml-1"
      style={{
        color,
        height,
        width,
        borderColor: color,
        backgroundColor: isChecked && color,
      }}
      onClick={() => {
        changeChecked(isChecked, setIsChecked, name, handleChange, state);
      }}
    >
      {isChecked && <Check className="h-full w-full text-white" />}
    </div>
  );
};
