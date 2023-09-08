"use client";

import React from "react";
import InitRiddle from "@/src/src/components/minigames/riddles/InitRiddle";
import axios from "axios";
import RiddleGame from "@/src/src/components/minigames/riddles/RiddleGame";
import Gameover from "@/src/src/components/minigames/Gameover";
import RiddleTutorial from "@/src/src/components/minigames/riddles/RiddleTutorial";
import Volume from "@/src/src/components/global/Volume";

import happy from "../../../../../public/music/minigames/Happy.mp3";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

import { useAudioControls } from "@/src/src/hooks/useAudioControls";
import { useRiddleStatus } from "@/src/src/hooks/useRiddleStatus";
import Message from "@/src/src/components/global/Message";
import { useMessage } from "@/src/src/hooks/useMessage";

const PlayRiddles = () => {
  const {
    audioRef,
    isMuted,
    isPlaying: audioIsPlaying,
    handleMuteVolume,
    handleVolumeChange,
    handleToggleAudio,
  } = useAudioControls();

  const {
    riddleData,
    correctWord,
    guess,
    canSeeTutorial,
    isPlaying,
    gameOver,
    lives,
    entryGuesses,
    timer,
    handleCanSeeTutorial,
    handleIsPlaying,
    handleGameOverStatus,
    deleteCharacter,
    handleInput,
    resetEntryGuesses,
    resetTimer,
    submitGuess,
    setNewLives,
    setNewRiddleData,
    setNewCorrectWord,
    setNewGuess,
  } = useRiddleStatus();

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

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

        setNewCorrectWord(wordSplit);
        setNewGuess(Array(wordLen).fill(""), 0);
        setNewRiddleData(data);
        setNewLives([1, 1, 1, 1, 1]);
        resetTimer();
        resetEntryGuesses();
        handleGameOverStatus(false, "");
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // map lives
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
    <div className="w-full min-h-screen h-screen bg-accntColor p-4 cstm-flex-col justify-start">
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {canSeeTutorial ? <RiddleTutorial handleCanSeeTutorial={handleCanSeeTutorial} /> : null}

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

      <div className="w-full cstm-w-limit cstm-flex-col relative">
        <div className="absolute top-10 left-0 z-20 l-s:top-0 cstm-flex-col flex-col-reverse gap-2">
          <Volume
            isMuted={isMuted}
            isPlaying={audioIsPlaying}
            handleMuteVolume={handleMuteVolume}
            handleVolumeChange={handleVolumeChange}
            handleToggleAudio={handleToggleAudio}
          />
        </div>
      </div>

      {isPlaying ? (
        <RiddleGame
          riddleData={riddleData}
          guess={guess}
          remainingLives={remainingLives}
          entryGuesses={entryGuesses}
          timer={timer}
          gameOver={gameOver}
          handleIsPlaying={handleIsPlaying}
          deleteCharacter={deleteCharacter}
          handleInput={handleInput}
          submitGuess={submitGuess}
        />
      ) : (
        <InitRiddle
          to="/controller/minigames/riddles"
          getRiddle={getRiddle}
          handleIsPlaying={handleIsPlaying}
          handleCanSeeTutorial={handleCanSeeTutorial}
        />
      )}

      <audio autoPlay loop ref={audioRef}>
        <source src={happy} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default PlayRiddles;
