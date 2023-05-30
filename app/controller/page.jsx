"use client";
import React from "react";
import AdminPageHeader from "../../src/admin/global/PageHeader";
import DashboardCards from "../../src/admin/dashboard/DashboardCards";
import DashboardCardImage1 from "../../public/DashboardCardImage1.svg";
import DashboardCardImage2 from "../../public/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../public/DashboardCardImage3.svg";
import DashboardCardImage4 from "../../public/DashboardCardImage4.svg";
import DashboardCardImage5 from "../../public/DashboardCardImage5.svg";
import DashboardCardImage6 from "../../public/DashboardCardImage6.svg";
import DashboardCardImage7 from "../../public/DashboardCardImage7.svg";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useGlobalContext } from "../../context";

const AdminDashboard = () => {
  const [counts, setCounts] = React.useState({});

  const { data: session } = useSession({ required: true });

  const user = session?.user?.name;

  const { url } = useGlobalContext();

  const getCounts = React.useCallback(async () => {
    if (user) {
      try {
        const { data } = await axios.get(`${url}/admin_dashboard`, {
          headers: { Authorization: user.token },
        });
        if (data) {
          setCounts(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, url, setCounts]);

  React.useEffect(() => {
    getCounts();
  }, [getCounts]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Counts" mainHeader="Main Dashboard" />
      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        l-s:w-[70%] l-s:ml-auto
        l-l:w-[80%]"
      >
        <DashboardCards
          image={DashboardCardImage1}
          label="Users"
          subLabel="new member: name"
          count={counts.userCount}
          to="/controller/users"
        />
        <DashboardCards
          image={DashboardCardImage3}
          label="Stories"
          subLabel="new story: title"
          count={counts.storyCount}
          to="/controller/stories"
        />
        <DashboardCards
          image={DashboardCardImage2}
          label="Tests"
          subLabel="updated by: name"
          count={counts.testCount}
          to="/controller/tests"
        />
        <DashboardCards
          image={DashboardCardImage4}
          label="Questions & Answers"
          subLabel="updated by: name"
          count={counts.questionCount}
          to="/controller/tests"
        />
        <DashboardCards
          image={DashboardCardImage6}
          label="Rewards"
          subLabel="updated by: name"
          count={counts.rewardCount}
          to="/controller/rewards"
        />
        <DashboardCards
          image={DashboardCardImage5}
          label="Achievements & Tasks"
          subLabel="updated by: name"
          count={counts.achievementCount}
          to="/controller/achievements"
        />
        <DashboardCards
          image={DashboardCardImage7}
          label="Riddles"
          subLabel="updated by: name"
          count={counts.riddleCount}
          to="/controller/riddles"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
