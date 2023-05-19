import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import DashboardCardImage5 from "../../../public/DashboardCardImage5.svg";
import RewardsFilter from "@/src/components/src/admin/rewards/RewardsFilter";
import RewardsCards from "@/src/components/src/admin/rewards/RewardsCards";

const AdminRewards = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Rewards" />
      <RewardsFilter />
      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />{" "}
          <RewardsCards
            image={DashboardCardImage5}
            title="Reward Name"
            type="type"
            to="/controller/rewards/123"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminRewards;
