import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const Cell = (props) => {
  const cellSettings = props.cellSettings;
  let colorClass = "";
  switch (cellSettings.color) {
    case "green":
      colorClass = "bg-green-600 border-transparent border-2 text-white";
      break;
    case "yellow":
      colorClass = "bg-yellow-500 border-transparent border-2 text-white";
      break;
    case "gray":
      colorClass = "bg-gray-600 border-transparent border-2 text-white";
      break;
    case "white": {
      if (cellSettings.letter == "")
        colorClass = "border-gray-300 dark:border-zinc-700 border-2 blackGray";
      else colorClass = "border-black dark:border-zinc-400 border-2 blackGray";
    }
  }
  return (
    <span
      className={`px-6 py-6 sm:px-7 sm:py-7 mx-1 ${colorClass} inline-block transition-all`}
    >
      <div className="relative">
        <span
          className="absolute font-bold text-3xl font-secondary"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {cellSettings.letter.toUpperCase()}
        </span>
      </div>
    </span>
  );
};

export default Cell;
