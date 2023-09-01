"use client";

import axios from "axios";
import React from "react";
import InitDangle from "@/src/src/components/minigames/dangle/InitDangle";
import DangleGame from "@/src/src/components/minigames/dangle/DangleGame";
import DangleHint from "@/src/src/components/minigames/dangle/DangleHint";
import Gameover from "@/src/src/components/minigames/Gameover";
import Message from "@/src/src/components/global/Message";
import DangleTutorial from "@/src/src/components/minigames/dangle/DangleTutorial";

import arcade from "../../../../public/music/minigames/Arcade.mp3";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import Volume from "@/src/src/components/global/Volume";
import { useAudioControls } from "@/src/src/hooks/useAudioControls";

const Dangle = () => {
  const [wordData, setWordData] = React.useState({});
  const [definitionData, setDefinitionData] = React.useState([]);
  const [correctWord, setCorrectWord] = React.useState([{}]);
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });
  const [canSeeTutorial, setCanSeeTutorial] = React.useState(false);

  const [guess, setGuess] = React.useState({ letters: [], letterPos: 0 });
  const [entryGuesses, setEntryGuesses] = React.useState([]);
  const [canSeeHint, setCanSeeHint] = React.useState(false);
  const [lives, setLives] = React.useState({
    status: [1, 1, 1, 1, 1],
    activePos: 4,
  });
  const [timer, setTimer] = React.useState(0);

  const [gameOver, setGameOver] = React.useState({ over: false, status: "" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const {
    audioRef,
    isMuted,
    isPlaying: audioIsPlaying,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // toggle can see tutorial
  const handleCanSeeTutorial = () => {
    setCanSeeTutorial((prev) => !prev);
  };

  // toggle can see hint
  const handleCanSeeHint = () => {
    setCanSeeHint((prev) => !prev);
  };

  // reset game stats
  const resetGameStats = () => {
    setCorrectWord([{}]);
    setWordData({});
    setEntryGuesses([]);
    setCanSeeHint(false);
    setLives({ status: [1, 1, 1, 1, 1], activePos: 4 });
    setGameOver({ over: false, status: "" });
    setTimer(0);
  };

  const handleIsPlaying = () => {
    setIsPlaying((prev) => {
      if (prev) {
        resetGameStats();
      }
      return !prev;
    });
  };

  // handle onchange input
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

  // add to guess entry
  const addToGuessEntry = () => {
    const newEntryGuesses = [...entryGuesses];
    newEntryGuesses.push(guess.letters);
    setEntryGuesses(newEntryGuesses);
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
    const stringGuess = guess.letters.join("");

    // do not record if not completely filled inputs
    if (stringGuess.length !== wordData.word.length) return;

    let corrects = 0;

    // add entry
    addToGuessEntry();

    for (let i = 0; i < correctWord.length; i++) {
      const guessCandidate = guess.letters[i];
      const toGuess = correctWord[i];

      // if same letters
      if (toGuess === guessCandidate) {
        corrects += 1;

        // add correct points and win if is the same length of the word
        if (corrects >= correctWord.length) {
          setGameOver({ over: true, status: "win" });
          return;
        }
      }
    }

    // if the corrects are not equal to word length, remove heart
    if (corrects !== correctWord.length) {
      removeHeart();
    }

    // reset guess
    setGuess({ letters: Array(correctWord.length).fill(""), letterPos: 0 });
  };

  // handle game over
  const handleGameOver = React.useCallback(async () => {
    const answer = entryGuesses.at(-1).join("");

    try {
      const { data } = await axios.post(
        `${url}/answered_dangle`,
        {
          wordId: wordData.word_id,
          answer,
          timer,
        },
        { headers: { Authorization: user?.token } }
      );
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
  }, [entryGuesses, timer, url, user?.token, wordData.word_id]);

  // get word and set game stats
  const getRandomWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/words/random_word`, {
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
    <div className="w-full min-h-screen h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canSeeTutorial ? <DangleTutorial handleCanSeeTutorial={handleCanSeeTutorial} /> : null}

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

      <div className="w-full h-full cstm-w-limit cstm-flex-col relative">
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
            to={`/archives/minigames`}
            isPlaying={isPlaying}
            getRandomWord={getRandomWord}
            handleIsPlaying={handleIsPlaying}
            handleCanSeeTutorial={handleCanSeeTutorial}
          />
        )}
      </div>

      <audio autoPlay loop ref={audioRef}>
        <source src={arcade} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Dangle;
