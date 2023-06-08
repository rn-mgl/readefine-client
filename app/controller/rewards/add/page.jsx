"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FilePreview from "@/src/src/components/global/FilePreview";
import AddRewardFilter from "@/src/src/admin/rewards/AddRewardFilter";

import * as fileFns from "../../../../src/functions/fileFns";
import { BiImage } from "react-icons/bi";

import { useSession } from "next-auth/react";
import { wordCount } from "@/src/src/functions/wordCount";
import { useGlobalContext } from "@/src/context";
import axios from "axios";

const AddReward = () => {
  const [reward, setReward] = React.useState({
    name: "",
    type: "",
    file: { src: null, name: null },
    rawFile: null,
    description: "",
  });

  const { data: session } = useSession();
  const user = session?.user?.name;
  const { url } = useGlobalContext();

  const words = wordCount(reward.description);

  const handleReward = ({ name, value }) => {
    setReward((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addReward = async (e) => {
    e.preventDefault();
    const { name, type, description, rawFile } = reward;

    let imageSrc = null;

    if (rawFile) {
      imageSrc = await fileFns.uploadFile(url, rawFile, user.token, axios);
    }

    if (imageSrc) {
      try {
        const { data } = await axios.post(
          `${url}/admin_reward`,
          { name, type, reward: imageSrc, description },
          { headers: { Authorization: user.token } }
        );
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col justify-start">
      <AdminPageHeader subHeader="Rewards" mainHeader="Add Reward" />

      <form
        onSubmit={(e) => addReward(e)}
        className="w-full cstm-flex-col cstm-w-limit border-collapse gap-2"
      >
        <AddRewardFilter handleReward={handleReward} reward={reward} />
        <div
          className="cstm-flex-col gap-5 w-full
                      l-s:cstm-flex-row"
        >
          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-2 shadow-md cstm-scrollbar">
            <div className="cstm-flex-row w-full">
              <textarea
                name="name"
                id="name"
                cols="30"
                rows="1"
                placeholder="Reward Name"
                onChange={(e) => handleReward(e.target)}
                value={reward.name}
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
              {reward.file.src ? (
                <FilePreview
                  src={reward.file.src}
                  clearFiles={() => fileFns.clearFiles(setReward)}
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
            Add Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReward;
