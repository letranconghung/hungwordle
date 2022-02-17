import "./App.css";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import React, { useState, useReducer, useEffect, useCallback } from "react";
import { GOAL_WORDS } from "./data/GoalWords";
import { GUESS_WORDS } from "./data/GuessWords";
import AlertModal from "./components/modals/AlertModal";
import SuccessModal from "./components/modals/SuccessModal";
import GameControlButton from "./components/gameControl/GameControlButton";
export const GlobalContext = React.createContext();
function App() {
  const DATA_INIT = {
    goalWord: "",
    letters: [],
    currentGuess: "",
    knownGridColors: [],
    alertModalMessage: "",
    showSuccessModal: false,
    gameEnded: false,
    dataSubmitted: false,
    keyboardColors: {
      q: "white",
      w: "white",
      e: "white",
      r: "white",
      t: "white",
      y: "white",
      u: "white",
      i: "white",
      o: "white",
      p: "white",
      a: "white",
      s: "white",
      d: "white",
      f: "white",
      g: "white",
      h: "white",
      j: "white",
      k: "white",
      l: "white",
      z: "white",
      x: "white",
      c: "white",
      v: "white",
      b: "white",
      n: "white",
      m: "white",
    },
    darkMode: false,
  };
  const dataReducer = useCallback((state, action) => {
    switch (action.type) {
      case "addLetter": {
        console.log("reducer case addLetter");
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
        console.log("reducer case removeLetter");
        if (state.currentGuess.length >= 1)
          return {
            ...state,
            letters: state.letters.slice(0, -1),
            currentGuess: state.currentGuess.slice(0, -1),
          };
        else return state;
      }
      case "setGoalWord": {
        console.log("reducer case setGoalWord");
        return { ...state, goalWord: action.goalWord };
      }
      case "checkCurrentGuess": {
        console.log("reducer case checkCurrentGuess");
        if (!state.gameEnded) {
          if (state.currentGuess.length != 5) {
            return { ...state, alertModalMessage: "Not enough letters!" };
          } else if (!GUESS_WORDS.includes(state.currentGuess)) {
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
                    keyboardColors[guessChar] = "green";
                  } else {
                    result[guessIndex] = "yellow";
                    keyboardColors[guessChar] = "yellow";
                  }
                  goalCharUsed[goalIndex] = true;
                }
              }
            }
            for (var guessIndex = 0; guessIndex < 5; ++guessIndex) {
              const guessChar = state.currentGuess[guessIndex];
              if (keyboardColors[guessChar] == "white")
                keyboardColors[guessChar] = "gray";
            }
            if (state.currentGuess == state.goalWord) {
              console.log("correct word! gameEnded: true");
              return {
                ...state,
                currentGuess: "",
                knownGridColors: [...state.knownGridColors, ...result],
                showSuccessModal: true,
                gameEnded: true,
              };
            } else
              return {
                ...state,
                currentGuess: "",
                knownGridColors: [...state.knownGridColors, ...result],
              };
          }
        } else return state;
      }
      case "hideModal": {
        console.log("reducer case hideModal");
        return { ...state, alertModalMessage: "", showSuccessModal: false };
      }
      case "reset": {
        console.log("reducer case reset");
        const goalWord =
          GOAL_WORDS[Math.floor(Math.random() * GOAL_WORDS.length)];
        return {
          ...DATA_INIT,
          goalWord: goalWord,
          alertModalMessage: "Game has been reset!",
          darkMode: state.darkMode,
          keyboardColors: {
            q: "white",
            w: "white",
            e: "white",
            r: "white",
            t: "white",
            y: "white",
            u: "white",
            i: "white",
            o: "white",
            p: "white",
            a: "white",
            s: "white",
            d: "white",
            f: "white",
            g: "white",
            h: "white",
            j: "white",
            k: "white",
            l: "white",
            z: "white",
            x: "white",
            c: "white",
            v: "white",
            b: "white",
            n: "white",
            m: "white",
          }
        };
      }
      case "reveal": {
        console.log("reducer case reveal");
        return {
          ...state,
          alertModalMessage: `The word is ${state.goalWord}`,
        };
      }
      case "toggleDarkMode": {
        console.log("reducer case toggleDarkMode");
        return {
          ...state,
          darkMode: !state.darkMode,
        };
      }
      case "submittedData": {
        console.log("reducer case submittedData");
        return {
          ...state,
          dataSubmitted: true,
        };
      }
    }
  },[]);

  const visualDataReducer = useCallback((state, action) => {

  }, []);
  const [visualData, dispatchVisualData] = useReducer(visualDataReducer, {})
  const [data, dispatchData] = useReducer(dataReducer, DATA_INIT);

  useEffect(() => {
    console.log("App useEffect: ", data);
    if (data.gameEnded && !data.dataSubmitted) {
      console.log("app useeffect ran ran");
      if (localStorage.getItem("scores")) {
        var scores = JSON.parse(localStorage.getItem("scores"));
        scores[Math.floor(data.letters.length / 5) - 1] += 1;
        console.log("new scores: ", scores);
        localStorage.setItem("scores", JSON.stringify(scores));
        dispatchData({
          type: "submittedData",
        });
      } else {
        var scores = new Array(6).fill(0);
        scores[Math.floor(data.letters.length / 5) - 1] = 3;
        localStorage.setItem("scores", JSON.stringify(scores));
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("app initialization goalword setting");
    const goalWord = GOAL_WORDS[Math.floor(Math.random() * GOAL_WORDS.length)];
    dispatchData({
      type: "setGoalWord",
      goalWord: goalWord,
    });
    return () => {};
  }, []);

  const darkModeClass = data.darkMode ? " dark" : "";
  return (
    <div className={`App${darkModeClass}`}>
      <GlobalContext.Provider
        value={{
          data: data,
          dispatchData: dispatchData,
          visualData: visualData,
          dispatchVisualData: dispatchVisualData
        }}
      >
        <div className="h-screen flex flex-col content-between bg-gray-50 dark:bg-zinc-900">
          <Header />
          <Grid />
          <div>
            <div>
              <GameControlButton content="New Game" />
              <GameControlButton content="Reveal Word" />
            </div>
            <Keyboard />
          </div>
        </div>
        <AlertModal />
        <SuccessModal />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
