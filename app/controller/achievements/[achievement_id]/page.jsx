"use client";

import React from "react";
import axios from "axios";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import Link from "next/link";
import FileViewer from "@/src/src/components/global/FileViewer";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { specificsConversion, typeConversion } from "@/src/src/functions/typeConversion";
import DeleteAchievement from "@/src/src/admin/achievements/DeleteAchievement";

const SingleAchievement = ({ params }) => {
  const [achievement, setAchievement] = React.useState({});
  const [canDeleteAchievement, setCanDeleteAchievement] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const achievementId = params?.achievement_id;

  const handleCanDeleteAchievement = () => {
    setCanDeleteAchievement((prev) => !prev);
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
    }
  }, [user, url, setAchievement]);

  React.useEffect(() => {
    if (user) {
      getAchievement();
    }
  }, [getAchievement, user]);

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col justify-start gap-2">
      <AdminPageHeader subHeader="Achievement" mainHeader={achievement.achievement_name} />
      {canDeleteAchievement ? (
        <DeleteAchievement
          confirmation={achievement.achievement_name}
          handleCanDeleteAchievement={handleCanDeleteAchievement}
          achievementId={achievementId}
        />
      ) : null}
      <div
        className="cstm-flex-col l-s:w-[70%] l-s:ml-auto w-full gap-2
                  l-l:w-[80%]"
      >
        <div className="cstm-flex-row text-prmColor w-full t:w-10/12 l-l:w-8/12">
          <div className="cstm-bg-hover mr-auto">
            <Link href="/controller/achievements">
              <BsArrowLeft />
            </Link>
          </div>
          <div className="cstm-bg-hover">
            <Link href={`/controller/achievements/edit/${achievementId}`}>
              <AiFillEdit />
            </Link>
          </div>
          <div className="cstm-bg-hover">
            <AiFillDelete onClick={handleCanDeleteAchievement} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white cstm-flex-col w-full justify-start h-fit items-start gap-5 t:w-10/12 l-l:w-8/12">
          <div className="cstm-flex-row gap-2">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Title
            </p>
            <p>{achievement.achievement_name}</p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-row gap-2">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Type
            </p>
            <p>{typeConversion[achievement.achievement_type]}</p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-row gap-2">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Specifics
            </p>
            <p>{specificsConversion[achievement.specifics]}</p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-row gap-2">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Goal
            </p>
            <p>{achievement.goal}</p>
          </div>

          <div className="cstm-separator" />

          <div className="cstm-flex-row gap-2 items-start">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Task
            </p>
            <p className="text-justify">{achievement.task}</p>
          </div>

          <div className="cstm-separator" />
          <div className="cstm-flex-col gap-2 items-start w-fit">
            <p className="px-2 py-1 font-bold text-white rounded-md bg-gradient-to-r from-prmColor to-scndColor">
              Reward
            </p>
            <div className="drop-shadow-md animate-float">
              <FileViewer src={achievement.reward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAchievement;
