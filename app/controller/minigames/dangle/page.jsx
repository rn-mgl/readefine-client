"use client";

import axios from "axios";
import React from "react";
import InitDangle from "@/src/src/components/minigames/dangle/InitDangle";
import DangleGame from "@/src/src/components/minigames/dangle/DangleGame";
import DangleHint from "@/src/src/components/minigames/dangle/DangleHint";
import Gameover from "@/src/src/components/minigames/Gameover";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { AiFillHeart } from "react-icons/ai";

const Dangle = () => {
  const [wordData, setWordData] = React.useState({});
  const [definitionData, setDefinitionData] = React.useState([]);
  const [correctWord, setCorrectWord] = React.useState([{}]);
  const [timer, setTimer] = React.useState(0);
  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [entryGuesses, setEntryGuesses] = React.useState([]);
  const [canSeeHint, setCanSeeHint] = React.useState(false);
  const [lives, setLives] = React.useState({ status: [1, 1, 1, 1, 1], activePos: 4 });
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleCanSeeHint = () => {
    setCanSeeHint((prev) => !prev);
  };

  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setCorrectWord([{}]);
        setWordData({});
        setEntryGuesses([]);
        setCanSeeHint(false);
        setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
        setGameOver({ over: false, status: "" });
        setTimer(0);
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
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_words/random_word`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          const word = data.wordData?.word?.toUpperCase();
          const wordSplit = word.split("");
          const wordLen = wordSplit.length;

          setCanSeeHint(false);
          setIsPlaying(true);
          setEntryGuesses([]);
          setWordData(data.wordData);
          setDefinitionData(data.definitionData);
          setCorrectWord(wordSplit);
          setGuess({ letters: Array(wordLen).fill(""), letterPos: 0 });
          setLives({ status: Array(wordLen).fill(1), activePos: wordLen - 1 });
          setGameOver({ over: false, status: "" });
          setTimer(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    if (!gameOver.over) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [setTimer, gameOver]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {canSeeHint ? (
        <DangleHint
          handleCanSeeHint={handleCanSeeHint}
          wordData={wordData}
          correctWord={correctWord}
          definitionData={definitionData}
        />
      ) : null}

      {gameOver.over ? (
        <Gameover
          handleIsPlaying={handleIsPlaying}
          correctWord={correctWord}
          gameOver={gameOver}
          timer={timer}
          label="The word to guess is:"
          playAgain={getRandomWord}
        />
      ) : null}

      {isPlaying ? (
        <DangleGame
          correctWord={correctWord}
          remainingLives={remainingLives}
          isPlaying={isPlaying}
          gameOver={gameOver}
          guess={guess}
          timer={timer}
          entryGuesses={entryGuesses}
          handleIsPlaying={handleIsPlaying}
          handleInput={handleInput}
          deleteCharacter={deleteCharacter}
          submitGuess={submitGuess}
          handleCanSeeHint={handleCanSeeHint}
        />
      ) : (
        <InitDangle
          to={`/controller/minigames`}
          isPlaying={isPlaying}
          getRandomWord={getRandomWord}
          handleIsPlaying={handleIsPlaying}
        />
      )}
    </div>
  );
};

export default Dangle;
