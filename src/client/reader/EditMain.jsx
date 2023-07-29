"use client";

import React from "react";
import axios from "axios";
import FilePreview from "../../components/global/FilePreview";
import FileViewer from "../../components/global/FileViewer";
import * as fileFns from "../../functions/fileFns";
import EditInput from "../../components/profile/EditInput";
import ActionLabel from "../../components/global/ActionLabel";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import { BiImage } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import Message from "../../components/global/Message";
import Loading from "../../components/global/Loading";

const EditMain = (props) => {
  const [userData, setUserData] = React.useState({});
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  const editMain = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    setLoading(true);

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
      setHasSubmitted(false);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
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
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, setUserData]);

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
      className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 
                justify-start p-5 top-0 left-0 gap-5 cstm-scrollbar overflow-y-auto"
    >
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <button onClick={props.handleCanEditMain} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <form
        onSubmit={(e) => editMain(e)}
        className="cstm-w-limit cstm-flex-col gap-5 w-full h-auto justify-start"
      >
        <div className="cstm-flex-col gap-5 justify-start w-full t:w-10/12 l-l:w-8/12">
          <div className="cstm-flex-col p-5 bg-white w-full rounded-2xl shadow-solid gap-2">
            <div
              style={{
                backgroundImage: userData?.file?.src
                  ? `url(${userData?.file?.src})`
                  : userData?.image
                  ? `url(${userData?.image})`
                  : null,
              }}
              className="w-56 h-56 min-w-[14rem] min-h-[14rem] bg-prmColor bg-opacity-10
                        bg-center bg-cover rounded-full border-4 border-prmColor
                        l-l:w-80 l-l:h-80 l-l:min-w-[20rem] l-l:min-h-[20rem] "
            />

            <div className="w-full cstm-flex-row">
              <label className="cstm-bg-hover cursor-pointer w-fit group relative mr-auto">
                <input
                  accept="image/*"
                  type="file"
                  className="hidden peer"
                  formNoValidate
                  name="file"
                  onChange={(e) => {
                    fileFns.selectedFileViewer(e, setUserData);
                    clearUpload();
                  }}
                />
                <ActionLabel label="Add Profile Picture" />
                <BiImage className="scale-150 text-prmColor peer-checked" />
              </label>

              {userData?.image ? (
                <button
                  type="button"
                  onClick={clearUpload}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
                  <IoClose className="scale-150 text-prmColor" />
                </button>
              ) : null}

              {userData?.file?.src ? (
                <button
                  type="button"
                  onClick={() => fileFns.clearFiles(setUserData)}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
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
          </div>
        </div>

        <button
          type="submit"
          disabled={hasSubmitted}
          className="w-full rounded-full bg-prmColor p-2 text-sm 
                  text-scndColor font-bold t:w-40 shadow-solid shadow-indigo-900 
                  disabled:saturate-0"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMain;
