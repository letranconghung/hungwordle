import React, {useContext} from "react";
import { GlobalContext } from "../../App";
const CharButton = (props) => {
  const {letter} = props
  const {data, dispatchData} = useContext(GlobalContext)
  return (
    <button
      className="px-5 py-7 bg-gray-300 mx-1 rounded relative"
      onClick={() => {
        dispatchData({
          type: "addLetter",
          letter: letter,
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
        {letter.toUpperCase()}
      </span>
    </button>
  );
};

export default CharButton;
