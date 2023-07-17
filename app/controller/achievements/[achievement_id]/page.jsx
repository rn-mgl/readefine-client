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
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedAchievementId = decipher(params?.achievement_id);

  const handleCanDeleteAchievement = () => {
    setCanDeleteAchievement((prev) => !prev);
  };

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
      setMessage({ active: true, msg: error?.response?.data?.msg });
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

        <div className="w-full cstm-flex-col">
          <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
            <p className="font-bold text-prmColor text-sm">Task</p>
            <p className="text-sm text-justify">{achievement?.task}</p>
          </div>
        </div>

        <div className="cstm-flex-col t:cstm-flex-row w-full gap-5">
          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm">Achievement Type</p>
              <p className="text-justify font-bold text-prmColor text-2xl">
                {typeConversion[achievement?.achievement_type]}
              </p>
            </div>
          </div>

          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm">Task Specifics</p>
              <p className="text-justify font-bold text-prmColor text-2xl">
                {specificsConversion[achievement?.specifics]}
              </p>
            </div>
          </div>

          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-5 min-h-[12rem]">
              <p className="text-sm">Goal</p>
              <p className="text-justify font-bold text-prmColor text-2xl">{achievement?.goal}</p>
            </div>
          </div>
        </div>

        <div className="cstm-flex-col w-full gap-5">
          <div className="w-full cstm-flex-col h-full">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 h-full">
              <p className="text-sm">Reward Name</p>
              <p className="text-justify font-bold text-prmColor text-2xl">
                {achievement?.reward_name}
              </p>
            </div>
          </div>

          <div className="w-full cstm-flex-col">
            <div className="w-full p-5 bg-white rounded-2xl cstm-flex-col gap-2 min-h-[12rem]">
              <p className="text-sm text-prmColor font-bold">Reward</p>
              <div className="animate-float drop-shadow-lg">
                <FileViewer src={achievement?.reward} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAchievement;
