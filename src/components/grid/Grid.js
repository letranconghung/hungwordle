import React from "react";
import Row from "./Row";
import { useContext } from "react";
import { GlobalContext } from "../../App";
const Grid = () => {
  const {data, dispatchData} = useContext(GlobalContext)
  const letters = data.letters
  const knownGridColors = data.knownGridColors
  var gridSettings = new Array(6);
  for (var i = 0; i < gridSettings.length; ++i) {
    gridSettings[i] = new Array(5);
    for (var j = 0; j < 5; ++j) {
      gridSettings[i][j] = {
        letter: "",
        color: "white"
      };
    }
  }
  for (var i = 0; i < letters.length; ++i) {
    gridSettings[Math.floor(i / 5)][i % 5].letter = letters[i];
  }
  for (var i = 0;i<knownGridColors.length;++i){
    gridSettings[Math.floor(i / 5)][i % 5].color = knownGridColors[i]
  }
  return (
    <div className="">
      {gridSettings.map((rowSettings, index) => {
        return <Row rowSettings={rowSettings} key={`row-${index}`} />;
      })}
    </div>
  );
};

export default Grid;
