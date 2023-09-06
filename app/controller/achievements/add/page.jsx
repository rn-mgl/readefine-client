"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import AddAchievementFilter from "@/src/src/admin/achievements/AddAchievementFilter";
import FindRewards from "@/src/src/admin/rewards/FindRewards";
import axios from "axios";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsArrowLeft } from "react-icons/bs";
import Loading from "@/src/src/components/global/Loading";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import { useLoading } from "@/src/src/hooks/useLoading";

const AddAchievement = () => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });
  const [canSelectReward, setCanSelectReward] = React.useState(false);
  const { loading, setLoadingState } = useLoading(false);
  const [achievement, setAchievement] = React.useState({
    name: "",
    type: "user_session",
    task: "",
    goal: 0,
    reward: { name: "", id: "" },
  });

  const { data: session } = useSession({ required: true });
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // toggle can select reward
  const handleCanSelectReward = () => {
    setCanSelectReward((prev) => !prev);
  };

  // handle select reward
  const selectReward = (name, id) => {
    setAchievement((prev) => {
      return {
        ...prev,
        reward: { name, id },
      };
    });
  };

  // handle onchange on achievement data
  const handleAchievement = ({ name, value }) => {
    setAchievement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // add achievement
  const addAchievement = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoadingState(true);

    const { goal, name, reward, task, type } = achievement;

    if (!goal || !name || !reward.id || !task || !type) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: "Please fill in all achievement information.",
        type: "error",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_achievement`,
        { achievement },
        { headers: { Authorization: user.token } }
      );

      // move to main achievement after adding
      if (data) {
        router.push("/controller/achievements");
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Add Achievement" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canSelectReward ? (
        <FindRewards selectReward={selectReward} handleCanSelectReward={handleCanSelectReward} />
      ) : null}

      <form onSubmit={(e) => addAchievement(e)} className="w-full cstm-flex-col cstm-w-limit border-collapse gap-5">
        <Link type="button" href="/controller/achievements" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor cursor-pointer scale-125" />
        </Link>

        <AddAchievementFilter
          achievement={achievement}
          handleAchievement={handleAchievement}
          handleCanSelectReward={handleCanSelectReward}
        />

        <div
          className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start 
                      items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar"
        >
          <div className="cstm-flex-row w-full">
            <textarea
              name="name"
              id="name"
              cols="30"
              rows="1"
              required={true}
              placeholder="Achievement Title/Name"
              className="resize-none w-full p-2 focus:outline-none font-bold text-prmColor
                        mr-auto placeholder:opacity-50"
              value={achievement.name}
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
              required={true}
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
            className="w-fit text-center font-poppins ml-auto text-sm font-normal disabled:saturate-0
                   bg-prmColor text-accntColor rounded-full p-2 px-4"
          >
            Add Achievement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;
