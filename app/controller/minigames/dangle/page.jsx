"use client";

import axios from "axios";
import React from "react";
import InitDangle from "@/src/src/components/minigames/InitDangle";
import DangleGame from "@/src/src/components/minigames/DangleGame";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { AiFillHeart } from "react-icons/ai";
import DangleHint from "@/src/src/components/minigames/DangleHint";
import Confetti from "react-confetti";

const Dangle = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([{}]);

  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [entryGuesses, setEntryGuesses] = React.useState([]);

  const [canSeeHint, setCanSeeHint] = React.useState(false);
  const [disabledLetters, setDisabledLetters] = React.useState([]);
  const [lives, setLives] = React.useState({ status: [1, 1, 1, 1, 1], activePos: 4 });

  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setCorrectWord([{}]);
        setWordData({});
        setEntryGuesses([]);
        setCanSeeHint(false);
        setDisabledLetters([]);
        setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
        setGameOver({ over: false, status: "" });
      }
      return !prev;
    });
  };

  const handleCanSeeHint = () => {
    setCanSeeHint((prev) => !prev);
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

  const handleGameOver = async () => {
    try {
      const { data } = await axios.post(`${url}/admin_answered_dangle`);
    } catch (error) {
      console.log(error);
    }
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
    const newEntryGuesses = [...entryGuesses];
    newEntryGuesses.push(guess.letters);
    setEntryGuesses(newEntryGuesses);
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
    let corrects = 0;

    for (let i = 0; i < correctWord.length; i++) {
      const guessCandidate = guess.letters[i];
      const toGuess = correctWord[i];

      if (toGuess === guessCandidate) {
        corrects += 1;
        if (corrects >= correctWord.length) {
          addToGuessEntry();
          setGameOver({ over: true, status: "win" });
          return;
        }
      }
      if (i >= correctWord.length - 1) {
        addToGuessEntry();
      }
    }

    if (corrects !== correctWord.length) {
      removeHeart();
    }

    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
  };

  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart
        key={i}
        className={` ${alive ? "text-prmColor" : "text-neutral-400 animate-shake"} t:scale-125`}
      />
    );
  });

  const getRandomWord = async () => {
    try {
      const { data } = await axios.get(`${url}/admin_words/random`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        const word = data.word?.toUpperCase();
        const wordSplit = word.split("");
        const wordLen = wordSplit.length;

        setWordData(data);
        setCorrectWord(wordSplit);
        setGuess({ letters: Array(wordLen).fill(""), letterPos: 0 });
        setEntryGuesses([]);
        setLives({ status: Array(wordLen).fill(1), activePos: wordLen - 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {canSeeHint ? <DangleHint handleCanSeeHint={handleCanSeeHint} wordData={wordData} /> : null}
      {gameOver.over && gameOver.status === "win" ? (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      ) : null}

      {isPlaying ? (
        <DangleGame
          correctWord={correctWord}
          remainingLives={remainingLives}
          isPlaying={isPlaying}
          gameOver={gameOver}
          guess={guess}
          entryGuesses={entryGuesses}
          handleIsPlaying={handleIsPlaying}
          handleInput={handleInput}
          deleteCharacter={deleteCharacter}
          submitGuess={submitGuess}
          handleCanSeeHint={handleCanSeeHint}
        />
      ) : (
        <InitDangle
          isPlaying={isPlaying}
          getRandomWord={getRandomWord}
          handleIsPlaying={handleIsPlaying}
        />
      )}
    </div>
  );
};

export default Dangle;
