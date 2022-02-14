import React, { useEffect, useContext } from "react";
import KeyboardRow from "./KeyboardRow";
import { GlobalContext } from "../../App";
const Keyboard = (props) => {
  const dispatchAllLetters = useContext(GlobalContext).allLettersDispatch;
  useEffect(() => {
    const filterAndSubmitInput = (e) => {
      if (e.key === "Enter") {
        console.log("enter pressed");
      } else if (e.key === "Backspace") {
        dispatchAllLetters({
          type: "remove",
        });
      } else if (e.code.slice(0, 3) === "Key") {
        dispatchAllLetters({
          type: "add",
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
