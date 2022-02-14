import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const Cell = (props) => {
  const dispatchAllLetters = useContext(GlobalContext).allLettersDispatch;
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
    <button className={`px-8 py-8 mx-1 ${textColor} inline-block`}>
      <div className="relative">
        <span
          className="absolute text-white font-normal text-3xl"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {letter.toUpperCase()}
        </span>
      </div>
    </button>
  );
};

export default Cell;
