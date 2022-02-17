import React, { useContext } from "react";
import { GlobalContext } from "../../../App";
import GraphicStats from "./GraphicStats";
import NumericStats from "./NumericStats";

const StatsModal = (props) => {
  
  return (
    <div>
      <div className="fixed h-screen w-screen top-0 bg-white opacity-30">
      </div>
      <div className="fixed top-1/2 left-1/2 p-10 -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-xl">
        <h2 className="font-bold text-lg mb-5">STATISTICS</h2>
        <div className="flex mb-5">
          <NumericStats value="3" caption="Played"/>
          <NumericStats value="3" caption="Games Played"/>
          <NumericStats value="3" caption="Played"/>
          <NumericStats value="3" caption="Played"/>
        </div>
        <h2 className="font-bold text-lg mb-5">GUESS DISTRIBUTION</h2>
        <div className="flex flex-col">
          <GraphicStats value="1"/>
          <GraphicStats value="1"/>
          <GraphicStats value="1"/>
          <GraphicStats value="1"/>
          <GraphicStats value="1"/>
          <GraphicStats value="1"/>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
