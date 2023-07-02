"use client";

import axios from "axios";
import React from "react";
import InitDangle from "@/src/src/components/minigames/InitDangle";
import DangleGame from "@/src/src/components/minigames/DangleGame";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { AiFillHeart } from "react-icons/ai";

const Dangle = () => {
  const [randomWord, setRandomWord] = React.useState({ word: "dangle" });
  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [lives, setLives] = React.useState([1, 1, 1, 1, 1]);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setRandomWord({ word: "dangle" });
      }
      return !prev;
    });
  };

  const handleInput = (key) => {
    if (guess.letterPos >= randomWord.word.length) return;
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

  const submitGuess = () => {
    const arrayedRandomWord = randomWord.word.toUpperCase().split("");
  };

  const remainingLives = lives.map((l, i) => {
    return <AiFillHeart key={i} className="text-prmColor t:scale-125" />;
  });

  const getRandomWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_words/random`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          const wordLen = data.word.split("").length;
          setGuess({ letters: Array(wordLen).fill(null), letterPos: 0 });
          setLives(Array(wordLen).fill(1));
          setRandomWord(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {isPlaying ? (
        <DangleGame
          handleIsPlaying={handleIsPlaying}
          randomWord={randomWord}
          remainingLives={remainingLives}
          isPlaying={isPlaying}
          guess={guess}
          handleInput={handleInput}
          deleteCharacter={deleteCharacter}
          submitGuess={submitGuess}
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
