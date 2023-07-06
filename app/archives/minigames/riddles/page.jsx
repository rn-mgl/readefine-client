"use client";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const ClientRiddles = () => {
  const [riddle, setRiddle] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const getRiddle = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/riddles`, {
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

  return <div>ClientRiddles</div>;
};

export default ClientRiddles;
