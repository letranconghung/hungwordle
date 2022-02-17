import React, { useContext } from "react";
import { GlobalContext } from "../../App";
const SuccessModal = () => {
  const { data, dispatchData, visualData, dispatchVisualData} = useContext(GlobalContext);
  var opacityClass = "";
  if (visualData.showSuccessModal) {
    const interval = setInterval(() => {
      dispatchVisualData({
        type: "hideModal",
      });
      clearInterval(interval);
    }, 1500);
    opacityClass = "opacity-100";
  } else opacityClass = "opacity-0";
  return (
    <div
      className={`px-6 py-4 bg-gray-50 text-green-700 border-2 border-gray-600 rounded font-semibold fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ${opacityClass}`}
    >
      CONGRATULATIONS! Your score was {Math.floor(data.letters.length / 5)}!
    </div>
  );
};

export default SuccessModal;
