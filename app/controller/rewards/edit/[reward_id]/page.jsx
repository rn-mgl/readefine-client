"use client";
import React from "react";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import FilePreview from "@/src/src/components/global/FilePreview";
import axios from "axios";
import EditRewardFilter from "@/src/src/admin/rewards/EditRewardFilter";
import Message from "@/src/src/components/global/Message";
import FileViewer from "@/src/src/components/global/FileViewer";
import * as fileFns from "../../../../../src/functions/fileFns";

import { BiImage } from "react-icons/bi";
import { wordCount } from "@/src/src/functions/wordCount";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { decipher } from "@/src/src/functions/security";
import Loading from "@/src/src/components/global/Loading";
import { isTokenExpired } from "@/src/src/functions/jwtFns";

const EditReward = ({ params }) => {
  const [reward, setReward] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decodedRewardId = decipher(params?.reward_id);
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
    setLoading(true);

    const { reward_name, reward_type, description, rawFile } = reward;
    let imageSrc = reward?.reward;

    // check for uploaded reward
    if (rawFile) {
      imageSrc = await fileFns.uploadFile(
        `${url}/readefine_admin_file`,
        rawFile,
        user.token,
        axios
      );
    }

    if (!imageSrc) {
      setMessage({ active: true, msg: "You did not put a reward image.", type: "error" });
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin_reward/${decodedRewardId}`,
        { reward_name, reward_type, reward: imageSrc, description },
        { headers: { Authorization: user.token } }
      );

      // if uploaded, move to view reward
      if (data) {
        router.push(`/controller/rewards/${params?.reward_id}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  // get reward
  const getReward = React.useCallback(async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${url}/admin_reward/${decodedRewardId}`, {
          headers: { Authorization: user?.token },
        });
        if (data) {
          setReward(data);
        }
      } catch (error) {
        console.log(error);
        setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
      }
    }
  }, [setReward, url, user?.token, decodedRewardId]);

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
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col gap-5 justify-start">
      <AdminPageHeader subHeader={reward?.reward_name} mainHeader="Edit Reward" />

      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <form
        onSubmit={(e) => editReward(e)}
        className="w-full cstm-flex-col border-collapse gap-5 cstm-w-limit"
      >
        <EditRewardFilter handleReward={handleReward} reward={reward} />

        <div
          className="cstm-flex-col gap-5 w-full
                      l-s:cstm-flex-row"
        >
          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar">
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

          <div className="table-fixed p-5 rounded-2xl cstm-flex-col overflow-auto w-full h-[70vh] justify-start items-start bg-white text-sm gap-5 shadow-md cstm-scrollbar">
            <div className="w-full h-full cstm-flex-col bg-accntColor rounded-2xl">
              {/* show selected file first then the current reward if none selected */}
              {reward.file?.src ? (
                <FilePreview
                  src={reward.file?.src}
                  clearFiles={() => fileFns.clearFiles(setReward)}
                />
              ) : reward.reward ? (
                <div className="w-full cstm-flex-col gap-5">
                  <FileViewer src={reward.reward} clearFiles={clearUploadedReward} />

                  <button onClick={clearUploadedReward} className="cstm-bg-hover">
                    <IoClose className="scale-150 text-prmColor" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-4 cstm-flex-row w-full">
          {/* select image */}
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
            className="w-fit text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full p-2 px-4 t:px-10"
          >
            Edit Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReward;
