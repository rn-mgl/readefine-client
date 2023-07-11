"use client";
import React from "react";
import AdminPageHeader from "../../src/admin/global/PageHeader";
import DashboardCards from "../../src/admin/dashboard/DashboardCards";
import DashboardCardImage1 from "../../public/DashboardCardImage1.svg";
import DashboardCardImage2 from "../../public/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../public/DashboardCardImage3.svg";
import DashboardCardImage5 from "../../public/DashboardCardImage5.svg";
import DashboardCardImage6 from "../../public/DashboardCardImage6.svg";
import DashboardCardImage7 from "../../public/DashboardCardImage7.svg";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "../../context";
import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  const [counts, setCounts] = React.useState({});
  const [updates, setUpdates] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;

  const { url } = useGlobalContext();

  const getCounts = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_dashboard`, {
        params: { query: "counts" },
        headers: { Authorization: user.token },
      });
      if (data) {
        setCounts(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [user, url, setCounts]);

  const getUpdates = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_dashboard`, {
        params: { query: "updates" },
        headers: { Authorization: user.token },
      });
      if (data) {
        setUpdates(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [user, url, setUpdates]);

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

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Counts" mainHeader="Main Dashboard" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        <DashboardCards
          image={DashboardCardImage1}
          label="Users"
          subLabel={`New Member: ${updates.userName}`}
          count={counts.userCount}
          to="/controller/users"
        />
        <DashboardCards
          image={DashboardCardImage3}
          label="Stories"
          subLabel={`New Story: ${updates.storyTitle}`}
          count={counts.storyCount}
          to="/controller/stories"
        />
        <DashboardCards
          image={DashboardCardImage2}
          label="Tests"
          subLabel={`New Test: ${updates.testTitle}`}
          count={counts.testCount}
          to="/controller/tests"
        />
        <DashboardCards
          image={DashboardCardImage6}
          label="Rewards"
          subLabel={`New Reward: ${updates.rewardName}`}
          count={counts.rewardCount}
          to="/controller/rewards"
        />
        <DashboardCards
          image={DashboardCardImage5}
          label="Achievements & Tasks"
          subLabel={`New Achievement: ${updates.achievementName}`}
          count={counts.achievementCount}
          to="/controller/achievements"
        />
        <DashboardCards
          image={DashboardCardImage7}
          label="Minigames"
          subLabel="Extras"
          count={3}
          to="/controller/minigames"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
