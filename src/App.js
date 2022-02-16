import "./App.css";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import React, { useState, useReducer, useEffect } from "react";
import { GOAL_WORDS } from "./data/GoalWords";
import { GUESS_WORDS } from "./data/GuessWords";
import { KEYBOARD_COLORS_INIT } from "./data/Initialize";
import AlertModal from "./components/modals/AlertModal";
import SuccessModal from "./components/modals/SuccessModal";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
export const GlobalContext = React.createContext();
function App() {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "addLetter": {
        if (
          state.letters.length < 30 &&
          state.currentGuess.length <= 4 &&
          !state.gameEnded
        )
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
          return { ...state, alertModalMessage: "Not enough letters!" };
        } else if (!GUESS_WORDS.includes(state.currentGuess)) {
          // invalid guess
          console.log("There's no such word!");
          return { ...state, alertModalMessage: "Not in word list!" };
        } else {
          var result = ["gray", "gray", "gray", "gray", "gray"];
          var goalCharUsed = [false, false, false, false, false];
          var keyboardColors = state.keyboardColors;
          for (var goalIndex = 0; goalIndex < 5; ++goalIndex) {
            const goalChar = state.goalWord[goalIndex];
            for (var guessIndex = 0; guessIndex < 5; ++guessIndex) {
              const guessChar = state.currentGuess[guessIndex];
              if (
                !goalCharUsed[goalIndex] &&
                result[guessIndex] === "gray" &&
                guessChar == goalChar
              ) {
                if (goalIndex == guessIndex) {
                  result[guessIndex] = "green";
                  if (keyboardColors[guessChar] === "white")
                    keyboardColors[guessChar] = "green";
                } else {
                  result[guessIndex] = "yellow";
                  keyboardColors[guessChar] = "yellow";
                }
                goalCharUsed[goalIndex] = true;
              }
              if(keyboardColors[guessChar] == "white") keyboardColors[guessChar] = "gray"
            }
          }
          console.log("finished comparison:\n", result);
          if (state.currentGuess == state.goalWord)
            return {
              ...state,
              currentGuess: "",
              knownGridColors: [...state.knownGridColors, ...result],
              showSuccessModal: true,
              gameEnded: true,
            };
          return {
            ...state,
            currentGuess: "",
            knownGridColors: [...state.knownGridColors, ...result],
          };
        }
      }
      case "hideModal": {
        return { ...state, alertModalMessage: "", showSuccessModal: false };
      }
    }
  };
  const [data, dispatchData] = useReducer(dataReducer, {
    goalWord: "",
    letters: [],
    currentGuess: "",
    knownGridColors: [],
    alertModalMessage: "",
    showSuccessModal: false,
    gameEnded: false,
    keyboardColors: KEYBOARD_COLORS_INIT,
  });

  useEffect(() => {
    // game initialization
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
        <div className="h-screen flex flex-col content-between">
          <Header />
          <Grid />
          <Keyboard />
        </div>
        <AlertModal />
        <SuccessModal />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
