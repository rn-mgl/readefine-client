"use client";

import React from "react";
import axios from "axios";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Link from "next/link";
import FileViewer from "@/src/src/components/global/FileViewer";
import DeleteAchievement from "@/src/src/admin/achievements/DeleteAchievement";
import Message from "@/src/src/components/global/Message";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { specificsConversion, typeConversion } from "@/src/src/functions/typeConversion";
import { decipher } from "@/src/src/functions/security";

const SingleAchievement = ({ params }) => {
  const [achievement, setAchievement] = React.useState({});
  const [canDeleteAchievement, setCanDeleteAchievement] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedAchievementId = decipher(params?.achievement_id);

  // toggle can delete achievement
  const handleCanDeleteAchievement = () => {
    setCanDeleteAchievement((prev) => !prev);
  };

  // get achievement
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

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [getAchievement, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col justify-start gap-2">
      <AdminPageHeader subHeader="Achievement" mainHeader={achievement.achievement_name} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canDeleteAchievement ? (
        <DeleteAchievement
          confirmation={achievement.achievement_name}
          handleCanDeleteAchievement={handleCanDeleteAchievement}
          achievementId={decodedAchievementId}
        />
      ) : null}

      <div className="cstm-flex-col cstm-w-limit w-full gap-5">
        <div className="cstm-flex-row text-prmColor w-full">
          <Link href="/controller/achievements" className="cstm-bg-hover mr-auto">
            <BsArrowLeft />
          </Link>

          <Link
            href={`/controller/achievements/edit/${params?.achievement_id}`}
            className="cstm-bg-hover"
          >
            <AiFillEdit />
          </Link>

          <button onClick={handleCanDeleteAchievement} className="cstm-bg-hover">
            <AiFillDelete />
          </button>
        </div>

        {/* task */}
        <div className="w-full cstm-flex-col">
          <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
            <p className=" text-sm">Task</p>

            <p className="text-center text-prmColor font-bold text-xl">{achievement?.task}</p>
          </div>
        </div>

        {/* achievement type */}
        <div className="cstm-flex-col t:cstm-flex-row w-full gap-5">
          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm">Achievement Type</p>

              <p className="text-justify font-bold text-prmColor text-xl">
                {typeConversion[achievement?.achievement_type]}
              </p>
            </div>
          </div>

          {/* specifics */}
          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm">Task Specifics</p>

              <p className="text-justify font-bold text-prmColor text-xl">
                {specificsConversion[achievement?.specifics]}
              </p>
            </div>
          </div>

          {/* goal */}
          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm">Goal</p>

              <p className="text-justify font-bold text-prmColor text-xl">{achievement?.goal}</p>
            </div>
          </div>
        </div>

        {/* reward name */}
        <div className="cstm-flex-col t:cstm-flex-row w-full gap-5 t:h-80">
          <div className="w-full cstm-flex-col h-full">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 h-full">
              <p className="text-sm">Reward Name</p>

              <p className="text-justify font-bold text-prmColor text-xl">
                {achievement?.reward_name}
              </p>
            </div>
          </div>

          {/* reward */}
          <div className="w-full cstm-flex-col h-full">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-5 h-full ">
              <div className="drop-shadow-lg w-full animate-float t:w-60 saturate-150">
                <FileViewer src={achievement?.reward} width="w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAchievement;
