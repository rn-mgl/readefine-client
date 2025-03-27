"use client";

import React from "react";
import InitRiddle from "@/components/minigames/riddles/InitRiddle";
import axios from "axios";
import RiddleGame from "@/components/minigames/riddles/RiddleGame";
import Gameover from "@/components/minigames/Gameover";
import RiddleTutorial from "@/components/minigames/riddles/RiddleTutorial";
import Volume from "@/components/global/Volume";

import happy from "@/public/music/minigames/Happy.mp3";

import { useSession } from "next-auth/react";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";

import { useAudioControls } from "@/hooks/useAudioControls";
import { useRiddleStatus } from "@/hooks/useRiddleStatus";
import Message from "@/components/global/Message";
import { useMessage } from "@/hooks/useMessage";

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
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
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
      <AiFillHeart
        key={i}
        className={` ${
          alive ? "text-prmColor" : "text-neutral-400 animate-shake"
        } t:text-xl`}
      />
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
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {canSeeTutorial ? (
        <RiddleTutorial handleCanSeeTutorial={handleCanSeeTutorial} />
      ) : null}

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

      <div className="w-full  cstm-flex-col relative">
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

      <audio loop ref={audioRef}>
        <source src={happy} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default PlayRiddles;
