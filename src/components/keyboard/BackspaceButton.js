import React, {useContext} from "react";
import {BsBackspace} from 'react-icons/bs'
import { GlobalContext } from "../../App";
const BackspaceButton = (props) => {
  const {data, dispatchData} = useContext(GlobalContext)
  return (
    <button className="px-4 py-6 mx-0.5 sm:py-7 sm:px-5 sm:mx-1 font-semibold rounded relative bg-gray-300 text-black dark:bg-neutral-500 dark:text-white" onClick={(e)=>{
      dispatchData({
        type: "removeLetter"
      })
      e.target.blur();
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
