"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FileViewer from "@/src/src/components/global/FileViewer";
import axios from "axios";
import Link from "next/link";
import DeleteReward from "@/src/src/admin/rewards/DeleteReward";
import Message from "@/src/src/components/global/Message";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { decipher } from "@/src/src/functions/security";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const SingleReward = ({ params }) => {
  const [reward, setReward] = React.useState({});
  const [canDeleteReward, setCanDeleteReward] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });

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
    try {
      const { data } = await axios.get(`${url}/admin_reward/${decodedRewardId}`, {
        headers: { Authorization: user.token },
      });
      if (data) {
        setReward(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [setReward, url, user, decodedRewardId]);

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
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader="Reward" mainHeader={reward?.reward_name} />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      {canDeleteReward ? (
        <DeleteReward
          confirmation={reward?.reward_name}
          handleCanDeleteReward={handleCanDeleteReward}
          rewardId={decodedRewardId}
        />
      ) : null}

      <div className="w-full cstm-w-limit cstm-flex-col">
        <div className="cstm-flex-col gap-2 w-full l-s:w-10/12 l-l:w-8/12">
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
          <div className="p-5 rounded-2xl gap-5 cstm-flex-col overflow-auto w-full h-[80vh] justify-start bg-white text-sm shadow-md cstm-scrollbar">
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl p-5">
              <div className="w-fit animate-float drop-shadow-md saturate-150">
                <FileViewer src={reward?.reward} />
              </div>
            </div>

            <p className="text-sm font-bold text-prmColor capitalize">{reward?.reward_type}</p>

            <div className="cstm-separator" />

            <p className="text-sm text-center">{reward?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReward;
