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
        />
      ) : null}
      <div
        className="w-full l-s:w-[70%] l-s:ml-auto cstm-flex-row
                    l-l:w-[80%]"
      >
        <Link
          href="/controller/stories"
          className="w-fit hover:bg-black hover:bg-opacity-10 p-2 rounded-full mr-auto"
        >
          <BsArrowLeft className=" text-prmColor" />
        </Link>

        <Link
          href={`/controller/rewards/edit/${rewardId}`}
          className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full"
        >
          <AiFillEdit className=" text-prmColor cursor-pointer" />
        </Link>

        <div className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full">
          <AiFillDelete className="text-prmColor cursor-pointer" onClick={handleCanDeleteReward} />
        </div>
      </div>
      <div
        className="w-full l-s:w-[70%] l-s:ml-auto cstm-flex-col gap-2
                    l-l:w-[80%]"
      >
        <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
          <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl">
            <FileViewer src={reward?.reward} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-2 w-full shadow-md text-center cstm-flex-col gap-2">
          <p className="text-xs font-semibold text-prmColor">description</p>
          <p className="">{reward?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleReward;
