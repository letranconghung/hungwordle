import React, { useContext } from "react";
import { GlobalContext } from "../../App";
const EnterButton = (props) => {
  const { data, dispatchData } = useContext(GlobalContext);
  return (
    <button
      className="px-12 py-7 bg-gray-300 mx-1 rounded relative"
      onClick={() => {
        dispatchData({
          type: "checkCurrentGuess",
        });
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
