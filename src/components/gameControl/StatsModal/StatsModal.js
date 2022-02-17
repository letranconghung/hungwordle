import React, { useContext } from "react";
import { GlobalContext } from "../../../App";
import GraphicStats from "./GraphicStats";
import NumericStats from "./NumericStats";
import { MdOutlineClose } from "react-icons/md";
const StatsModal = (props) => {
  const { data, dispatchData, visualData, dispatchVisualData } =
    useContext(GlobalContext);
  const visibilityClass = visualData.showStatsModal ? "" : "hidden";
  if(!localStorage.getItem("hungWordleData")){
    return <div></div>
  }
  const stats = JSON.parse(localStorage.getItem("hungWordleData"));
  var scorePctWeights = {};
  var maxScore = Math.max(...Object.values(stats.scores))
  for (const score in stats.scores) {
    scorePctWeights[score] = maxScore? Math.round(stats.scores[score]/maxScore*100) : 0
  }
  
  return (
    <div className={`${visibilityClass} transition-all`}>
      <div
        className="fixed h-screen w-screen top-0 bg-white dark:bg-black opacity-70"
        onClick={(e) => {
          dispatchVisualData({
            type: "toggleStatsModal",
          });
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 p-10 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded shadow-xl">
        <button
          className="absolute top-3 right-3"
          onClick={(e) => {
            e.preventDefault();
            e.target.blur();
            dispatchVisualData({
              type: "toggleStatsModal",
            });
          }}
        >
          <MdOutlineClose className="text-2xl blackGray" />
        </button>
        <h2 className="font-bold text-lg mb-5 blackGray">STATISTICS</h2>
        <div className="flex mb-5">
          <NumericStats value={`${stats.gamesPlayed}`} caption="Games Played" />
          <NumericStats value={`${stats.winPercentage}`} caption="Win %" />
          <NumericStats value={`${stats.currentStreak}`} caption="Current Streak" />
          <NumericStats value={`${stats.maxStreak}`} caption="Max Streak" />
        </div>
        <h2 className="font-bold text-lg mb-5 blackGray">GUESS DISTRIBUTION</h2>
        <div className="flex flex-col">
          {
            Object.keys(scorePctWeights).map((score, index) => (
              <GraphicStats label={score} value={stats.scores[score]} weight={scorePctWeights[score]} key={`graphbar-${score}`}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
