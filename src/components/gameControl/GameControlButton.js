import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const GameControlButton = (props) => {
  const content = props.content;
  const { data, dispatchData, visualData, dispatchVisualData } = useContext(GlobalContext);
  if (content == "New Game") {
    return (
      <button
        className="mx-1 py-2 px-4 rounded font-medium bg-slate-500 text-white"
        onClick={(e) => {
          dispatchData({
            type: "reset",
          });
          dispatchVisualData({
            type: "showAlertModal",
            alertModalMessage: "Game has been reset!"
          })
          e.target.blur();
        }}
      >
        {content}
      </button>
    );
  } else if (content == "Reveal Word") {
    return (
      <button
        className="mx-1 py-2 px-4 rounded font-medium bg-slate-500 text-white"
        onClick={(e) => {
          dispatchVisualData({
            type: "showAlertModal", 
            alertModalMessage: `The word is ${data.goalWord}`
          });
          e.target.blur();
        }}
      >
        {content}
      </button>
    );
  }
};

export default GameControlButton;
