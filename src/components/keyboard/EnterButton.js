import React, { useContext } from "react";
import { GlobalContext } from "../../App";
const EnterButton = (props) => {
  const { data, dispatchData } = useContext(GlobalContext);
  return (
    <button
      className="px-8 py-6 mx-0.5 sm:py-7 sm:px-12 sm:mx-1 rounded relative bg-gray-300 text-black dark:bg-neutral-500 dark:text-white"
      onClick={(e) => {
        dispatchData({
          type: "checkCurrentGuess",
        });
        e.target.blur();
      }}
    >
      <span
        className="absolute font-semibold"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Enter
      </span>
    </button>
  );
};

export default EnterButton;
