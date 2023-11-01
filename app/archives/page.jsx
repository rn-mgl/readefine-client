"use client";
import React from "react";
import ArchivesCards from "@/client/archives/ArchivesCards";
import stories from "@/public/dashboard/client/Stories.svg";
import tests from "@/public/dashboard/client/Tests.svg";
import rewards from "@/public/dashboard/client/Rewards.svg";
import achievement from "@/public/dashboard/client/Achievements.svg";
import minigames from "@/public/dashboard/client/Minigames.svg";
import ClientPageHeader from "@/client/global/PageHeader";
import Message from "@/components/global/Message";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { useRouter } from "next/navigation";
import { useMessage } from "@/hooks/useMessage";

const Archives = () => {
  const [countsData, setCountsData] = React.useState({});
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // get counts of activities per card
  const getCounts = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/archives`, {
        headers: { Authorization: user?.token },
        params: { userId: user?.userId },
      });
      if (data) {
        setCountsData(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, user?.userId, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getCounts();
    }
  }, [user, getCounts]);

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
      <ClientPageHeader mainHeader="Readefine" subHeader="Home" />
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="flex flex-col items-center gap-4 w-full t:flex-wrap t:flex-row t:justify-center">
        {/* stories */}
        <ArchivesCards
          label="Read Stories"
          subLabel="Stories Read: "
          count={countsData?.readCount}
          to="/archives/stories"
          image={stories}
          delay={0.2}
        />

        {/* tests */}
        <ArchivesCards
          label="Take Tests"
          subLabel="Tests Taken: "
          count={countsData?.testCount}
          to="/archives/tests"
          image={tests}
          delay={0.3}
        />

        {/* rewards */}
        <ArchivesCards
          label="See Rewards"
          subLabel="Rewards Received: "
          count={countsData?.achievementCount}
          to="/archives/rewards"
          image={rewards}
          delay={0.4}
        />

        {/* achievements */}
        <ArchivesCards
          label="See Achievements"
          subLabel="Achievements Finished: "
          count={countsData?.achievementCount}
          to="/archives/achievements"
          image={achievement}
          delay={0.5}
        />

        {/* games */}
        <ArchivesCards
          label="Play Minigames"
          subLabel="Available Games:"
          count={3}
          to="/archives/minigames"
          image={minigames}
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Archives;
