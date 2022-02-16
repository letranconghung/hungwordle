import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../App";

const AlertModal = (props) => {
  const { data, dispatchData } = useContext(GlobalContext);
  var opacityClass = "";
  if (data.alertModalMessage != "") {
    const interval = setInterval(() => {
      dispatchData({
        type: "hideModal",
      });
      clearInterval(interval);
    }, 1500);
    opacityClass = "opacity-100";
  } else opacityClass = "opacity-0";
  return (
    <span
      className={`px-6 py-4 bg-black text-white rounded font-semibold fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ${opacityClass} transition-all duration-75`}
      style={{
        minWidth: "200px",
        minHeight: "60px"
      }}
    >
      {data.alertModalMessage}
    </span>
  );
};

export default AlertModal;
