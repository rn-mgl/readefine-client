"use client";

import axios from "axios";
import React from "react";
import EditInput from "@/components/profile/EditInput";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";
import ActionLabel from "@/components/global/ActionLabel";
import avatar from "@/public/profile/Avatar.svg";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { BiImage } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { useFileControls } from "@/hooks/useFileControls";
import { avatars } from "@/functions/avatars";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const EditMain = (props) => {
  const [headData, setHeadData] = React.useState({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const {
    imageFile,
    rawImage,
    removeSelectedImage,
    selectedImageViewer,
    uploadFile,
    hasRawImage,
  } = useFileControls();
  const { message, setMessageStatus } = useMessage();
  const { loading, setLoadingState } = useLoading(false);

  const { data: session } = useSession();
  const url = process.env.API_URL;
  const user = session?.user;

  const handleHeadData = ({ name, value }) => {
    setHeadData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clearUpload = () => {
    setHeadData((prev) => {
      return {
        ...prev,
        image: null,
      };
    });
  };

  const editMain = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setLoadingState(true);

    const { name, surname, username } = headData;

    let profileImage = headData?.image;

    if (!name || !surname || !username) {
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, "Please do not leave anything blank.", "error");
      return;
    }

    if (hasRawImage()) {
      profileImage = await uploadFile(
        "readefine_head_file",
        rawImage.current?.files
      );
    }

    const randomIndex = Math.floor(Math.random() * avatars.length);
    const randomAvatar = avatars[randomIndex];

    profileImage = profileImage ? profileImage : randomAvatar;

    try {
      const { data } = await axios.patch(
        `${url}/head/${props.headId}`,
        { image: profileImage, name, surname, username, type: "main" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const getHeadData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head/${props.headId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setHeadData(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, props.headId, setHeadData, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getHeadData();
    }
  }, [user, getHeadData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="w-full h-full overflow-y-auto cstm-scrollbar-2 fixed top-0 left-0 animate-fadeIn
                backdrop-blur-md bg-gradient-to-br from-[#552aca32] to-[#4bfce132]
                 z-[60] p-4 cstm-flex-col justify-start"
    >
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <button
        onClick={props.handleCanEditMain}
        className="cstm-bg-hover ml-auto"
      >
        <IoClose className="text-xl text-prmColor" />
      </button>

      <div className="  w-full justify-start cstm-flex-col  t:w-8/12 l-s:w-6/12 l-l:w-4/12">
        <form
          onSubmit={(e) => editMain(e)}
          className="justify-start cstm-flex-col w-full gap-4 "
        >
          <div className="w-full h-fit p-4 rounded-2xl bg-white cstm-flex-col gap-2 shadow-md">
            <div
              style={{
                backgroundImage: imageFile.src
                  ? `url(${imageFile.src})`
                  : headData?.image
                  ? `url(${headData?.image})`
                  : null,
              }}
              className="w-40 h-40 min-w-[10rem] min-h-[10rem] bg-prmColor bg-opacity-10 cstm-flex-col
                        bg-center bg-cover rounded-full border-4 border-prmColor
                        l-l:w-60 l-l:h-60 l-l:min-w-[15rem] l-l:min-h-[15rem] "
            >
              {!imageFile.src && !headData?.image ? (
                <Image
                  src={avatar}
                  alt="avatar"
                  className="w-full"
                  width={320}
                />
              ) : null}
            </div>

            <div className="w-full cstm-flex-row">
              <label className="cstm-bg-hover cursor-pointer w-fit group relative mr-auto">
                <input
                  accept="image/*"
                  type="file"
                  className="hidden peer"
                  formNoValidate
                  name="file"
                  onChange={(e) => selectedImageViewer(e, setMessageStatus)}
                  ref={rawImage}
                />
                <ActionLabel label="Add Profile Picture" />
                <BiImage className="text-xl text-prmColor peer-checked" />
              </label>

              {imageFile.src ? (
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
                  <IoClose className="text-xl text-prmColor" />
                </button>
              ) : headData?.image ? (
                <button
                  type="button"
                  onClick={clearUpload}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
                  <IoClose className="text-xl text-prmColor" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="w-full h-fit p-4 rounded-2xl bg-white cstm-flex-col gap-4 shadow-md">
            <EditInput
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              required={true}
              value={headData?.name}
              onChange={handleHeadData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Surname"
              placeholder="Surname"
              name="surname"
              required={true}
              value={headData?.surname}
              onChange={handleHeadData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Username"
              placeholder="Username"
              name="username"
              required={true}
              value={headData?.username}
              onChange={handleHeadData}
              icon={<CiUser />}
            />

            <button
              type="submit"
              disabled={hasSubmitted}
              className="w-full rounded-md bg-prmColor p-2 text-accntColor 
                      font-semibold text-sm disabled:saturate-0"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMain;
