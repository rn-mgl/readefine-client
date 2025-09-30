"use client";
import AdminPageHeader from "@/admin/global/PageHeader";
import EditRewardFilter from "@/admin/rewards/EditRewardFilter";
import FilePreview from "@/components/global/FilePreview";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import axios from "axios";
import Image from "next/image";
import React from "react";

import { isTokenExpired } from "@/functions/jwtFns";

import { wordCount } from "@/functions/wordCount";
import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import useAdminActivities from "@/src/hooks/useAdminActivities";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { BiImage } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const EditReward = () => {
  const [reward, setReward] = React.useState({});

  const {
    imageFile,
    rawImage,
    selectedImageViewer,
    removeSelectedImage,
    uploadFile,
    hasRawImage,
  } = useFileControls();
  const { message, setMessageStatus } = useMessage();
  const { loading, setLoadingState } = useLoading(false);
  const { createAdminActivity } = useAdminActivities();

  const { data: session } = useSession();
  const url = process.env.API_URL;
  const user = session?.user;
  const params = useParams();
  const rewardId = params?.reward_id;
  const router = useRouter();

  // get word count in description
  const words = wordCount(reward.description);

  // handle onchange on reward
  const handleReward = ({ name, value }) => {
    setReward((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // remove uploaded reward
  const clearUploadedReward = () => {
    setReward((prev) => {
      return {
        ...prev,
        reward: null,
      };
    });
  };

  // edit reward
  const editReward = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    const { reward_name, reward_type, description, rawFile } = reward;
    let rewardImage = reward?.reward;

    // check for uploaded reward
    if (hasRawImage()) {
      rewardImage = await uploadFile(
        "readefine_admin_file",
        rawImage.current?.files
      );
    }

    if (!rewardImage) {
      setLoadingState(false);
      setMessageStatus(true, "You did not put a reward image.", "error");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_reward/${rewardId}`,
        { reward_name, reward_type, reward: rewardImage, description },
        { headers: { Authorization: user.token } }
      );

      // if uploaded, move to view reward
      if (data) {
        const activityData = await createAdminActivity(
          "reward",
          reward?.reward_name,
          "U"
        );

        if (activityData) {
          router.push(`/controller/rewards/${params?.reward_id}`);
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // get reward
  const getReward = React.useCallback(async () => {
    if (user?.token) {
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
    }
  }, [url, user?.token, rewardId, setMessageStatus]);

  React.useEffect(() => {
    getReward();
  }, [getReward]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col gap-4 justify-start">
      <AdminPageHeader
        subHeader={reward?.reward_name}
        mainHeader="Edit Reward"
      />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <form
        onSubmit={(e) => editReward(e)}
        className="w-full cstm-flex-col border-collapse gap-4 "
      >
        <EditRewardFilter handleReward={handleReward} reward={reward} />

        <div
          className="cstm-flex-col gap-4 w-full
                      l-s:cstm-flex-row"
        >
          <div className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-4 shadow-md cstm-scrollbar">
            {/* reward name */}
            <div className="cstm-flex-row w-full">
              <textarea
                name="reward_name"
                id="reward_name"
                cols="30"
                rows="1"
                placeholder="Reward Name"
                onChange={(e) => handleReward(e.target)}
                value={reward.reward_name}
                required={true}
                className="resize-none p-2 w-full focus:outline-none font-bold text-prmColor mr-auto placeholder:opacity-50"
              />
            </div>

            <div className="cstm-separator" />

            {/* reward description */}
            <div className="w-full h-full cstm-flex-col">
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="1"
                placeholder="description..."
                onChange={(e) => handleReward(e.target)}
                value={reward.description}
                required={true}
                className="resize-none p-2 focus:outline-none w-full h-full mr-auto placeholder:opacity-50"
              />
              <p className="ml-auto whitespace-nowrap">words: {words}</p>
            </div>
          </div>

          <div className="table-fixed p-4 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-4 shadow-md cstm-scrollbar">
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl">
              {/* show selected file first then the current reward if none selected */}

              {imageFile.src ? (
                <div className="w-full t:w-72">
                  <FilePreview
                    src={imageFile.src}
                    name={imageFile.name}
                    purpose="Reward"
                    clearFiles={removeSelectedImage}
                  />
                </div>
              ) : reward.reward ? (
                <div className="w-full cstm-flex-col rounded-2xl p-2 gap-2 t:w-72">
                  <Image
                    src={reward.reward}
                    alt="viewer"
                    width={350}
                    height={350}
                    className="w-fit rounded-2xl"
                    draggable={false}
                    priority
                  />

                  <div className="w-full cstm-flex-row gap-4">
                    <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none font-bold">
                      Current Reward
                    </p>

                    <button
                      type="button"
                      onClick={clearUploadedReward}
                      className="cstm-bg-hover "
                    >
                      <IoClose className="text-prmColor text-xl cursor-pointer " />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          {/* select image */}
          <label className="mr-auto cstm-bg-hover" htmlFor="rewardImage">
            <input
              accept="image/*"
              type="file"
              className="hidden peer"
              name="rewardImage"
              id="rewardImage"
              onChange={(e) => selectedImageViewer(e, setMessageStatus)}
              ref={rawImage}
            />
            <BiImage className="text-xl text-prmColor peer-checked" />
          </label>

          <button
            type="submit"
            className="w-fit text-center  text-sm font-semibold bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Edit Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReward;
