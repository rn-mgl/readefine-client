"use client";
import React from "react";
import AdminPageHeader from "@/src/components/src/admin/global/PageHeader";
import AddAchievementFilter from "@/src/src/admin/achievements/AddAchievementFilter";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FindRewards from "@/src/src/admin/rewards/FindRewards";
import axios from "axios";
import { useGlobalContext } from "@/src/context";

const AddAchievement = () => {
  const [achievement, setAchievement] = React.useState({
    name: "",
    type: "user_session",
    task: "",
    specifics: "days_online",
    goal: 0,
    reward: { name: "", id: "" },
  });
  const [canSelectReward, setCanSelectReward] = React.useState(false);
  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  const handleCanSelectReward = () => {
    setCanSelectReward((prev) => !prev);
  };

  const selectReward = (name, id) => {
    console.log(name, id);
    setAchievement((prev) => {
      return {
        ...prev,
        reward: { name, id },
      };
    });
  };

  const handleAchievement = ({ name, value }) => {
    setAchievement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(achievement);

  const addAchievement = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/admin_achievement`,
        { achievement },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push("/controller/achievements");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Add Achievement" />
      {canSelectReward ? (
        <FindRewards selectReward={selectReward} handleCanSelectReward={handleCanSelectReward} />
      ) : null}
      <form
        onSubmit={(e) => addAchievement(e)}
        className="w-full cstm-flex-col l-s:w-[70%] l-s:ml-auto border-collapse gap-2
                l-l:w-[80%]"
      >
        <AddAchievementFilter
          achievement={achievement}
          handleAchievement={handleAchievement}
          handleCanSelectReward={handleCanSelectReward}
        />
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
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4"
          >
            Add Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;
