"use client";

import axios from "axios";
import React from "react";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import Dangling from "@/src/src/components/minigames/Dangling";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";

const Dangle = () => {
  const [randomWord, setRandomWord] = React.useState({ word: "dangle" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleIsPlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  const dangles = randomWord?.word?.split("").map((c, i) => {
    return (
      <React.Fragment key={i}>
        <Dangling character={c} isPlaying={isPlaying} />
      </React.Fragment>
    );
  });

  const getRandomWord = async () => {
    try {
      const { data } = await axios.get(`${url}/admin_words/random`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setRandomWord(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col justify-start gap-5">
      <div className="cstm-flex-row gap-2 h-[50%] -translate-y-[50%]">{dangles}</div>

      {isPlaying ? null : (
        <button
          onClick={() => {
            getRandomWord();
            handleIsPlaying();
          }}
          className="bg-prmColor shadow-solid shadow-indigo-950 p-2 rounded-full text-scndColor font-bold w-full mt-auto"
        >
          Play
        </button>
      )}
    </div>
  );
};

export default Dangle;
