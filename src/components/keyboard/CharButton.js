import React, { useContext } from "react";
import { GlobalContext } from "../../App";
const CharButton = (props) => {
  const { letter } = props;
  const { data, dispatchData } = useContext(GlobalContext);
  const color = data.keyboardColors[letter];
  var colorClass = "";
  switch (color) {
    case "green":
      colorClass = "bg-green-600 text-white";
      break;
    case "yellow":
      colorClass = "bg-yellow-500 text-white";
      break;
    case "gray":
      colorClass = "bg-gray-600 text-white";
      break;
    case "white":
      colorClass = "bg-gray-300 dark:bg-neutral-500 dark:text-white text-black";
  }
  return (
    <button
      className={`px-4 py-7 sm:px-5 mx-1 rounded relative ${colorClass} transition-all`}
      onClick={(e) => {
        dispatchData({
          type: "addLetter",
          letter: letter,
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
        {letter.toUpperCase()}
      </span>
    </button>
  );
};

export default CharButton;
