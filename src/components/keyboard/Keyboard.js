import React, { useEffect, useContext } from "react";
import KeyboardRow from "./KeyboardRow";
import { GlobalContext } from "../../App";
import { GUESS_WORDS } from "../../data/GuessWords";
const Keyboard = (props) => {
  const { data, dispatchData, visualData, dispatchVisualData } = useContext(GlobalContext);

  useEffect(() => {
    const filterAndSubmitInput = (e) => {
      if (data.gameStatus == "playing"){
        if (e.key === "Enter") {
          if (data.currentGuess.length != 5) {
            console.log("filterInput not enough letters");
            console.log("length: ", data.currentGuess.length);
            dispatchVisualData({
              type: "showAlertModal",
              alertModalMessage: "Not enough letters!",
            });
          } else if (!GUESS_WORDS.includes(data.currentGuess)) {
            console.log("filterInput not in word list!");
            dispatchVisualData({
              type: "showAlertModal",
              alertModalMessage: "Not in word list!",
            });
          } else {
            console.log("filterInput valid, checkCurrentguess now.");
            dispatchData({
              type: "checkCurrentGuess",
            });
          }
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
      }
    };
    document.addEventListener("keydown", filterAndSubmitInput);
    return () => {
      document.removeEventListener("keydown", filterAndSubmitInput);
    }
  }, [data, visualData]);

  return (
    <div className="my-auto py-2">
      <KeyboardRow letters={"qwertyuiop"} lastRow={false} />
      <KeyboardRow letters={"asdfghjkl"} lastRow={false} />
      <KeyboardRow letters={"zxcvbnm"} lastRow={true} />
    </div>
  );
};

export default Keyboard;
