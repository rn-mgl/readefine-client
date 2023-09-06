"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import axios from "axios";
import Link from "next/link";
import Message from "@/src/src/components/global/Message";
import DeleteData from "@/src/src/admin/global/DeleteData";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import Image from "next/image";
import { useLoading } from "@/src/src/hooks/useLoading";
import FetchingMessage from "@/src/src/components/global/FetchingMessage";

const SingleReward = ({ params }) => {
  const [reward, setReward] = React.useState({});
  const [canDeleteReward, setCanDeleteReward] = React.useState(false);
  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

  const { loading, setLoadingState } = useLoading(true);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedRewardId = decipher(params?.reward_id);
  const router = useRouter();

  // toggle can delete reward
  const handleCanDeleteReward = () => {
    setCanDeleteReward((prev) => !prev);
  };

  // get reward data
  const getReward = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/admin_reward/${decodedRewardId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setReward(data);
        setLoadingState(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [setReward, setLoadingState, url, user, decodedRewardId]);

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
    <div className="w-full min-h-screen h-screen bg-accntColor p-5 cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader="Reward" mainHeader={reward?.reward_name} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canDeleteReward ? (
        <DeleteData
          apiRoute={`${url}/admin_reward/${decodedRewardId}`}
          returnRoute="/controller/rewards"
          confirmation={reward?.reward_name}
          handleCanDeleteData={handleCanDeleteReward}
        />
      ) : null}

      <div className="w-full cstm-w-limit cstm-flex-col h-full">
        <div className="cstm-flex-col gap-5 w-full l-s:w-10/12 l-l:w-8/12 h-full">
          {/* admin actions */}
          <div className="w-full cstm-flex-row">
            <Link href="/controller/rewards" className="cstm-bg-hover mr-auto">
              <BsArrowLeft className=" text-prmColor" />
            </Link>

            <Link href={`/controller/rewards/edit/${params?.reward_id}`} className="cstm-bg-hover">
              <AiFillEdit className=" text-prmColor cursor-pointer" />
            </Link>

            <button className="cstm-bg-hover" onClick={handleCanDeleteReward}>
              <AiFillDelete className="text-prmColor cursor-pointer" />
            </button>
          </div>

          {/* reward */}
          <div
            className="p-5 rounded-2xl gap-5 cstm-flex-col overflow-auto w-full h-full 
                        justify-start bg-white text-sm shadow-md cstm-scrollbar"
          >
            <div className="w-full cstm-flex-col bg-accntColor rounded-2xl p-5 h-full">
              <div className="w-fit animate-float drop-shadow-md saturate-150">
                <Image src={reward?.reward} alt="reward" width={300} height={300} className="rounded-2xl" />
              </div>
            </div>

            <div className="cstm-flex-col gap-5 h-[30%]">
              <p className="text-sm font-bold text-prmColor capitalize">{reward?.reward_type}</p>
              <div className="cstm-separator" />
              <p className="text-sm text-center max-h-28 overflow-y-auto cstm-scrollbar-2">
                {reward?.description} {loading ? <FetchingMessage /> : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReward;
