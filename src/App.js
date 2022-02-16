import "./App.css";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import React, { useState, useReducer, useEffect } from "react";
import { GOAL_WORDS } from "./data/GoalWords";
import { GUESS_WORDS } from "./data/GuessWords";
export const GlobalContext = React.createContext();
function App() {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "addLetter": {
        if (state.letters.length < 30 && state.currentGuess.length <= 4)
          return {
            ...state,
            letters: [...state.letters, action.letter],
            currentGuess: state.currentGuess + action.letter,
          };
        else return state;
      }
      case "removeLetter": {
        if (state.currentGuess.length >= 1)
          return {
            ...state,
            letters: state.letters.slice(0, -1),
            currentGuess: state.currentGuess.slice(0, -1),
          };
        else return state;
      }
      case "setGoalWord": {
        return { ...state, goalWord: action.goalWord };
      }
      case "checkCurrentGuess": {
        if (state.currentGuess.length != 5) {
          console.log("not 5-letter");
        } else if (!GUESS_WORDS.includes(state.currentGuess)) {
          // invalid guess
          console.log("There's no such word!");
        } else {
          var result = ["gray", "gray", "gray", "gray", "gray"];
          var goalCharUsed = [false, false, false, false, false];
          for (var goalIndex = 0; goalIndex < 5; ++goalIndex) {
            const goalChar = state.goalWord[goalIndex];
            for (var guessIndex = 0; guessIndex < 5; ++guessIndex) {
              const guessChar = state.currentGuess[guessIndex];
              if (
                !goalCharUsed[goalIndex] &&
                result[guessIndex] === "gray" &&
                guessChar == goalChar
              ) {
                if (goalIndex == guessIndex) result[guessIndex] = "green";
                else result[guessIndex] = "yellow";
                goalCharUsed[goalIndex] = true;
              }
            }
          }
          console.log("finished comparison:\n", result);
        }
        return state;
      }
    }
  };
  const [data, dispatchData] = useReducer(dataReducer, {
    goalWord: "",
    letters: [],
    currentGuess: "",
  });

  useEffect(() => {
    const goalWord = GOAL_WORDS[Math.floor(Math.random() * GOAL_WORDS.length)];
    dispatchData({
      type: "setGoalWord",
      goalWord: goalWord,
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{
          data: data,
          dispatchData: dispatchData,
        }}
      >
        <div className="container h-screen">
          <Header />
          <Grid />
          <Keyboard />
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
