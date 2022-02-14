import React from "react";
import CharButton from "./CharButton";
import EnterButton from "./EnterButton";
import BackspaceButton from "./BackspaceButton";

const KeyboardRow = (props) => {
  const { letters, lastRow } = props;
  return (
    <div className="mt-2">
      {lastRow && <EnterButton />}
      {letters.split("").map((letter) => (
        <CharButton key={`cell-${letter}`} letter={letter} />
      ))}
      {lastRow && <BackspaceButton />}
    </div>
  );
};

export default KeyboardRow;
