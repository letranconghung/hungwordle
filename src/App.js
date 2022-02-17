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
import StatsModal from "./components/gameControl/StatsModal/StatsModal";
export const GlobalContext = React.createContext();
function App() {
  const DATA_INIT = {
    goalWord: "",
    letters: [],
    currentGuess: "",
    knownGridColors: [],
    gameStatus: "playing",
    dataLogged: false,
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
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "addLetter": {
        console.log("dataReducer case addLetter");
        if (
          state.letters.length < 30 &&
          state.currentGuess.length <= 4 &&
          state.gameStatus == "playing"
        ) {
          return {
            ...state,
            letters: [...state.letters, action.letter],
            currentGuess: state.currentGuess + action.letter,
          };
        } else return state;
      }
      case "removeLetter": {
        console.log("dataReducer case removeLetter");
        if (state.currentGuess.length >= 1)
          return {
            ...state,
            letters: state.letters.slice(0, -1),
            currentGuess: state.currentGuess.slice(0, -1),
          };
        else return state;
      }
      case "setGoalWord": {
        console.log("dataReducer case setGoalWord");
        return { ...state, goalWord: action.goalWord };
      }
      case "checkCurrentGuess": {
        console.log("dataReducer case checkCurrentGuess");
        if (state.gameStatus == "playing") {
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
            console.log("correct word!");
            return {
              ...state,
              currentGuess: "",
              knownGridColors: [...state.knownGridColors, ...result],
              gameStatus: "success",
            };
          } else if (state.letters.length == 30) {
            return {
              ...state,
              currentGuess: "",
              knownGridColors: [...state.knownGridColors, ...result],
              gameStatus: "failure",
            };
          } else
            return {
              ...state,
              currentGuess: "",
              knownGridColors: [...state.knownGridColors, ...result],
            };
        } else return state;
      }
      case "reset": {
        console.log("dataReducer case reset");
        const goalWord =
          GOAL_WORDS[Math.floor(Math.random() * GOAL_WORDS.length)];
        return {
          ...DATA_INIT,
          goalWord: goalWord,
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
          },
        };
      }
      case "toggleDarkMode": {
        console.log("dataReducer case toggleDarkMode");
        return {
          ...state,
          darkMode: !state.darkMode,
        };
      }
      case "dataLogged": {
        console.log("dataReducer case dataLogged");
        return {
          ...state,
          dataLogged: true,
        };
      }
    }
  };

  const visualDataReducer = (state, action) => {
    switch (action.type) {
      case "hideModal": {
        console.log("visualDataReducer case hideModal");
        return { ...state, alertModalMessage: "", showSuccessModal: false };
      }
      case "showAlertModal": {
        console.log("visualDataReducer case showAlertModal");
        return { ...state, alertModalMessage: action.alertModalMessage };
      }
      case "showSuccessModal": {
        console.log("visualDataReducer case showSuccessModal");
        return { ...state, showSuccessModal: true };
      }
      case "toggleStatsModal": {
        console.log("visualDataReducer case toggleStatsModal");
        return { ...state, showStatsModal: !state.showStatsModal };
      }
    }
  };
  const [visualData, dispatchVisualData] = useReducer(visualDataReducer, {
    alertModalMessage: "",
    showSuccessModal: false,
    showStatsModal: false,
  });
  const [data, dispatchData] = useReducer(dataReducer, DATA_INIT);

  useEffect(() => {
    // subscribe to changes in data to liaise between dispatch functions
    console.log("linker useeffect: \n data", data, "\nvisualData\n", visualData);
    if (data.gameStatus != "playing" && !data.dataLogged) {
      console.log("linker ran");
      if (data.gameStatus == "failure") {
        dispatchVisualData({
          type: "showAlertModal",
          alertModalMessage: "You failed! Try again!",
        });
      } else {
        dispatchVisualData({
          type: "showSuccessModal",
        });
      }
      var storageLoad = JSON.parse(localStorage.getItem("hungWordleData"));
      if (data.gameStatus == "success") {
        // handle success
        var score = Math.floor(data.letters.length / 5);
        ++storageLoad.gamesPlayed;
        ++storageLoad.gamesWon;
        ++storageLoad.currentStreak;
        storageLoad.maxStreak = Math.max(
          storageLoad.maxStreak,
          storageLoad.currentStreak
        );
        ++storageLoad.scores[score];
        storageLoad.winPercentage = Math.round(
          (storageLoad.gamesWon / storageLoad.gamesPlayed) * 100
        );
      } else {
        // handle failure
        ++storageLoad.gamesPlayed;
        storageLoad.currentStreak = 0;
        ++storageLoad.scores["F"];
        storageLoad.winPercentage = Math.round(
          (storageLoad.gamesWon / storageLoad.gamesPlayed) * 100
        );
      }
      localStorage.setItem("hungWordleData", JSON.stringify(storageLoad));
      dispatchData({
        type: "dataLogged",
      });
    }
  }, [data]);

  useEffect(() => {
    console.log("app initialization goalword setting");
    const goalWord = GOAL_WORDS[Math.floor(Math.random() * GOAL_WORDS.length)];
    dispatchData({
      type: "setGoalWord",
      goalWord: goalWord,
    });
    if (!localStorage.getItem("hungWordleData")) {
      localStorage.setItem(
        "hungWordleData",
        JSON.stringify({
          gamesPlayed: 0,
          gamesWon: 0,
          winPercentage: 0,
          currentStreak: 0,
          maxStreak: 0,
          scores: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            F: 0,
          },
        })
      );
    }
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
          dispatchVisualData: dispatchVisualData,
        }}
      >
        <div className="h-screen flex flex-col justify-between bg-gray-50 dark:bg-zinc-900">
          <Header />
          <Grid />
          <div className="pb-4">
            <div>
              <GameControlButton content="New Game" />
              <GameControlButton content="Reveal Word" />
            </div>
            <Keyboard />
          </div>
        </div>
        <div className="modals">
          <AlertModal />
          <SuccessModal />
          <StatsModal />
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
