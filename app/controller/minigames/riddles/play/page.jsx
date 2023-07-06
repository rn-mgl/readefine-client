"use client";

import React from "react";
import InitRiddle from "@/src/src/components/minigames/riddles/InitRiddle";
import axios from "axios";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";

const PlayRiddles = () => {
  const [riddle, setRiddle] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const getRiddle = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_riddles/random_riddle`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setRiddle(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setRiddle]);

  React.useEffect(() => {
    if (user) {
      getRiddle();
    }
  }, [user, getRiddle]);

  console.log(riddle);

  return (
    <div className="w-full min-h-screen h-screen bg-accntColor p-2 cstm-flex-col justify-start">
      <div className="cstm-flex-col cstm-w-limit w-full h-full justify-start">
        <InitRiddle />
      </div>
    </div>
  );
};

export default PlayRiddles;
