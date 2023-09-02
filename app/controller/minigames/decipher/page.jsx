"use client";
import React from "react";
import axios from "axios";

import Message from "@/src/src/components/global/Message";
import InitDecipher from "@/src/src/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/src/src/components/minigames/decipher/DecipherGame";
import Gameover from "@/src/src/components/minigames/Gameover";
import DecipherTutorial from "@/src/src/components/minigames/decipher/DecipherTutorial";
import Volume from "@/src/src/components/global/Volume";

import quirky from "../../../../public/music/minigames/Quirky.mp3";

import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

import { useAudioControls } from "@/src/src/hooks/useAudioControls";
import { useDecipherStatus } from "@/src/src/hooks/useDecipherStatus";

const Decipher = () => {
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

  const {
    audioRef,
    isMuted,
    isPlaying: audioIsPlaying,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const {
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

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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

          resetTimer();
          setNewCipheredWord(ciphered);
          setNewGuess(ciphered);
          setNewWordData(data.wordData);
          setNewCorrectWord(wordSplit);
          handleGameOverStatus(false, "");
          setNewLives([1, 1, 1]);
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

  // map remaining lives
  const remainingLives = lives.status.map((alive, i) => {
    return (
      <AiFillHeart key={i} className={` ${alive ? "text-prmColor" : "text-neutral-400 animate-shake"} t:scale-125`} />
    );
  });

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="bg-accntColor p-4 cstm-flex-col justify-start w-full min-h-screen h-screen">
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

      <div
        className="w-full h-full cstm-w-limit cstm-flex-col relative 
                    overflow-hidden gap-5 animate-fadeIn"
      >
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
            to="/controller/minigames"
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
