"use client";
import React from "react";
import axios from "axios";
import AdminPageHeader from "@/admin/global/PageHeader";
import DashboardCards from "@/admin/dashboard/DashboardCards";
import users from "@/public/dashboard/admin/Users.svg";
import activities from "@/public/dashboard/admin/Activities.svg";
import stories from "@/public/dashboard/admin/Stories.svg";
import tests from "@/public/dashboard/admin/Tests.svg";
import rewards from "@/public/dashboard/admin/Rewards.svg";
import achievements from "@/public/dashboard/admin/Achievements.svg";
import minigames from "@/public/dashboard/admin/Minigames.svg";
import Message from "@/components/global/Message";

import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const AdminDashboard = () => {
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
      const { data } = await axios.get(`${url}/admin_dashboard`, {
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
      const { data } = await axios.get(`${url}/admin_dashboard`, {
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
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Counts" mainHeader="Main Dashboard" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div
        className="cstm-flex-col gap-4 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        {/* activities card */}
        <DashboardCards
          image={activities}
          label="All Activities"
          subLabel={`Last Activity by: ${updates.lastActivityBy}`}
          count={counts.activityCount}
          to="/controller/activities"
        />

        {/* users card */}
        <DashboardCards
          image={users}
          label="Users"
          subLabel={`New Member: ${updates.userName}`}
          count={counts.userCount}
          to="/controller/users"
        />

        {/* stories card */}
        <DashboardCards
          image={stories}
          label="Stories"
          subLabel={`New Story: ${updates.storyTitle}`}
          count={counts.storyCount}
          to="/controller/stories"
        />

        {/* tests card */}
        <DashboardCards
          image={tests}
          label="Tests"
          subLabel={`New Test: ${updates.testTitle}`}
          count={counts.testCount}
          to="/controller/tests"
        />

        {/* rewards card */}
        <DashboardCards
          image={rewards}
          label="Rewards"
          subLabel={`New Reward: ${updates.rewardName}`}
          count={counts.rewardCount}
          to="/controller/rewards"
        />

        {/* achievements and task card */}
        <DashboardCards
          image={achievements}
          label="Achievements & Tasks"
          subLabel={`New Achievement: ${updates.achievementName}`}
          count={counts.achievementCount}
          to="/controller/achievements"
        />

        {/* minigames card */}
        <DashboardCards image={minigames} label="Minigames" subLabel="Extras" count={3} to="/controller/minigames" />
      </div>
    </div>
  );
};

export default AdminDashboard;
