"use client";
import ArchivesCards from "@/src/src/client/archives/ArchivesCards";
import { useSession } from "next-auth/react";
import React from "react";
import DashboardCardImage1 from "../../public/DashboardCardImage1.svg";
import DashboardCardImage2 from "../../public/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../public/DashboardCardImage3.svg";
import DashboardCardImage5 from "../../public/DashboardCardImage5.svg";
import DashboardCardImage6 from "../../public/DashboardCardImage6.svg";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/src/src/components/global/Loading";

const Archives = () => {
  const [countsData, setCountsData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;

  const { url } = useGlobalContext();
  const router = useRouter();

  const handleLoading = () => {
    setLoading(true);
  };

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
      if (error?.response.statusText === "Unauthorized") {
        router.push("/login");
      }
    }
  }, [url, user, setCountsData]);

  React.useEffect(() => {
    if (user) {
      getCounts();
    }
  }, [user, getCounts]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <ClientPageHeader mainHeader="Readefine" subHeader="Home" />

      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        <ArchivesCards
          label="Read Stories"
          subLabel="Stories Read: "
          count={countsData?.readCount}
          to="/archives/stories"
          image={DashboardCardImage1}
          handleLoading={handleLoading}
        />
        <ArchivesCards
          label="Take Tests"
          subLabel="Tests Taken: "
          count={countsData?.testCount}
          to="/archives/tests"
          image={DashboardCardImage2}
          handleLoading={handleLoading}
        />
        <ArchivesCards
          label="See Rewards"
          subLabel="Rewards Received: "
          count={countsData?.rewardCount}
          to="/archives/rewards"
          image={DashboardCardImage3}
          handleLoading={handleLoading}
        />
        <ArchivesCards
          label="See Achievements"
          subLabel="Achievements Finished: "
          count={countsData?.achievementCount}
          to="/archives/achievements"
          image={DashboardCardImage5}
          handleLoading={handleLoading}
        />
        <ArchivesCards
          label="Answer Riddles"
          subLabel="Riddles Answered: "
          count={countsData?.riddleCount}
          to="/archives/riddles"
          image={DashboardCardImage6}
          handleLoading={handleLoading}
        />
      </div>
    </div>
  );
};

export default Archives;
