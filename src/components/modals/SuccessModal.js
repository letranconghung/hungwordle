import React, {useContext} from 'react'
import { GlobalContext } from '../../App'
const SuccessModal = () => {
  const { data, dispatchData } = useContext(GlobalContext);
  var opacityClass = "";
  if (data.showSuccessModal != "") {
    const interval = setInterval(() => {
      dispatchData({
        type: "hideModal",
      });
      clearInterval(interval);
    }, 2500);
    opacityClass = "opacity-100";
  } else opacityClass = "opacity-0";
  return (
    <span
      className={`px-6 py-4 bg-gray-100 text-green-700 border-2 border-gray-500 rounded font-semibold fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ${opacityClass} transition-all duration-75`}
      style={{
        minWidth: "200px",
        minHeight: "60px"
      }}
    >
      CONGRATULATIONS! Your score was {Math.floor(data.letters.length/5)}
    </span>
  );
}

export default SuccessModal