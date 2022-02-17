import React, { useContext } from "react";
import { GlobalContext } from "../../../App";
import { MdOutlineClose } from "react-icons/md";
const InstructionsModal = () => {
  const { data, dispatchData, visualData, dispatchVisualData } =
    useContext(GlobalContext);
  const visibilityClass = visualData.showInstructionsModal ? "" : "hidden";
  return (
    <div className={`${visibilityClass} transition-all`}>
      <div
        className="fixed h-screen w-screen top-0 bg-white dark:bg-black opacity-70"
        onClick={(e) => {
          dispatchVisualData({
            type: "toggleInstructionsModal",
          });
        }}
      ></div>
      <div className="fixed top-1/2 left-1/2 p-7 sm:p-10 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded shadow-xl border-gray-200 dark:border-zinc-600 border-2">
        <button
          className="absolute top-3 right-3"
          onClick={(e) => {
            e.preventDefault();
            e.target.blur();
            dispatchVisualData({
              type: "toggleInstructionsModal",
            });
          }}
        >
          <MdOutlineClose className="text-2xl blackGray" />
        </button>
        <div class="w-[20rem] sm:w-[32rem] text-left blackGray">
          <h2 className="font-bold text-lg mb-5 text-center">How To Play</h2>
          <p className="mb-2 text-sm">
            Guess the <strong>WORDLE</strong> in six tries.
          </p>
          <p className="mb-2 text-sm">
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </p>
          {/* <p className="mb-2 text-sm"></p> */}
          <p className="mb-2 text-sm">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
          <p className="mb-2 text-sm">
            <span className="text-green-600 font-bold">Green</span> means that
            the letter is in the word and in the correct spot,{" "}
            <span className="text-yellow-500 font-bold">Yellow</span> means that
            the letter is in the word but in the wrong spot, and{" "}
            <span className="text-gray-600 font-bold">Gray</span> means that the
            letter is not in the word in any spot.
          </p>
          <p className="mb-2 text-sm">
            In this version of <strong>HungWordle</strong>, you get unlimited
            tries everyday and are able to obtain the goal word if you happen to
            be... stuck!
          </p>
          <p className="mb-2 text-sm">All the best and have fun playing!</p>
          <p className="mt-5 text-xs">
            This clone of the original{" "}
            <a
              href="https://www.nytimes.com/games/wordle/index.html"
              className="underline underline-offset-1"
              target="_blank"
            >
              Wordle
            </a>{" "}
            is made by{" "}
            <a
              href="https://www.instagram.com/ltc__hung/"
              className="underline underline-offset-1"
              target="_blank"
            >
              Hung
            </a>
          </p>
          <a
            href="https://github.com/letranconghung/hungwordleclone"
            className="text-xs underline underline-offset-1"
            target="_blank"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
