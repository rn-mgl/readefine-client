import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import riddles from "@/public/minigames/Riddles.svg";
import dangle from "@/public/minigames/Dangle.svg";
import decipher from "@/public/minigames/Decipher.svg";
import AdminMinigamesCards from "@/admin/minigames/AdminMinigamesCards";

const Minigames = () => {
  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader mainHeader="Minigames" subHeader="Readefine" />
      <div
        className="cstm-flex-col gap-4 justify-start w-full transition-all
        t:cstm-flex-row t:flex-wrap
        cstm-w-limit"
      >
        <AdminMinigamesCards image={riddles} label="Riddles" to="/controller/minigames/riddles" />
        <AdminMinigamesCards image={dangle} label="Dangle" to="/controller/minigames/dangle" />
        <AdminMinigamesCards image={decipher} label="Decipher" to="/controller/minigames/decipher" />
      </div>
    </div>
  );
};

export default Minigames;
