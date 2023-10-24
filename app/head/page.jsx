"use client";
import React from "react";
import axios from "axios";
import HeadPageHeader from "@/head/global/PageHeader";
import DashboardCards from "@/head/dashboard/DashboardCards";
import admins from "@/public/dashboard/head/Admins.svg";
import create from "@/public/dashboard/head/Create.svg";
import read from "@/public/dashboard/head/Read.svg";
import update from "@/public/dashboard/head/Update.svg";
import remove from "@/public/dashboard/head/Delete.svg";
import Message from "@/components/global/Message";

import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const HeadDashboard = () => {
  const [counts, setCounts] = React.useState({});
  const [updates, setUpdates] = React.useState({});

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  // get dashboard counts
  const getCounts = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_dashboard`, {
        params: { query: "counts" },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setCounts(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [user?.token, url, setMessageStatus]);

  // get dashboard updates
  const getUpdates = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_dashboard`, {
        params: { query: "updates" },
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUpdates(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [user?.token, url, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getCounts();
    }
  }, [getCounts, user]);

  React.useEffect(() => {
    if (user) {
      getUpdates();
    }
  }, [getUpdates, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <HeadPageHeader subHeader="Activities" mainHeader="Main Dashboard" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        {/* users card */}
        <DashboardCards
          image={admins}
          label="Administrators"
          subLabel={`New Administrator: ${updates.userName}`}
          count={counts.userCount}
          to="/head/administrators"
        />

        {/* stories card */}
        <DashboardCards
          image={create}
          label="Create Activities"
          subLabel={`Last Create: ${updates.storyTitle}`}
          count={counts.storyCount}
          to="/head/create"
        />

        {/* tests card */}
        <DashboardCards
          image={read}
          label="Read Activities"
          subLabel={`Last Read: ${updates.testTitle}`}
          count={counts.testCount}
          to="/head/read"
        />

        {/* rewards card */}
        <DashboardCards
          image={update}
          label="Update Activities"
          subLabel={`Last Update: ${updates.rewardName}`}
          count={counts.rewardCount}
          to="/head/update"
        />

        {/* achievements and task card */}
        <DashboardCards
          image={remove}
          label="Delete Activities"
          subLabel={`Last Delete: ${updates.achievementName}`}
          count={counts.achievementCount}
          to="/head/delete"
        />
      </div>
    </div>
  );
};

export default HeadDashboard;
