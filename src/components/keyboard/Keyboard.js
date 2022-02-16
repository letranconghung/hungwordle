import React, { useEffect, useContext } from "react";
import KeyboardRow from "./KeyboardRow";
import { GlobalContext } from "../../App";
const Keyboard = (props) => {
  const {data, dispatchData} = useContext(GlobalContext)
  console.log(data);
  useEffect(() => {
    const filterAndSubmitInput = (e) => {
      if (e.key === "Enter") {
        dispatchData({
          type: "checkCurrentGuess"
        })
      } else if (e.key === "Backspace") {
        dispatchData({
          type: "removeLetter",
        });
      } else if (e.code.slice(0, 3) === "Key") {
        dispatchData({
          type: "addLetter",
          letter: e.key.toLowerCase(),
        });
      }
    };
    document.addEventListener("keydown", filterAndSubmitInput);
  }, []);

  return (
    <div className="mt-5">
      <KeyboardRow letters={"qwertyuiop"} lastRow={false} />
      <KeyboardRow letters={"asdfghjkl"} lastRow={false} />
      <KeyboardRow letters={"zxcvbnm"} lastRow={true} />
    </div>
  );
};

export default Keyboard;
