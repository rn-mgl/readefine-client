"use client";

import React from "react";
import axios from "axios";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import Link from "next/link";

import { decipher } from "@/src/src/functions/security";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft, BsDot, BsTrophyFill } from "react-icons/bs";
import { BiMedal } from "react-icons/bi";
import Message from "@/src/src/components/global/Message";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/src/src/functions/jwtFns";
import Image from "next/image";

const SingleReward = ({ params }) => {
  const [rewardData, setRewardData] = React.useState({});

  const [message, setMessage] = React.useState({
    msg: "",
    active: false,
    type: "info",
  });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedRewardId = decipher(params.reward_id);
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

      setMessage({
        active: true,
        msg: error?.response?.data?.msg,
        type: "error",
      });
    }
  }, [url, user?.token, decodedRewardId]);

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
    <div className="w-full cstm-flex-col p-5 gap-5 t:gap-5 justify-start bg-accntColor max-h-screen h-screen">
      <ClientPageHeader mainHeader="Readefine" subHeader="Your Reward" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <div className="cstm-w-limit justify-start cstm-flex-col w-full relative z-10 h-full">
        <div className="cstm-flex-col gap-5 w-full t:w-10/12 l-l:w-8/12 h-full">
          <Link className="cstm-bg-hover mr-auto" href="/archives/rewards">
            <BsArrowLeft className="text-white scale-125" />
          </Link>

          <div
            className="cstm-flex-col bg-white rounded-2xl p-5 w-full 
                        shadow-solid gap-5 text-center h-full justify-start"
          >
            {/* reward */}
            <div className="cstm-flex-col p-5 rounded-2xl bg-accntColor w-full relative overflow-hidden h-full">
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

            <div className="cstm-flex-col gap-5 h-[30%]">
              {/* name */}
              <p className="font-extrabold text-xl text-prmColor cstm-flex-row">
                <BsDot className="text-black" />

                {rewardData?.reward_name}

                <BsDot className="text-black" />
              </p>

              <div className="cstm-separator" />

              {/* description */}
              <p className="text-sm overflow-y-auto cstm-scrollbar-2 ">{rewardData?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* animating background */}
      <div className="cstm-w-limit cstm-light-rays" />
    </div>
  );
};

export default SingleReward;
