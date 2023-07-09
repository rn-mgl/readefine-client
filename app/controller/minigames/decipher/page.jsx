"use client";
import React from "react";
import InitDecipher from "@/src/src/components/minigames/decipher/InitDecipher";
import DecipherGame from "@/src/src/components/minigames/decipher/DecipherGame";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";

const Decipher = () => {
  const [wordData, setWordData] = React.useState({});
  const [correctWord, setCorrectWord] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIsPlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  const getWord = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_words/random_word`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          const word = data.wordData.word.toUpperCase();
          const wordSplit = word.split("");

          setWordData(data.wordData);
          setCorrectWord(wordSplit);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-accntColor p-4 cstm-flex-col justify-start w-full min-h-screen">
      {isPlaying ? (
        <DecipherGame handleIsPlaying={handleIsPlaying} />
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
