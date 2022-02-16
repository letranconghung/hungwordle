import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const Cell = (props) => {
  const { letter, color } = props;
  let textColor = "";
  switch (color) {
    case "green":
      textColor = "bg-green-600";
      break;
    case "yellow":
      textColor = "bg-yellow-500";
      break;
    case "gray":
      textColor = "bg-gray-400";
      break;
  }
  return (
    <span className={`px-8 py-8 mx-1 ${textColor} inline-block`}>
      <div className="relative">
        <span
          className="absolute text-white font-bold text-3xl font-secondary"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {letter.toUpperCase()}
        </span>
      </div>
    </span>
  );
};

export default Cell;
