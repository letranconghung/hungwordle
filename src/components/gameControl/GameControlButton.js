import React, { useContext } from "react";
import { GlobalContext } from "../../App";

const GameControlButton = (props) => {
  const content = props.content;
  const { data, dispatchData } = useContext(GlobalContext);
  if (content == "New Game") {
    return (
      <button
        className="mx-1 py-2 px-4 mb-1 rounded font-medium bg-slate-500 text-white"
        onClick={(e) => {
          dispatchData({
            type: "reset",
          });
          e.target.blur();
        }}
      >
        {content}
      </button>
    );
  } else if (content == "Reveal Word") {
    return (
      <button
        className="mx-1 py-2 px-4 mb-1 rounded font-medium bg-slate-500 text-white"
        onClick={(e) => {
          dispatchData({
            type: "reveal",
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
