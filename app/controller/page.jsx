"use client";
import React from "react";
import axios from "axios";
import AdminPageHeader from "../../src/admin/global/PageHeader";
import DashboardCards from "../../src/admin/dashboard/DashboardCards";
import DashboardCardImage1 from "../../public/dashboard/DashboardCardImage1.svg";
import DashboardCardImage2 from "../../public/dashboard/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../public/dashboard/DashboardCardImage3.svg";
import DashboardCardImage5 from "../../public/dashboard/DashboardCardImage5.svg";
import DashboardCardImage6 from "../../public/dashboard/DashboardCardImage6.svg";
import DashboardCardImage7 from "../../public/dashboard/DashboardCardImage7.svg";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "../../context";
import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  const [counts, setCounts] = React.useState({});
  const [updates, setUpdates] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;

  const { url } = useGlobalContext();

  // get dashboard counts
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

  // get dashboard updates
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "info" });
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
        {/* users card */}
        <DashboardCards
          image={DashboardCardImage1}
          label="Users"
          subLabel={`New Member: ${updates.userName}`}
          count={counts.userCount}
          to="/controller/users"
        />

        {/* stories card */}
        <DashboardCards
          image={DashboardCardImage3}
          label="Stories"
          subLabel={`New Story: ${updates.storyTitle}`}
          count={counts.storyCount}
          to="/controller/stories"
        />

        {/* tests card */}
        <DashboardCards
          image={DashboardCardImage2}
          label="Tests"
          subLabel={`New Test: ${updates.testTitle}`}
          count={counts.testCount}
          to="/controller/tests"
        />

        {/* rewards card */}
        <DashboardCards
          image={DashboardCardImage6}
          label="Rewards"
          subLabel={`New Reward: ${updates.rewardName}`}
          count={counts.rewardCount}
          to="/controller/rewards"
        />

        {/* achievements and task card */}
        <DashboardCards
          image={DashboardCardImage5}
          label="Achievements & Tasks"
          subLabel={`New Achievement: ${updates.achievementName}`}
          count={counts.achievementCount}
          to="/controller/achievements"
        />

        {/* minigames card */}
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
