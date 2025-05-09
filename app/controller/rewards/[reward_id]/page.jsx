"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import axios from "axios";
import Link from "next/link";
import Message from "@/components/global/Message";
import DeleteData from "@/admin/global/DeleteData";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";

import { useParams, useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import Image from "next/image";
import { useMessage } from "@/hooks/useMessage";

const SingleReward = () => {
  const [reward, setReward] = React.useState({});
  const [canDeleteReward, setCanDeleteReward] = React.useState(false);

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;
  const params = useParams();
  const rewardId = params?.reward_id;
  const router = useRouter();

  // toggle can delete reward
  const handleCanDeleteReward = () => {
    setCanDeleteReward((prev) => !prev);
  };

  // get reward data
  const getReward = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_reward/${rewardId}`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setReward(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, rewardId, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getReward();
    }
  }, [getReward, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full min-h-screen h-screen bg-accntColor p-4 cstm-flex-col gap-4 justify-start">
      <AdminPageHeader subHeader="Reward" mainHeader={reward?.reward_name} />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {canDeleteReward ? (
        <DeleteData
          apiRoute={`${url}/admin_reward/${rewardId}`}
          returnRoute="/controller/rewards"
          confirmation={reward?.reward_name}
          handleCanDeleteData={handleCanDeleteReward}
          resourceType="reward"
        />
      ) : null}

      <div className="w-full  cstm-flex-col h-full">
        <div className="cstm-flex-col gap-4 w-full t:w-10/12 l-l:w-8/12 h-full">
          {/* admin actions */}
          <div className="w-full cstm-flex-row">
            <Link href="/controller/rewards" className="cstm-bg-hover mr-auto">
              <BsArrowLeft className=" text-prmColor" />
            </Link>

            <Link
              href={`/controller/rewards/edit/${params?.reward_id}`}
              className="cstm-bg-hover"
            >
              <AiFillEdit className=" text-prmColor cursor-pointer" />
            </Link>

            <button className="cstm-bg-hover" onClick={handleCanDeleteReward}>
              <AiFillDelete className="text-prmColor cursor-pointer" />
            </button>
          </div>

          {/* reward */}
          <div
            className="p-4 rounded-2xl gap-4 cstm-flex-col w-full h-full 
                        justify-start bg-white text-sm shadow-md"
          >
            <div className="w-full cstm-flex-col bg-accntColor rounded-2xl p-4 h-full">
              <div className="w-fit animate-float drop-shadow-md saturate-150">
                <Image
                  src={reward?.reward}
                  alt="reward"
                  width={300}
                  height={300}
                  className="rounded-2xl"
                />
              </div>
            </div>

            <div className="cstm-flex-col gap-4 h-[30%]">
              <p className="text-sm font-bold text-prmColor capitalize">
                {reward?.reward_type}
              </p>
              <div className="cstm-separator" />
              <p className="text-sm text-center max-h-28 overflow-y-auto cstm-scrollbar-2">
                {reward?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReward;
