"use client";

import React from "react";
import axios from "axios";
import ClientPageHeader from "@/client/global/PageHeader";
import Link from "next/link";

import { useSession } from "next-auth/react";

import { BsArrowLeft, BsDot, BsTrophyFill } from "react-icons/bs";
import { BiMedal } from "react-icons/bi";
import Message from "@/components/global/Message";
import { useParams, useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import Image from "next/image";
import { useMessage } from "@/hooks/useMessage";

const SingleReward = () => {
  const [rewardData, setRewardData] = React.useState({});

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;
  const params = useParams();
  const decodedRewardId = params.reward_id;
  const router = useRouter();

  // get reward
  const getReward = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/reward/${decodedRewardId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setRewardData(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decodedRewardId, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getReward();
    }
  }, [user, getReward]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[1]);

      if (isExpired) {
        router.push("/login");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full cstm-flex-col p-4 gap-4 t:gap-4 justify-start h-full">
      <ClientPageHeader mainHeader="Readefine" subHeader="Your Reward" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className=" justify-start cstm-flex-col w-full relative z-10 h-full ">
        <div className="cstm-flex-col gap-4 w-full t:w-10/12 l-l:w-8/12 h-full">
          <Link className="cstm-bg-hover mr-auto" href="/archives/rewards">
            <BsArrowLeft className="text-accntColor scale-125" />
          </Link>

          <div
            className="cstm-flex-col bg-white rounded-2xl p-4 w-full 
                        shadow-solid gap-4 text-center h-full justify-start"
          >
            {/* reward */}
            <div className="cstm-flex-col p-4 rounded-2xl bg-accntColor w-full relative overflow-hidden h-full">
              <BiMedal className="absolute scale-[10] top-10 left-0 opacity-10 t:scale-[15] t:top-20 t:left-20 text-prmColor " />

              <div className="animate-float drop-shadow-md relative z-10 saturate-150 cstm-flex-col w-fit">
                <Image
                  src={rewardData?.reward}
                  alt="viewer"
                  width={350}
                  height={350}
                  className="rounded-2xl"
                  draggable={false}
                  priority
                />
              </div>

              <BsTrophyFill className="absolute scale-[7] bottom-5 right-0 opacity-10 t:scale-[12] t:bottom-20 t:right-24 text-prmColor " />
            </div>

            <div className="cstm-flex-col gap-4 h-[30%]">
              {/* name */}
              <p className="font-extrabold text-xl text-prmColor cstm-flex-row">
                <BsDot className="text-black" />

                {rewardData?.reward_name}

                <BsDot className="text-black" />
              </p>

              <div className="cstm-separator" />

              {/* description */}
              <p className="text-sm overflow-y-auto cstm-scrollbar-2 ">
                {rewardData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* animating background */}
      <div className=" cstm-light-rays" />
    </div>
  );
};

export default SingleReward;
