import React, {useContext} from "react";
import {BsBackspace} from 'react-icons/bs'
import { GlobalContext } from "../../App";
const BackspaceButton = (props) => {
  const dispatchAllLetters = useContext(GlobalContext).allLettersDispatch;
  return (
    <button className="px-5 py-7 font-semibold bg-gray-300 mx-1 rounded relative" onClick={()=>{
      dispatchAllLetters({
        type: "remove"
      })
    }}>
      <span
        className="absolute font-semibold text"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BsBackspace />
      </span>
    </button>
  );
};

export default BackspaceButton;
