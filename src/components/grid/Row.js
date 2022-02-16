import React from "react";
import Cell from "./Cell";

const Row = (props) => {
  const rowSettings = props.rowSettings;
  return (
    <div className="my-1">
      {
        rowSettings.map((cellSettings, index) => {
          return <Cell cellSettings={cellSettings} key={`cell-${index}`}/>
        })
      }
    </div>
  );
};

export default Row;
