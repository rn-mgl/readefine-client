"use client";

import React from "react";
import axios from "axios";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import FileViewer from "@/src/src/components/global/FileViewer";
import Link from "next/link";

import { decipher } from "@/src/src/functions/security";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BsArrowLeft, BsDot, BsTrophyFill } from "react-icons/bs";
import { BiMedal } from "react-icons/bi";

const SingleReward = ({ params }) => {
  const [rewardData, setRewardData] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedRewardId = decipher(params.reward_id);

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
    }
  }, [url, user, decodedRewardId]);

  React.useEffect(() => {
    if (user) {
      getReward();
    }
  }, [user, getReward]);

  return (
    <div className="w-full cstm-flex-col p-5 gap-2 t:gap-5 justify-start bg-accntColor max-h-screen h-screen">
      <ClientPageHeader mainHeader="Readefine" subHeader="Your Reward" />

      <div className="cstm-w-limit justify-start cstm-flex-col w-full relative z-10 h-auto">
        <div className="cstm-flex-col gap-2 w-full t:w-10/12 l-l:w-8/12 h-auto">
          <Link className="cstm-bg-hover mr-auto" href="/archives/rewards">
            <BsArrowLeft className="text-white scale-125" />
          </Link>

          <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full shadow-solid gap-5 text-center h-auto">
            {/* reward */}
            <div className="cstm-flex-col p-2 rounded-2xl bg-accntColor w-full relative overflow-hidden">
              <BiMedal className="absolute scale-[10] top-10 left-0 opacity-10 t:scale-[15] t:top-20 t:left-20 text-prmColor " />

              <div className="animate-float drop-shadow-md relative z-10">
                <FileViewer src={rewardData?.reward} />
              </div>

              <BsTrophyFill className="absolute scale-[7] bottom-5 right-0 opacity-10 t:scale-[12] t:bottom-20 t:right-24 text-prmColor " />
            </div>

            {/* name */}
            <p className="font-extrabold text-xl text-prmColor cstm-flex-row">
              <BsDot className="text-black" />

              {rewardData?.reward_name}

              <BsDot className="text-black" />
            </p>

            <div className="cstm-separator" />

            {/* description */}
            <p className="text-sm">{rewardData?.description}</p>
          </div>
        </div>
      </div>

      {/* animating background */}
      <div className="cstm-w-limit cstm-light-rays" />
    </div>
  );
};

export default SingleReward;
