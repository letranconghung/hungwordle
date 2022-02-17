import React, { useContext } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import { GlobalContext } from "../../App";
import { IconContext } from "react-icons";
const Header = () => {
  const { data, dispatchData } = useContext(GlobalContext);
  return (
    <div className="w-screen flex justify-between border-b-2 border-b-gray-500 dark:border-b-gray-200">
      <a href="/" className="text-xl my-auto ml-5">
        <AiOutlineQuestionCircle className="blackGray" />
      </a>
      <a
        href="/"
        className="font-extrabold text-xl pl-8 py-4 text-center blackGray"
      >
        HungWordle
      </a>
      <div className="text-xl my-auto mr-4">
        <a href="/" className="mx-2">
          <BiBarChartAlt2 className="inline blackGray" />
        </a>
        <span
          className="mx-2 hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            dispatchData({
              type: "toggleDarkMode",
            });
          }}
        >
          <MdOutlineDarkMode className="inline blackGray" />
        </span>
      </div>
    </div>
  );
};

export default Header;
