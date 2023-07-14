"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FindRewards from "@/src/src/admin/rewards/FindRewards";
import Link from "next/link";
import axios from "axios";
import EditAchievementFilter from "@/src/src/admin/achievements/EditAchievementFilter";
import Message from "@/src/src/components/global/Message";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";

const EditAchievement = ({ params }) => {
  const [achievement, setAchievement] = React.useState({
    name: "",
    type: "user_session",
    task: "",
    specifics: "days_online",
    goal: 0,
    reward: { name: "", id: "" },
  });
  const [canSelectReward, setCanSelectReward] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();

  const user = session?.user?.name;
  const router = useRouter();
  const achievementId = params?.achievement_id;

  const handleCanSelectReward = () => {
    setCanSelectReward((prev) => !prev);
  };

  const selectReward = (name, id) => {
    setAchievement((prev) => {
      return {
        ...prev,
        reward_name: name,
        reward_id: id,
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

  const editAchievement = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${url}/admin_achievement/${achievementId}`,
        { achievement },
        { headers: { Authorization: user.token } }
      );

      if (data) {
        router.push(`/controller/achievements/${achievementId}`);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_achievement/${achievementId}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        setAchievement(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [user, url, setAchievement, achievementId]);

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [getAchievement, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Edit Achievement" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      {canSelectReward ? (
        <FindRewards selectReward={selectReward} handleCanSelectReward={handleCanSelectReward} />
      ) : null}
      <form
        onSubmit={(e) => editAchievement(e)}
        className="w-full cstm-flex-col cstm-w-limit border-collapse gap-2"
      >
        <Link href="/controller/achievements" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor cursor-pointer scale-125" />
        </Link>

        <EditAchievementFilter
          achievement={achievement}
          handleAchievement={handleAchievement}
          handleCanSelectReward={handleCanSelectReward}
        />
        <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
          <div className="cstm-flex-row w-full">
            <textarea
              name="achievement_name"
              id="achievement_name"
              cols="30"
              rows="1"
              placeholder="Achievement Title/Name"
              className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto placeholder:opacity-50"
              value={achievement.achievement_name}
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
              value={achievement.task}
              onChange={(e) => handleAchievement(e.target)}
            ></textarea>
          </div>
        </div>
        <div className="pt-4 cstm-flex-row w-full">
          <button
            type="submit"
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor text-prmColor rounded-full p-2 px-4"
          >
            Edit Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAchievement;
