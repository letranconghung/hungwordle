import React from "react";
import Cell from "./Cell";

const Row = (props) => {
  const letters = props.letters;
  return (
    <div className="my-1">
      {
        letters.map((letter, index) => {
          return <Cell letter={letter} color="gray" key={`cell-${index}`}/>
        })
      }
    </div>
  );
};

export default Row;
