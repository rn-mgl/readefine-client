"use client";
import React from "react";
import axios from "axios";

import riddles from "../../../public/minigames/Riddles.svg";
import dangle from "../../../public/minigames/Dangle.svg";
import decipher from "../../../public/minigames/Decipher.svg";

import ClientMinigamesCards from "@/src/src/client/minigames/ClientMinigamesCards";
import ClientPageHeader from "@/src/src/client/global/PageHeader";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import Message from "@/src/src/components/global/Message";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const Minigames = () => {
  const [counts, setCounts] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setCounts]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Minigames" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
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
