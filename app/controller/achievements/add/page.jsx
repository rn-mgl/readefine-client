"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import AddAchievementFilter from "@/src/components/src/admin/achievements/AddAchievementFilter";
import { useRouter } from "next/navigation";
import { adminIsLogged } from "@/src/components/src/security/verifications";
import { useSession } from "next-auth/react";

const AddAchievement = () => {
  const [achievement, setAchievement] = React.useState({
    name: "",
    type: "",
    task: "",
    goal: 0,
    reward: 0,
  });
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  const handleAchievement = ({ name, value }) => {
    setAchievement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Add Achievement" />
      <AddAchievementFilter achievement={achievement} handleAchievement={handleAchievement} />
      <form
        action=""
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse
                l-l:w-[80%]"
      >
        <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
          <div className="cstm-flex-row w-full">
            <textarea
              name="name"
              id="name"
              cols="30"
              rows="1"
              placeholder="Achievement Title/Name"
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto placeholder:opacity-50"
              onChange={(e) => handleAchievement(e.target)}
            ></textarea>
          </div>

          <div className="cstm-separator" />
          <div className="w-full h-full cstm-flex-col">
            <textarea
              name="task"
              id="task"
              cols="30"
              rows="1"
              placeholder="task..."
              className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
              onChange={(e) => handleAchievement(e.target)}
            ></textarea>
          </div>
        </div>
        <div className="pt-4 cstm-flex-row w-full">
          <button
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Add Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;
