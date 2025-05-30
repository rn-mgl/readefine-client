"use client";
import React from "react";
import axios from "axios";

import riddles from "@/public/minigames/Riddles.svg";
import dangle from "@/public/minigames/Dangle.svg";
import decipher from "@/public/minigames/Decipher.svg";

import ClientMinigamesCards from "@/client/minigames/ClientMinigamesCards";
import ClientPageHeader from "@/client/global/PageHeader";
import Message from "@/components/global/Message";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const Minigames = () => {
  const [counts, setCounts] = React.useState({});

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
  const router = useRouter();

  // get counts or amount of times user played a game
  const getCounts = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/minigames_dashboard`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setCounts(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setCounts, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getCounts();
    }
  }, [getCounts, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Minigames" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div
        className="cstm-flex-col gap-4 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        "
      >
        {/* riddles */}
        <ClientMinigamesCards
          image={riddles}
          label="Riddles"
          subLabel="Riddles Answered: "
          count={counts?.riddleCount ? counts?.riddleCount : 0}
          to="/archives/minigames/riddles"
          delay={0.2}
        />

        {/* dangle */}
        <ClientMinigamesCards
          image={dangle}
          label="Dangle"
          subLabel="Dangle Played: "
          count={counts?.dangleCount ? counts?.dangleCount : 0}
          to="/archives/minigames/dangle"
          delay={0.4}
        />

        {/* decipher */}
        <ClientMinigamesCards
          image={decipher}
          label="Decipher"
          subLabel="Decipher Played: "
          count={counts?.decipherCount ? counts?.decipherCount : 0}
          to="/archives/minigames/decipher"
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Minigames;
