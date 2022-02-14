import React from "react";

const EnterButton = (props) => {
  return (
    <button className="px-12 py-7 bg-gray-300 mx-1 rounded relative">
      <span
        className="absolute font-semibold"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Enter
      </span>
    </button>
  );
};

export default EnterButton;
