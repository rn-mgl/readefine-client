"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FilePreview from "@/src/src/components/global/FilePreview";
import axios from "axios";
import EditRewardFilter from "@/src/src/admin/rewards/EditRewardFilter";
import Message from "@/src/src/components/global/Message";
import * as fileFns from "../../../../../src/functions/fileFns";

import { BiImage } from "react-icons/bi";
import { wordCount } from "@/src/src/functions/wordCount";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";

const EditReward = ({ params }) => {
  const [reward, setReward] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { data: session } = useSession();
  const { url } = useGlobalContext();

  const user = session?.user?.name;
  const rewardId = params?.reward_id;
  const words = wordCount(reward.description);
  const router = useRouter();

  const handleReward = ({ name, value }) => {
    setReward((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clearUploadedReward = () => {
    setReward((prev) => {
      return {
        ...prev,
        reward: null,
      };
    });
  };

  const editReward = async (e) => {
    e.preventDefault();
    const { reward_name, reward_type, description, rawFile } = reward;

    let imageSrc = null;

    if (rawFile) {
      imageSrc = await fileFns.uploadFile(url, rawFile, user.token, axios);
    }

    try {
      const newReward = imageSrc ? imageSrc : reward.reward;
      const { data } = await axios.patch(
        `${url}/admin_reward/${rewardId}`,
        { reward_name, reward_type, reward: newReward, description },
        { headers: { Authorization: user.token } }
      );
      if (data) {
        router.push(`/controller/rewards/${rewardId}`);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
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
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [setReward, url, user, rewardId]);

  React.useEffect(() => {
    if (user) {
      getReward();
    }
  }, [getReward, user]);
  console.log(reward);
  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col gap-2 justify-start">
      <AdminPageHeader subHeader={reward?.reward_name} mainHeader="Edit Reward" />
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <form
        onSubmit={(e) => editReward(e)}
        className="w-full cstm-flex-col border-collapse gap-2 cstm-w-limit"
      >
        <EditRewardFilter handleReward={handleReward} reward={reward} />
        <div
          className="cstm-flex-col gap-5 w-full
                      l-s:cstm-flex-row"
        >
          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
            <div className="cstm-flex-row w-full">
              <textarea
                name="reward_name"
                id="reward_name"
                cols="30"
                rows="1"
                placeholder="Reward Name"
                onChange={(e) => handleReward(e.target)}
                value={reward.reward_name}
                className="resize-none p-2 focus:outline-none font-bold text-prmColor mr-auto placeholder:opacity-50"
              ></textarea>
            </div>

            <div className="cstm-separator" />
            <div className="w-full h-full cstm-flex-col">
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="1"
                placeholder="description..."
                onChange={(e) => handleReward(e.target)}
                value={reward.description}
                className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
              ></textarea>
              <p className="ml-auto whitespace-nowrap">words: {words}</p>
            </div>
          </div>

          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl">
              {reward.reward || reward.file?.src ? (
                <FilePreview
                  src={reward.reward ? reward.reward : reward.file.src}
                  clearFiles={() => {
                    fileFns.clearFiles(setReward);
                    clearUploadedReward();
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          <label className="mr-auto cstm-bg-hover" htmlFor="file">
            <input
              accept="image/*"
              type="file"
              className="hidden peer"
              name="file"
              id="file"
              onChange={(e) => fileFns.selectedFileViewer(e, setReward)}
            />
            <BiImage className="scale-150 text-prmColor peer-checked" />
          </label>

          <button
            type="submit"
            className="w-fit text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4
                t:text-base"
          >
            Edit Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReward;
