"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import FindRewards from "@/admin/rewards/FindRewards";
import Link from "next/link";
import axios from "axios";
import EditAchievementFilter from "@/admin/achievements/EditAchievementFilter";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { BsArrowLeft } from "react-icons/bs";

import { isTokenExpired } from "@/functions/jwtFns";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";

const EditAchievement = () => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [canSelectReward, setCanSelectReward] = React.useState(false);
  const [achievement, setAchievement] = React.useState({
    achievement_name: "",
    achievement_type: "user_session",
    task: "",
    goal: 0,
    reward: { name: "", id: "" },
  });

  const { loading, setLoadingState } = useLoading(false);
  const { createAdminActivity } = useAdminActivities();
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
  const router = useRouter();
  const params = useParams();
  const decodedAchievementId = params?.achievement_id;

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
    setLoadingState(true);

    const {
      goal,
      achievement_name,
      reward_id,
      reward_name,
      task,
      achievement_type,
    } = achievement;

    if (
      !goal ||
      !achievement_name ||
      !reward_id ||
      !reward_name ||
      !task ||
      !achievement_type
    ) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "Please fill in all achievement information.",
        "error"
      );
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_achievement/${decodedAchievementId}`,
        { achievement },
        { headers: { Authorization: user?.token } }
      );

      // move to view page after editing
      if (data) {
        const activityData = await createAdminActivity(
          "achievement",
          achievement.achievement_name,
          "U"
        );

        if (activityData) {
          router.push(`/controller/achievements/${params?.achievement_id}`);
        }
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get achievement data
  const getAchievement = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(
          `${url}/admin_achievement/${decodedAchievementId}`,
          {
            headers: { Authorization: user?.token },
          }
        );

        if (data) {
          setAchievement(data);
        }
      } catch (error) {
        console.log(error);
        setMessageStatus(true, error?.response?.data?.msg, "error");
      }
    }
  }, [user?.token, url, decodedAchievementId, setMessageStatus]);

  React.useEffect(() => {
    getAchievement();
  }, [getAchievement]);

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
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Achievements" mainHeader="Edit Achievement" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {canSelectReward ? (
        <FindRewards
          selectReward={selectReward}
          handleCanSelectReward={handleCanSelectReward}
        />
      ) : null}

      <form
        onSubmit={(e) => editAchievement(e)}
        className="w-full cstm-flex-col  border-collapse gap-4"
      >
        <Link href="/controller/achievements" className="cstm-bg-hover mr-auto">
          <BsArrowLeft className="text-prmColor cursor-pointer text-xl" />
        </Link>

        <EditAchievementFilter
          achievement={achievement}
          handleAchievement={handleAchievement}
          handleCanSelectReward={handleCanSelectReward}
        />

        <div
          className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] 
                      justify-start items-start bg-white text-sm gap-4 shadow-md cstm-scrollbar"
        >
          <div className="cstm-flex-row w-full">
            <textarea
              name="achievement_name"
              id="achievement_name"
              cols="30"
              rows="1"
              placeholder="Achievement Title/Name"
              className="resize-none w-full p-2 focus:outline-none font-bold 
                        text-prmColor mr-auto placeholder:opacity-50"
              value={achievement.achievement_name}
              required={true}
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
              required={true}
              onChange={(e) => handleAchievement(e.target)}
            />
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          <button
            type="submit"
            disabled={hasSubmitted}
            className="w-fit text-center  ml-auto text-sm font-semibold bg-scndColor
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
