"use client";
import React from "react";
import AdminPageHeader from "../../../src/admin/global/PageHeader";
import DashboardCardImage6 from "../../../public/DashboardCardImage6.svg";
import AchievementsFilter from "@/src/components/src/admin/achievements/AchievementsFilter";
import AchievementsCards from "@/src/components/src/admin/achievements/AchievementsCards";
import { useRouter } from "next/navigation";
import { adminIsLogged } from "@/src/components/src/security/verifications";

const AdminAchievements = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!adminIsLogged()) {
      router.push("/filter");
    }
  }, [adminIsLogged, router]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Readefine" mainHeader="Achievements & Tasks" />
      <AchievementsFilter />
      <div
        className="w-full     
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
      >
        <div
          className="cstm-flex-col gap-5 justify-start w-full transition-all 
                  t:cstm-flex-row t:flex-wrap"
        >
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
          <AchievementsCards
            image={DashboardCardImage6}
            title="Achievement"
            type="type"
            goal={300}
            to="/controller/achievements/123"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAchievements;
