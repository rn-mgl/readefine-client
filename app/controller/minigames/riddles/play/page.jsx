"use client";

import React from "react";
import InitRiddle from "@/src/src/components/minigames/riddles/InitRiddle";
import axios from "axios";
import RiddleGame from "@/src/src/components/minigames/riddles/RiddleGame";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { AiFillHeart } from "react-icons/ai";
import Gameover from "@/src/src/components/minigames/Gameover";

const PlayRiddles = () => {
  const [riddleData, setRiddleData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [lives, setLives] = React.useState({ status: [1, 1, 1, 1, 1], activePos: 4 });
  const [timer, setTimer] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [entryGuesses, setEntryGuesses] = React.useState([]);
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart
        key={i}
        className={` ${alive ? "text-prmColor" : "text-neutral-400 animate-shake"} t:scale-125`}
      />
    );
  });

  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setRiddleData({});
        setCorrectWord([]);
        setGuess({ letters: [], letterPos: 0 });
        setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
        setTimer(0);
        setEntryGuesses([]);
        setGameOver({ over: false, status: "" });
      }
      return !prev;
    });
  };
  const handleInput = (key) => {
    if (guess.letterPos >= correctWord.length) return;
    const newLetters = [...guess.letters];
    newLetters[guess.letterPos] = key;
    setGuess((prev) => {
      return {
        letters: newLetters,
        letterPos: prev.letterPos + 1,
      };
    });
  };

  const deleteCharacter = () => {
    if (guess.letterPos - 1 < 0) return;
    const newLetters = [...guess.letters];
    newLetters[guess.letterPos - 1] = null;
    setGuess((prev) => {
      return {
        letters: newLetters,
        letterPos: prev.letterPos - 1,
      };
    });
  };

  const addToGuessEntry = () => {
    setEntryGuesses(guess.letters);
  };

  const removeHeart = () => {
    if (lives.activePos <= 0) {
      setGameOver({ over: true, status: "lose" });
    }
    const newLives = [...lives.status];
    newLives[lives.activePos] = 0;
    setLives((prev) => {
      return {
        status: newLives,
        activePos: prev.activePos - 1 < 0 ? 0 : prev.activePos - 1,
      };
    });
  };

  const submitGuess = () => {
    const guessString = guess.letters.join("");
    const correctWordString = correctWord.join("");

    if (guessString === correctWordString) {
      setGameOver({ over: true, status: "win" });
    } else {
      removeHeart();
    }
    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
    addToGuessEntry();
  };

  const getRiddle = async () => {
    try {
      const { data } = await axios.get(`${url}/admin_riddles/random_riddle`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        const word = data.answer.toUpperCase();
        const wordSplit = word.split("");
        const wordLen = wordSplit.length;
        setCorrectWord(wordSplit);
        setGuess({ letters: Array(wordLen).fill(""), letterPos: 0 });
        setRiddleData(data);
        setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
        setTimer(0);
        setEntryGuesses([]);
        setGameOver({ over: false, status: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!gameOver.over) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameOver, setTimer]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {gameOver.over ? (
        <Gameover
          gameOver={gameOver}
          correctWord={correctWord}
          timer={timer}
          label="The answer to the riddle is: "
          playAgain={getRiddle}
          handleIsPlaying={handleIsPlaying}
        />
      ) : null}

      {isPlaying ? (
        <RiddleGame
          riddleData={riddleData}
          guess={guess}
          remainingLives={remainingLives}
          entryGuesses={entryGuesses}
          timer={timer}
          setEntryGuesses={setEntryGuesses}
          handleIsPlaying={handleIsPlaying}
          deleteCharacter={deleteCharacter}
          handleInput={handleInput}
          submitGuess={submitGuess}
        />
      ) : (
        <InitRiddle
          to="/controller/minigames/riddles"
          getRiddle={getRiddle}
          handleIsPlaying={handleIsPlaying}
        />
      )}
    </div>
  );
};

export default PlayRiddles;
