"use client";

import React from "react";
import axios from "axios";
import FilePreview from "../../components/global/FilePreview";
import FileViewer from "../../components/global/FileViewer";
import * as fileFns from "../../functions/fileFns";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import ActionLabel from "../../components/global/ActionLabel";
import { BiImage } from "react-icons/bi";
import EditInput from "../../components/profile/EditInput";
import { CiUser } from "react-icons/ci";

const EditMain = (props) => {
  const [userData, setUserData] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

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

  const editMain = async () => {
    let image = userData?.image;

    if (userData?.rawFile) {
      image = await fileFns.uploadFile(
        `${url}/readefine_client_file`,
        userData?.rawFile,
        user?.token,
        axios
      );
    }

    const { name, surname, username } = userData;

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { name, surname, username, image, type: "main" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanEditMain();
        props.getUserData();
      }
    } catch (error) {
      console.log(error);
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
    }
  }, [url, user, setUserData]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  return (
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 justify-start p-5 top-0 left-0 gap-5 cstm-scrollbar overflow-y-auto">
      <button onClick={props.handleCanEditMain} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full h-auto justify-start">
        <div className="cstm-flex-col gap-5 justify-start w-full t:w-10/12 l-l:w-8/12">
          <div className="cstm-flex-col p-5 bg-white w-full rounded-2xl shadow-solid gap-2">
            {userData?.file?.src ? (
              <FilePreview
                src={userData?.file?.src}
                purpose="Profile Picture"
                name={userData?.file?.name}
                clearFiles={() => fileFns.clearFiles(setUserData)}
              />
            ) : userData?.image ? (
              <FileViewer src={userData?.image} />
            ) : (
              <div className="bg-scndColor bg-opacity-10 w-full h-40 rounded-2xl cstm-flex-col p-2">
                <p className="text-prmColor font-bold text-sm text-center">
                  You do not have a profile picture.
                </p>
              </div>
            )}

            <div className="w-full cstm-flex-row">
              <label className="cstm-bg-hover cursor-pointer w-fit group relative mr-auto">
                <input
                  accept="image/*"
                  type="file"
                  className="hidden peer"
                  formNoValidate
                  name="file"
                  onChange={(e) => fileFns.selectedFileViewer(e, setUserData)}
                />
                <ActionLabel label="Add Profile Picture" />
                <BiImage className="scale-150 text-prmColor peer-checked" />
              </label>

              {userData?.image ? (
                <button onClick={clearUpload} className="cstm-bg-hover">
                  <IoClose className="scale-150 text-prmColor" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="w-full rounded-2xl p-5 bg-white shadow-solid  cstm-flex-col gap-5">
            <EditInput
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              value={userData?.name}
              onChange={handleUserData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Surname"
              placeholder="Surname"
              name="surname"
              value={userData?.surname}
              onChange={handleUserData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Username"
              placeholder="Username"
              name="username"
              value={userData?.username}
              onChange={handleUserData}
              icon={<CiUser />}
            />
          </div>
        </div>

        <button
          onClick={editMain}
          className="w-full rounded-full bg-prmColor p-2 text-sm text-scndColor font-bold t:w-40 shadow-solid shadow-indigo-900"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditMain;
