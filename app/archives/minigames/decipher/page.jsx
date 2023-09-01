"use client";
import React from "react";
import axios from "axios";

import Gameover from "@/src/src/components/minigames/Gameover";
import Message from "@/src/src/components/global/Message";
import InitDecipher from "@/src/src/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/src/src/components/minigames/decipher/DecipherGame";
import DecipherTutorial from "@/src/src/components/minigames/decipher/DecipherTutorial";

import quirky from "../../../../public/music/minigames/Quirky.mp3";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import Volume from "@/src/src/components/global/Volume";
import { useAudioControls } from "@/src/src/hooks/useAudioControls";

const Decipher = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [cipheredWord, setCipheredWord] = React.useState([]);

  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);

  const [guess, setGuess] = React.useState([]);
  const [lives, setLives] = React.useState({ status: [1, 1, 1], activePos: 2 });

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [timer, setTimer] = React.useState(0);

  const {
    audioRef,
    isMuted,
    isPlaying: audioIsPlaying,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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

  // handle game over
  const handleGameOver = React.useCallback(async () => {
    let answer = "";

    guess.forEach((e) => {
      answer += e.letter;
    });

    try {
      const { data } = await axios.post(
        `${url}/answered_decipher`,
        {
          wordId: wordData.word_id,
          answer,
          timer,
        },
        { headers: { Authorization: user?.token } }
      );

      // notice users game is recorded
      if (data) {
        setMessage({ active: true, msg: "Your game is noted!", type: "info" });
      }
    } catch (error) {
      console.log(error);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [guess, timer, url, user?.token, wordData.word_id]);

  // get word data and set game stats
  const getWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/words/random_word`, {
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
        setMessage({
          active: true,
          msg: error?.response?.data?.msg,
          type: "error",
        });
      }
    }
  };

  // map lives
  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart key={i} className={` ${alive ? "text-prmColor" : "text-neutral-400 animate-shake"} t:scale-125`} />
    );
  });

  React.useEffect(() => {
    if (wordData && !gameOver.over) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [setTimer, gameOver, wordData]);

  React.useEffect(() => {
    if (gameOver.over) {
      handleGameOver();
    }
  }, [gameOver, handleGameOver]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="bg-accntColor p-4 cstm-flex-col justify-start w-full min-h-screen h-screen">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canSeeTutorial ? <DecipherTutorial handleCanSeeTutorial={handleCanSeeTutorial} /> : null}

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

      <div className="w-full h-full cstm-w-limit cstm-flex-col relative overflow-hidden gap-5 animate-fadeIn">
        <div className="absolute top-10 left-0 z-20 l-s:top-0 cstm-flex-col flex-col-reverse gap-2">
          <Volume
            isMuted={isMuted}
            isPlaying={audioIsPlaying}
            handleMuteVolume={handleMuteVolume}
            handleVolumeChange={handleVolumeChange}
            handleToggleAudio={handleToggleAudio}
          />
        </div>

        {isPlaying ? (
          <DecipherGame
            cipheredWord={cipheredWord}
            guess={guess}
            remainingLives={remainingLives}
            timer={timer}
            gameOver={gameOver}
            incrementLetter={incrementLetter}
            decrementLetter={decrementLetter}
            resetGuesses={resetGuesses}
            handleIsPlaying={handleIsPlaying}
            submitGuess={submitGuess}
          />
        ) : (
          <InitDecipher
            to="/archives/minigames"
            getWord={getWord}
            handleIsPlaying={handleIsPlaying}
            handleCanSeeTutorial={handleCanSeeTutorial}
          />
        )}
      </div>

      <audio autoPlay loop ref={audioRef}>
        <source src={quirky} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Decipher;
