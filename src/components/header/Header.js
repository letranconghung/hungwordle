import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
const Header = () => {
  return (
    <div className="w-screen flex justify-between border-b-2 border-b-gray-500">
      <a href="/" className="text-xl my-auto ml-5">
        <AiOutlineQuestionCircle />
      </a>
      <a href="/" className="font-extrabold text-xl pl-8 py-4 text-center">
        HungWordle
      </a>
      <div className="text-xl my-auto mr-4">
        <a href="/" className="mx-2">
          <BiBarChartAlt2 className="inline" />
        </a>
        <a href="/" className="mx-2">
          <FiSettings className="inline" />
        </a>
      </div>
    </div>
  );
};

export default Header;
