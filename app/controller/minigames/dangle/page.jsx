"use client";

import axios from "axios";
import React from "react";
import InitDangle from "@/components/minigames/dangle/InitDangle";
import DangleGame from "@/components/minigames/dangle/DangleGame";
import DangleHint from "@/components/minigames/dangle/DangleHint";
import Gameover from "@/components/minigames/Gameover";
import DangleTutorial from "@/components/minigames/dangle/DangleTutorial";
import Volume from "@/components/global/Volume";
import Message from "@/components/global/Message";
import arcade from "@/public/music/minigames/Arcade.mp3";

import { useSession } from "next-auth/react";

import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useDangleStatus } from "@/hooks/useDangleStatus";
import { useMessage } from "@/hooks/useMessage";

const Dangle = () => {
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
    definitionData,
    correctWord,
    canSeeTutorial,
    guess,
    entryGuesses,
    canSeeHint,
    lives,
    timer,
    gameOver,
    isPlaying,
    deleteCharacter,
    handleCanSeeTutorial,
    handleCanSeeHint,
    handleIsPlaying,
    handleInput,
    handleGameOverStatus,
    resetEntryGuesses,
    resetTimer,
    setNewDefinitionData,
    setNewCorrectWord,
    setNewGuess,
    setNewLives,
    submitGuess,
    setNewWordData,
  } = useDangleStatus();

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;
  const router = useRouter();

  // get random word and set game stats
  const getRandomWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_words/random_word`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          const word = data.wordData?.word?.toUpperCase();
          const wordSplit = word.split("");
          const wordLen = wordSplit.length;

          resetTimer();
          resetEntryGuesses();
          setNewWordData(data.wordData);
          setNewDefinitionData(data.definitionData);
          setNewCorrectWord(wordSplit);
          setNewGuess(Array(wordLen).fill(""), 0);
          setNewLives([1, 1, 1, 1, 1]);
          handleGameOverStatus(false, "");
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
        <DangleTutorial handleCanSeeTutorial={handleCanSeeTutorial} />
      ) : null}

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

      <div className="w-full h-full  cstm-flex-col relative">
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
            to={`/controller/minigames`}
            isPlaying={isPlaying}
            getRandomWord={getRandomWord}
            handleIsPlaying={handleIsPlaying}
            handleCanSeeTutorial={handleCanSeeTutorial}
          />
        )}
      </div>

      <audio loop ref={audioRef}>
        <source src={arcade} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Dangle;
