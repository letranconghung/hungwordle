import React from "react";
import Row from "./Row";
import { useContext } from "react";
import { GlobalContext } from "../../App";
const Grid = () => {
  const {data, dispatchData} = useContext(GlobalContext)
  const allLetters = data.letters
  var lettersList = new Array(6);
  for (var i = 0; i < lettersList.length; ++i) {
    lettersList[i] = new Array(5);
    for (var j = 0; j < 5; ++j) {
      lettersList[i][j] = "";
    }
  }
  for (var i = 0; i < allLetters.length; ++i) {
    lettersList[Math.floor(i / 5)][i % 5] = allLetters[i];
  }
  return (
    <div className="mt-8">
      {lettersList.map((rowLetters, index) => {
        return <Row letters={rowLetters} key={`row-${index}`} />;
      })}
    </div>
  );
};

export default Grid;
