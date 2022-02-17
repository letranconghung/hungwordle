import React from "react";

const GraphicStats = (props) => {
  const { label, value, weight } = props;
  const widthPct = weight ? `${weight}%` : `4%`;
  const labelClass = weight ? "flex justify-end pr-2" : "flex justify-center";
  return (
    <div className="flex pb-2">
      <span className="flex-none mr-3 text-base sm:text-base blackGray">{label}</span>
      <div className="flex-grow relative">
        <div
          className={`bg-gray-600 h-full ${labelClass}`}
          style={{
            width: widthPct,
          }}
        >
          <span className="text-white text-xs my-auto">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default GraphicStats;
