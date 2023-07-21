"use client";
import React from "react";
import axios from "axios";

import DashboardCardImage2 from "../../../public/dashboard/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../../public/dashboard/DashboardCardImage3.svg";
import DashboardCardImage6 from "../../../public/dashboard/DashboardCardImage6.svg";

import ClientMinigamesCards from "@/src/src/client/minigames/ClientMinigamesCards";
import ClientPageHeader from "@/src/src/client/global/PageHeader";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

const Minigames = () => {
  const [counts, setCounts] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

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
    }
  }, [url, user, setCounts]);

  React.useEffect(() => {
    if (user) {
      getCounts();
    }
  }, [getCounts, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Minigames" />

      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        {/* riddles */}
        <ClientMinigamesCards
          image={DashboardCardImage2}
          label="Riddles"
          subLabel="Riddles Answered: "
          count={counts?.riddleCount ? counts?.riddleCount : 0}
          to="/archives/minigames/riddles"
        />

        {/* dangle */}
        <ClientMinigamesCards
          image={DashboardCardImage3}
          label="Dangle"
          subLabel="Dangle Played: "
          count={counts?.dangleCount ? counts?.dangleCount : 0}
          to="/archives/minigames/dangle"
        />

        {/* decipher */}
        <ClientMinigamesCards
          image={DashboardCardImage6}
          label="Decipher"
          subLabel="Decipher Played: "
          count={counts?.decipherCount ? counts?.decipherCount : 0}
          to="/archives/minigames/decipher"
        />
      </div>
    </div>
  );
};

export default Minigames;
