"use client";
import React from "react";
import ArchivesCards from "@/src/src/client/archives/ArchivesCards";
import DashboardCardImage1 from "../../public/dashboard/DashboardCardImage1.svg";
import DashboardCardImage2 from "../../public/dashboard/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../public/dashboard/DashboardCardImage3.svg";
import DashboardCardImage5 from "../../public/dashboard/DashboardCardImage5.svg";
import DashboardCardImage6 from "../../public/dashboard/DashboardCardImage6.svg";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Message from "@/src/src/components/global/Message";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useRouter } from "next/navigation";

const Archives = () => {
  const [countsData, setCountsData] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setCountsData]);

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Home" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div
        className="cstm-flex-col gap-5 w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        {/* stories */}
        <ArchivesCards
          label="Read Stories"
          subLabel="Stories Read: "
          count={countsData?.readCount}
          to="/archives/stories"
          image={DashboardCardImage1}
        />

        {/* tests */}
        <ArchivesCards
          label="Take Tests"
          subLabel="Tests Taken: "
          count={countsData?.testCount}
          to="/archives/tests"
          image={DashboardCardImage2}
        />

        {/* rewards */}
        <ArchivesCards
          label="See Rewards"
          subLabel="Rewards Received: "
          count={countsData?.achievementCount}
          to="/archives/rewards"
          image={DashboardCardImage3}
        />

        {/* achievements */}
        <ArchivesCards
          label="See Achievements"
          subLabel="Achievements Finished: "
          count={countsData?.achievementCount}
          to="/archives/achievements"
          image={DashboardCardImage5}
        />

        {/* games */}
        <ArchivesCards
          label="Play Minigames"
          subLabel="Available Games:"
          count={3}
          to="/archives/minigames"
          image={DashboardCardImage6}
        />
      </div>
    </div>
  );
};

export default Archives;
