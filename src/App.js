import "./App.css";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import React, { useState, useReducer } from "react";

export const GlobalContext = React.createContext(); 
function App() {
  const allLettersReducer = (state, action) => {
    switch (action.type) {
      case "add":{
        if(state.length < 30) return [...state, action.letter];
        else return state;
      }
      case "remove":{
        if (state.length) return state.slice(0, -1);
        else return state;
      }
    }
  };
  const [allLetters, dispatchAllLetters] = useReducer(allLettersReducer, []);
  return (
    <div className="App">
      <GlobalContext.Provider value={{
        allLettersValue: allLetters,
        allLettersDispatch: dispatchAllLetters
      }}>
        <div className="container h-screen">
          <Header />
          <Grid />
          <Keyboard/>
        </div>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
