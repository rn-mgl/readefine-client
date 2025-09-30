"use client";
import React from "react";
import axios from "axios";

import Gameover from "@/components/minigames/Gameover";
import Message from "@/components/global/Message";
import InitDecipher from "@/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/components/minigames/decipher/DecipherGame";
import DecipherTutorial from "@/components/minigames/decipher/DecipherTutorial";
import Volume from "@/components/global/Volume";

import quirky from "@/public/music/minigames/Quirky.mp3";

import { useSession } from "next-auth/react";

import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useDecipherStatus } from "@/hooks/useDecipherStatus";
import { useMessage } from "@/hooks/useMessage";

const Decipher = () => {
  const {
    audioRef,
    isMuted,
    isPlaying: audioIsPlaying,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const {
    wordData,
    correctWord,
    canSeeTutorial,
    cipheredWord,
    guess,
    lives,
    gameOver,
    isPlaying,
    timer,
    handleCanSeeTutorial,
    handleGameOverStatus,
    resetGuesses,
    handleIsPlaying,
    incrementLetter,
    decrementLetter,
    submitGuess,
    cipher,
    resetTimer,
    setNewCipheredWord,
    setNewGuess,
    setNewWordData,
    setNewCorrectWord,
    setNewLives,
  } = useDecipherStatus();

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const url = process.env.API_URL;
  const user = session?.user;
  const router = useRouter();

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
        setMessageStatus(true, "Your game is noted!", "info");
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [guess, timer, url, user?.token, wordData.word_id, setMessageStatus]);

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

          resetTimer();
          setNewCipheredWord(ciphered);
          setNewGuess(ciphered);
          setNewWordData(data.wordData);
          setNewCorrectWord(wordSplit);
          handleGameOverStatus(false, "");
          setNewLives([1, 1, 1, 1, 1]);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  };

  // map lives
  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart
        key={i}
        className={` ${
          alive ? "text-prmColor" : "text-neutral-400 animate-shake"
        } t:text-xl`}
      />
    );
  });

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
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {canSeeTutorial ? (
        <DecipherTutorial handleCanSeeTutorial={handleCanSeeTutorial} />
      ) : null}

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

      <div className="w-full h-full  cstm-flex-col relative overflow-hidden gap-4 animate-fadeIn">
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

      <audio loop ref={audioRef}>
        <source src={quirky} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Decipher;
