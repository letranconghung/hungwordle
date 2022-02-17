import React, {useContext} from "react";
import {BsBackspace} from 'react-icons/bs'
import { GlobalContext } from "../../App";
const BackspaceButton = (props) => {
  const {data, dispatchData} = useContext(GlobalContext)
  return (
    <button className="px-4 py-7 sm:px-5 font-semibold mx-1 rounded relative bg-gray-300 text-black dark:bg-neutral-400 dark:text-white" onClick={()=>{
      dispatchData({
        type: "removeLetter"
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
