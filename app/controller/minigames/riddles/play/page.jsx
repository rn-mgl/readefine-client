"use client";

import React from "react";
import InitRiddle from "@/src/src/components/minigames/riddles/InitRiddle";
import axios from "axios";
import RiddleGame from "@/src/src/components/minigames/riddles/RiddleGame";
import Gameover from "@/src/src/components/minigames/Gameover";
import RiddleTutorial from "@/src/src/components/minigames/riddles/RiddleTutorial";

import happy from "../../../../../public/music/minigames/Happy.mp3";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const PlayRiddles = () => {
  const [riddleData, setRiddleData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);

  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [lives, setLives] = React.useState({ status: [1, 1, 1, 1, 1], activePos: 4 });
  const [timer, setTimer] = React.useState(0);
  const [entryGuesses, setEntryGuesses] = React.useState([]);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });

  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = React.useRef();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // change audio volume
  const handleVolume = ({ value }) => {
    if (typeof audioRef.current.volume !== "undefined") {
      audioRef.current.volume = value / 100;
    }
    setIsMuted(false);
  };

  // mute volume
  const handleMuteVolume = () => {
    if (typeof audioRef.current.volume !== "undefined") {
      setIsMuted((prev) => {
        if (prev) {
          audioRef.current.volume = 1;
        } else {
          audioRef.current.volume = 0;
        }
        return !prev;
      });
    }
  };

  // toggle can see tutorial
  const handleCanSeeTutorial = () => {
    setCanSeeTutorial((prev) => !prev);
  };

  // reset game stats
  const resetGameStats = () => {
    setRiddleData({});
    setCorrectWord([]);
    setGuess({ letters: [], letterPos: 0 });
    setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
    setTimer(0);
    setEntryGuesses([]);
    setGameOver({ over: false, status: "" });
  };

  // toggle is playing, if playing reset, else main menu
  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        resetGameStats();
      }
      return !prev;
    });
  };

  // handle input from virtual keyb
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

  // handle delete character
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

  // add to guesses
  const addToGuessEntry = () => {
    setEntryGuesses(guess.letters);
  };

  // remove heart
  const removeHeart = () => {
    // game over if lives are empty
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

  // submit guess
  const submitGuess = () => {
    const guessString = guess.letters.join("");
    const correctWordString = correctWord.join("");

    // return if guess length is not equal to correct one
    if (guessString.length !== correctWordString.length) return;

    addToGuessEntry();

    if (guessString === correctWordString) {
      setGameOver({ over: true, status: "win" });
    } else {
      removeHeart();
    }
    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
  };

  // get riddle data and fill in game data
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

  // map lives
  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart
        key={i}
        className={` ${alive ? "text-prmColor" : "text-neutral-400 animate-shake"} t:scale-125`}
      />
    );
  });

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

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

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

      {canSeeTutorial ? <RiddleTutorial handleCanSeeTutorial={handleCanSeeTutorial} /> : null}

      {isPlaying ? (
        <RiddleGame
          riddleData={riddleData}
          guess={guess}
          remainingLives={remainingLives}
          entryGuesses={entryGuesses}
          timer={timer}
          isMuted={isMuted}
          setEntryGuesses={setEntryGuesses}
          handleIsPlaying={handleIsPlaying}
          deleteCharacter={deleteCharacter}
          handleInput={handleInput}
          submitGuess={submitGuess}
          handleVolume={handleVolume}
          handleMuteVolume={handleMuteVolume}
        />
      ) : (
        <InitRiddle
          to="/controller/minigames/riddles"
          isMuted={isMuted}
          getRiddle={getRiddle}
          handleIsPlaying={handleIsPlaying}
          handleCanSeeTutorial={handleCanSeeTutorial}
          handleVolume={handleVolume}
          handleMuteVolume={handleMuteVolume}
        />
      )}

      <audio autoPlay loop ref={audioRef}>
        <source src={happy} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default PlayRiddles;
