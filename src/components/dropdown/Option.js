import React from "react";
import { useDropdown } from "./Dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="flex items-center justify-between py-[15px] px-[25px] transition-all cursor-pointer hover:text-primary"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
