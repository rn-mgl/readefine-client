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
import { decipher } from "@/src/src/functions/security";
import Loading from "@/src/src/components/global/Loading";

const EditAchievement = ({ params }) => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [canSelectReward, setCanSelectReward] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);
  const [achievement, setAchievement] = React.useState({
    achievement_name: "",
    achievement_type: "user_session",
    task: "",
    specifics: "days_online",
    goal: 0,
    reward: { name: "", id: "" },
  });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();
  const decodedAchievementId = decipher(params?.achievement_id);

  // toggle can select reward
  const handleCanSelectReward = () => {
    setCanSelectReward((prev) => !prev);
  };

  // select reward
  const selectReward = (name, id) => {
    setAchievement((prev) => {
      return {
        ...prev,
        reward_name: name,
        reward_id: id,
      };
    });
  };

  // handle achievement onchange
  const handleAchievement = ({ name, value }) => {
    setAchievement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // edit achievement
  const editAchievement = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoading(true);

    const { goal, achievement_name, reward_id, reward_name, specifics, task, achievement_type } =
      achievement;

    if (
      !goal ||
      !achievement_name ||
      !reward_id ||
      !reward_name ||
      !specifics ||
      !task ||
      !achievement_type
    ) {
      setHasSubmitted(false);
      setLoading(false);
      setMessage({
        active: true,
        msg: "Please fill in all achievement information.",
        type: "error",
      });
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_achievement/${decodedAchievementId}`,
        { achievement },
        { headers: { Authorization: user.token } }
      );

      // move to view page after editing
      if (data) {
        router.push(`/controller/achievements/${params?.achievement_id}`);
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  // get achievement data
  const getAchievement = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_achievement/${decodedAchievementId}`, {
        headers: { Authorization: user.token },
      });

      if (data) {
        setAchievement(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [user, url, setAchievement, decodedAchievementId]);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [user, getAchievement]);

  if (loading) {
    return <Loading />;
  }

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
            />
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
            />
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          <button
            type="submit"
            disabled={hasSubmitted}
            className="w-fit text-center font-poppins ml-auto text-sm font-normal bg-scndColor
                     text-prmColor rounded-full p-2 px-4 t:px-10 disabled:saturate-0"
          >
            Edit Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAchievement;
