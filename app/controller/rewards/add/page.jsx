"use client";
import React from "react";
import AdminPageHeader from "@/admin/global/PageHeader";
import FilePreview from "@/components/global/FilePreview";
import AddRewardFilter from "@/admin/rewards/AddRewardFilter";
import Message from "@/components/global/Message";
import axios from "axios";
import Loading from "@/components/global/Loading";

import { BiImage } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { wordCount } from "@/functions/wordCount";
import { useGlobalContext } from "@/base/context";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const AddReward = () => {
  const [reward, setReward] = React.useState({
    name: "",
    type: "badge",
    description: "",
  });

  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { imageFile, rawImage, selectedImageViewer, removeSelectedImage, uploadFile, hasRawImage } = useFileControls();
  const { message, setMessageStatus } = useMessage();
  const { loading, setLoadingState } = useLoading(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const router = useRouter();

  // handle word count
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

  // add reward
  const addReward = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    setHasSubmitted(true);

    const { name, type, description } = reward;
    let rewardImage = null;

    // check for reward image
    if (hasRawImage()) {
      rewardImage = await uploadFile("readefine_admin_file", rawImage.current?.files);
    } else {
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, "You did not add an image", "error");
      return;
    }

    try {
      const { data } = await axios.post(
        `${url}/admin_reward`,
        { name, type, reward: rewardImage, description },
        { headers: { Authorization: user.token } }
      );

      // if added, move to main reward page
      if (data) {
        router.push("/controller/rewards");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

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
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col justify-start">
      <AdminPageHeader subHeader="Rewards" mainHeader="Add Reward" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <form onSubmit={(e) => addReward(e)} className="w-full cstm-flex-col cstm-w-limit border-collapse gap-5">
        {/* reward data */}
        <AddRewardFilter handleReward={handleReward} reward={reward} />

        <div
          className="cstm-flex-col gap-5 w-full
                      l-s:cstm-flex-row"
        >
          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar">
            {/* reward name */}
            <div className="cstm-flex-row w-full">
              <textarea
                name="name"
                id="name"
                cols="30"
                rows="1"
                placeholder="Reward Name"
                onChange={(e) => handleReward(e.target)}
                required={true}
                value={reward.name}
                className="resize-none w-full p-2 focus:outline-none font-bold text-prmColor mr-auto placeholder:opacity-50"
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

          <div
            className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] 
                          justify-start items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar"
          >
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl">
              {/* show if there is image selected */}
              {imageFile.src ? (
                <FilePreview
                  src={imageFile.src}
                  name={imageFile.name}
                  purpose="Reward"
                  clearFiles={removeSelectedImage}
                />
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
              onChange={(e) => {
                selectedImageViewer(e, setMessageStatus);
              }}
              ref={rawImage}
            />

            <BiImage className="scale-150 text-prmColor peer-checked" />
          </label>

          <button
            type="submit"
            disabled={hasSubmitted}
            className="w-fit text-center font-poppins text-sm font-normal bg-prmColor 
                      text-accntColor rounded-full p-2 px-4 t:px-10 disabled:saturate-50"
          >
            Add Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReward;
