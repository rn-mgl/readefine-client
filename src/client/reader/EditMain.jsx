"use client";

import React from "react";
import axios from "axios";
import EditInput from "@/components/profile/EditInput";
import ActionLabel from "@/components/global/ActionLabel";
import avatar from "@/public/profile/Avatar White.svg";
import Image from "next/image";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { BiImage } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { avatars } from "@/functions/avatars";
import { useFileControls } from "@/hooks/useFileControls";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const EditMain = (props) => {
  const [userData, setUserData] = React.useState({});
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
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;

  const clearUpload = () => {
    setUserData((prev) => {
      return {
        ...prev,
        image: null,
      };
    });
  };

  const handleUserData = ({ name, value }) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editMain = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoadingState(true);

    const { name, surname, username } = userData;

    let profileImage = userData?.image;

    if (hasRawImage()) {
      profileImage = await uploadFile(
        "readefine_client_file",
        rawImage.current?.files
      );
    }

    const randomIndex = Math.floor(Math.random() * avatars.length);
    const randomAvatar = avatars[randomIndex];

    profileImage = profileImage ? profileImage : randomAvatar;

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { name, surname, username, image: profileImage, type: "main" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        setHasSubmitted(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user/${user?.userId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, user?.userId, setUserData, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="fixed w-full h-full cstm-flex-col  backdrop-blur-md bg-gradient-to-br 
                from-[#552aca32] to-[#4bfce132] z-[60] animate-fadeIn justify-start p-4 top-0 left-0 
                gap-4 cstm-scrollbar-2 overflow-y-auto"
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

      <form
        onSubmit={(e) => editMain(e)}
        className=" cstm-flex-col gap-4 w-full t:w-8/12 l-s:w-6/12 l-l:w-4/12 h-auto justify-start"
      >
        <div className="cstm-flex-col gap-4 justify-start w-full  ">
          <div
            className="cstm-flex-col p-4 bg-white w-full rounded-2xl gap-2
                        shadow-solid shadow-prmColor  border-2 border-prmColor"
          >
            <div
              style={{
                backgroundImage: imageFile.src
                  ? `url(${imageFile.src})`
                  : userData?.image
                  ? `url(${userData?.image})`
                  : null,
              }}
              className="w-40 h-40 min-w-[10rem] min-h-[10rem] bg-prmColor bg-opacity-50
                        bg-center bg-cover rounded-full border-4 border-prmColor cstm-flex-col
                        l-l:w-60 l-l:h-60 l-l:min-w-[15rem] l-l:min-h-[15rem] "
            >
              {!imageFile.src && !userData?.image ? (
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
              ) : userData?.image ? (
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

          <div
            className="w-full rounded-2xl p-4 bg-white  shadow-solid shadow-prmColor 
                    border-2 border-prmColor  cstm-flex-col gap-4"
          >
            <EditInput
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              value={userData?.name}
              onChange={handleUserData}
              required={true}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Surname"
              placeholder="Surname"
              name="surname"
              value={userData?.surname}
              onChange={handleUserData}
              required={true}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Username"
              placeholder="Username"
              name="username"
              value={userData?.username}
              onChange={handleUserData}
              required={true}
              icon={<CiUser />}
            />

            <button
              type="submit"
              disabled={hasSubmitted}
              className="w-full rounded-md bg-prmColor p-2 text-sm 
                  text-scndColor font-semibold shadow-solid shadow-indigo-900 
                  disabled:saturate-0"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMain;
