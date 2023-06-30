"use client";
import axios from "axios";
import React from "react";
import { wordArray } from "./populateLists/wordList";
import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";

const Populate = () => {
  const [word, setWord] = React.useState(wordArray);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const getWord = async () => {
    let visited = [];
    try {
      word.map(async (w) => {
        const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`);
        if (data && data[0] && !visited.includes(w)) {
          const word = await axios.post(
            `${url}/admin_words`,
            { data: data[0] },
            { headers: { Authorization: user?.token } }
          );
          visited.push(w);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    try {
      const { data } = await axios.get(`${url}/admin_words`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={getAll}>get</button>
    </div>
  );
};

export default Populate;
