"use client";
import React from "react";
import axios from "axios";

import Message from "@/src/src/components/global/Message";
import InitDecipher from "@/src/src/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/src/src/components/minigames/decipher/DecipherGame";
import Gameover from "@/src/src/components/minigames/Gameover";
import DecipherTutorial from "@/src/src/components/minigames/decipher/DecipherTutorial";

import quirky from "../../../../public/music/minigames/Quirky.mp3";

import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const Decipher = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const [cipheredWord, setCipheredWord] = React.useState([]);
  const [guess, setGuess] = React.useState([]);
  const [lives, setLives] = React.useState({ status: [1, 1, 1], activePos: 2 });

  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(0);

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

  // reset to starting position the letters
  const resetGuesses = () => {
    setGuess(cipheredWord);
  };

  // reset stats
  const resetGameStats = () => {
    setCipheredWord([]);
    setGuess([]);
    setWordData({});
    setCorrectWord([]);
    setGameOver({ over: false, status: "" });
    setLives({ status: [1, 1, 1], activePos: 2 });
    setTimer(0);
  };

  // toggle is playing
  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        resetGameStats();
      }
      return !prev;
    });
  };

  // increment letter position
  const incrementLetter = (index) => {
    const currChar = guess[index].letter;
    let newChar = String.fromCharCode(currChar.charCodeAt(0) + 1);

    if (!newChar.match(/[a-z]/i)) {
      newChar = "A";
    }

    let newGuess = [...guess];
    newGuess[index] = { letter: newChar, skips: guess[index].skips };

    setGuess(newGuess);
  };

  // decrement letter position
  const decrementLetter = (index) => {
    const currChar = guess[index].letter;
    let newChar = String.fromCharCode(currChar.charCodeAt(0) - 1);

    if (!newChar.match(/[a-z]/i)) {
      newChar = "Z";
    }

    let newGuess = [...guess];
    newGuess[index] = { letter: newChar, skips: guess[index].skips };

    setGuess(newGuess);
  };

  // remove heart
  const removeHeart = () => {
    // game over if no more hearts
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
    let guessString = "";
    const correctWordString = correctWord.join("");

    guess.forEach((e) => {
      guessString += e.letter;
    });

    if (guessString === correctWordString) {
      setGameOver({ over: true, status: "win" });
    } else {
      removeHeart();
    }
  };

  // shuffle text positions
  const cipher = (text) => {
    // new text array
    const cipheredText = [];

    for (let i = 0; i < text.length; i++) {
      // curr char
      const char = text[i];

      // up or down skips
      const shiftDirection = Math.random() < 0.5 ? -1 : 1;

      // number of skips
      const shiftAmount = Math.floor(Math.random() * 25) + 1;

      // new char and skips
      let newChar = char;
      let skips = 0;

      // traverse current letter until shift amount is reached
      for (let j = 0; j < shiftAmount; j++) {
        // move letter value up or down depending on shift direction
        if (shiftDirection === 1) {
          newChar = String.fromCharCode(newChar.charCodeAt(0) + 1);
        } else {
          newChar = String.fromCharCode(newChar.charCodeAt(0) - 1);
        }

        // increment skips per loop
        skips++;

        // if alphabet is not in A to Z, manually change to A or Z depending on shift direction
        if (!newChar.match(/[a-z]/i)) {
          if (shiftDirection === 1) {
            newChar = "A";
          } else {
            newChar = "Z";
          }
        }
      }

      // add the ciphered character set to the ciphered text array
      cipheredText.push({
        letter: newChar,
        skips: skips,
      });
    }

    return cipheredText;
  };

  // get word data and set game stats
  const getWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_words/random_word`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          const word = data.wordData.word.toUpperCase();
          const wordSplit = word.split("");
          const ciphered = cipher(word);

          setIsPlaying(true);
          setCipheredWord(ciphered);
          setGuess(ciphered);
          setWordData(data.wordData);
          setCorrectWord(wordSplit);
          setGameOver({ over: false, status: "" });
          setLives({ status: [1, 1, 1], activePos: 2 });
          setTimer(0);
        }
      } catch (error) {
        console.log(error);
        setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
      }
    }
  };

  // map remaining lives
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
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [setTimer, gameOver]);

  React.useEffect(() => {
    const isExpired = isTokenExpired(user?.token.split(" ")[2]);

    if (isExpired) {
      router.push("/filter");
    }
  }, [user?.token, router]);

  return (
    <div className="bg-accntColor p-4 cstm-flex-col justify-start w-full min-h-screen">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {gameOver.over ? (
        <Gameover
          gameOver={gameOver}
          correctWord={correctWord}
          timer={timer}
          label="The correct word is: "
          playAgain={getWord}
          handleIsPlaying={handleIsPlaying}
        />
      ) : null}

      {canSeeTutorial ? <DecipherTutorial handleCanSeeTutorial={handleCanSeeTutorial} /> : null}

      {isPlaying ? (
        <DecipherGame
          cipheredWord={cipheredWord}
          guess={guess}
          remainingLives={remainingLives}
          timer={timer}
          isMuted={isMuted}
          incrementLetter={incrementLetter}
          decrementLetter={decrementLetter}
          resetGuesses={resetGuesses}
          handleIsPlaying={handleIsPlaying}
          submitGuess={submitGuess}
          handleVolume={handleVolume}
          handleMuteVolume={handleMuteVolume}
        />
      ) : (
        <InitDecipher
          to="/controller/minigames"
          isMuted={isMuted}
          getWord={getWord}
          handleIsPlaying={handleIsPlaying}
          handleCanSeeTutorial={handleCanSeeTutorial}
          handleVolume={handleVolume}
          handleMuteVolume={handleMuteVolume}
        />
      )}

      <audio autoPlay loop ref={audioRef}>
        <source src={quirky} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Decipher;
