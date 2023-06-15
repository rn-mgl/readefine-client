"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FileViewer from "@/src/src/components/global/FileViewer";
import axios from "axios";
import Link from "next/link";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import DeleteReward from "@/src/src/admin/rewards/DeleteReward";

const SingleReward = ({ params }) => {
  const [reward, setReward] = React.useState({});
  const [canDeleteReward, setCanDeleteReward] = React.useState(false);

  const { data: session } = useSession();
  const user = session?.user?.name;
  const rewardId = params?.reward_id;
  const { url } = useGlobalContext();

  const handleCanDeleteReward = () => {
    setCanDeleteReward((prev) => !prev);
  };

  const getReward = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_reward/${rewardId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setReward(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setReward, url, user]);

  React.useEffect(() => {
    if (user) {
      getReward();
    }
  }, [getReward, user]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Reward" mainHeader={reward?.reward_name} />
      {canDeleteReward ? (
        <DeleteReward
          confirmation={reward?.reward_name}
          handleCanDeleteReward={handleCanDeleteReward}
          rewardId={rewardId}
        />
      ) : null}

      <div className="w-full cstm-w-limit cstm-flex-col">
        <div className="cstm-flex-col gap-2 w-full l-s:w-10/12 l-l:w-8/12">
          <div className="w-full cstm-flex-row">
            <Link href="/controller/rewards" className="cstm-bg-hover mr-auto">
              <BsArrowLeft className=" text-prmColor" />
            </Link>

            <Link href={`/controller/rewards/edit/${rewardId}`} className="cstm-bg-hover">
              <AiFillEdit className=" text-prmColor cursor-pointer" />
            </Link>

            <div className="cstm-bg-hover">
              <AiFillDelete
                className="text-prmColor cursor-pointer"
                onClick={handleCanDeleteReward}
              />
            </div>
          </div>
          <div className="p-5 rounded-2xl gap-5 cstm-flex-col overflow-auto w-full h-[80vh] justify-start bg-white text-sm shadow-md cstm-scrollbar">
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl p-5">
              <div className="w-fit animate-float drop-shadow-md">
                <FileViewer src={reward?.reward} />
              </div>
            </div>
            <p className="text-sm font-bold text-prmColor">{reward?.reward_type}</p>
            <div className="cstm-separator" />
            <p className="text-sm text-center">{reward?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReward;
