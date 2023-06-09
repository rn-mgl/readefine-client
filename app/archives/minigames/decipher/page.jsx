"use client";
import React from "react";
import InitDecipher from "@/src/src/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/src/src/components/minigames/decipher/DecipherGame";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import Gameover from "@/src/src/components/minigames/Gameover";
import Message from "@/src/src/components/global/Message";

const Decipher = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [cipheredWord, setCipheredWord] = React.useState([]);
  const [guess, setGuess] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [lives, setLives] = React.useState({ status: [1, 1, 1], activePos: 2 });
  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [timer, setTimer] = React.useState(0);
  const [message, setMessage] = React.useState({ msg: "", active: false });

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
        setCipheredWord([]);
        setGuess([]);
        setWordData({});
        setCorrectWord([]);
        setGameOver({ over: false, status: "" });
        setLives({ status: [1, 1, 1], activePos: 2 });
        setTimer(0);
      }
      return !prev;
    });
  };

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

  const resetGuesses = () => {
    setGuess(cipheredWord);
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

  const cipher = (text) => {
    const cipheredText = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const shiftDirection = Math.random() < 0.5 ? -1 : 1;
      const shiftAmount = Math.floor(Math.random() * 25) + 1;

      let newChar = char;
      let skips = 0;

      for (let j = 0; j < shiftAmount; j++) {
        if (shiftDirection === 1) {
          newChar = String.fromCharCode(newChar.charCodeAt(0) + 1);
        } else {
          newChar = String.fromCharCode(newChar.charCodeAt(0) - 1);
        }

        skips++;

        if (!newChar.match(/[a-z]/i)) {
          if (shiftDirection === 1) {
            newChar = "A";
          } else {
            newChar = "Z";
          }
        }
      }

      cipheredText.push({
        letter: newChar,
        skips: skips,
      });
    }

    return cipheredText;
  };

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
      }
    }
  };

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
      if (data) {
        setMessage({ active: true, msg: "Your game is noted!" });
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [guess, timer, url, user?.token, wordData.word_id]);

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
    if (gameOver.over) {
      handleGameOver();
    }
  }, [gameOver, handleGameOver]);

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

      {isPlaying ? (
        <DecipherGame
          cipheredWord={cipheredWord}
          guess={guess}
          remainingLives={remainingLives}
          timer={timer}
          incrementLetter={incrementLetter}
          decrementLetter={decrementLetter}
          resetGuesses={resetGuesses}
          handleIsPlaying={handleIsPlaying}
          submitGuess={submitGuess}
        />
      ) : (
        <InitDecipher
          getWord={getWord}
          handleIsPlaying={handleIsPlaying}
          to="/controller/minigames"
        />
      )}
    </div>
  );
};

export default Decipher;
