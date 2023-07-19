import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import DashboardCardImage2 from "../../../public/dashboard/DashboardCardImage2.svg";
import DashboardCardImage3 from "../../../public/dashboard/DashboardCardImage3.svg";
import DashboardCardImage6 from "../../../public/dashboard/DashboardCardImage6.svg";
import AdminMinigamesCards from "@/src/src/admin/minigames/AdminMinigamesCards";

const Minigames = () => {
  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader mainHeader="Minigames" subHeader="Readefine" />
      <div
        className="cstm-flex-col gap-5 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        <AdminMinigamesCards
          image={DashboardCardImage2}
          label="Riddles"
          to="/controller/minigames/riddles"
        />
        <AdminMinigamesCards
          image={DashboardCardImage3}
          label="Dangle"
          to="/controller/minigames/dangle"
        />
        <AdminMinigamesCards
          image={DashboardCardImage6}
          label="Decipher"
          to="/controller/minigames/decipher"
        />
      </div>
    </div>
  );
};

export default Minigames;
