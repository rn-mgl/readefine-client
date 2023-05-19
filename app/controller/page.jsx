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

const AdminDashboard = () => {
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
          count={4}
          to="/controller/users"
        />
        <DashboardCards
          image={DashboardCardImage2}
          label="Stories"
          subLabel="new story: title"
          count={4}
          to="/controller/stories"
        />
        <DashboardCards
          image={DashboardCardImage3}
          label="Tests"
          subLabel="updated by: name"
          count={4}
          to="/controller/tests"
        />
        <DashboardCards
          image={DashboardCardImage4}
          label="Questions & Answers"
          subLabel="updated by: name"
          count={4}
          to="/controller/tests"
        />
        <DashboardCards
          image={DashboardCardImage5}
          label="Achievements & Tasks"
          subLabel="updated by: name"
          count={4}
          to="/controller/achievements"
        />
        <DashboardCards
          image={DashboardCardImage6}
          label="Rewards"
          subLabel="updated by: name"
          count={4}
          to="/controller/rewards"
        />
        <DashboardCards
          image={DashboardCardImage7}
          label="Riddles"
          subLabel="updated by: name"
          count={4}
          to="/controller/riddles"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
