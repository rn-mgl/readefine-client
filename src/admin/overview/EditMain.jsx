"use client";

import axios from "axios";
import React from "react";
import FileViewer from "../../components/global/FileViewer";
import * as fileFns from "../../functions/fileFns";

import { useGlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { BiImage } from "react-icons/bi";
import FilePreview from "../../components/global/FilePreview";
import ActionLabel from "../../components/global/ActionLabel";
import InputComp from "../../components/input/InputComp";
import { CiUser } from "react-icons/ci";
import EditInput from "../../components/profile/EditInput";
import Message from "../../components/global/Message";
import Loading from "../../components/global/Loading";

const EditMain = (props) => {
  const [adminData, setAdminData] = React.useState({});
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleAdminData = ({ name, value }) => {
    setAdminData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clearUpload = () => {
    setAdminData((prev) => {
      return {
        ...prev,
        image: null,
      };
    });
  };

  const editMain = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setLoading(true);

    let image = adminData?.image;

    const { name, surname, username } = adminData;

    if (!name || !surname || !username) {
      setLoading(false);
      setHasSubmitted(false);
      setMessage({ active: true, msg: "Please do not leave anything blank.", type: "error" });
      return;
    }

    if (adminData?.rawFile) {
      image = await fileFns.uploadFile(
        `${url}/readefine_admin_file`,
        adminData?.rawFile,
        user?.token,
        axios
      );
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin/${props.adminId}`,
        { image, name, surname, username, type: "main" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanEditMain();
        props.getAdminData();
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  const getAdminData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/${props.adminId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  }, [url, user, props.adminId, setAdminData]);

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full overflow-y-auto cstm-scrollbar fixed top-0 left-0 backdrop-blur-md z-20 p-5 cstm-flex-col justify-start">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <button onClick={props.handleCanEditMain} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <div className="cstm-w-limit  w-full justify-start cstm-flex-col ">
        <form
          onSubmit={(e) => editMain(e)}
          className="justify-start cstm-flex-col w-full gap-5 t:w-10/12 l-s:w-8/12 l-l:w-6/12"
        >
          <div className="w-full h-fit p-2 rounded-2xl bg-white cstm-flex-col gap-2 shadow-md">
            <div
              style={{
                backgroundImage: adminData?.file?.src
                  ? `url(${adminData?.file?.src})`
                  : adminData?.image
                  ? `url(${adminData?.image})`
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
                    fileFns.selectedFileViewer(e, setAdminData);
                    clearUpload();
                  }}
                />
                <ActionLabel label="Add Profile Picture" />
                <BiImage className="scale-150 text-prmColor peer-checked" />
              </label>

              {adminData?.image ? (
                <button
                  type="button"
                  onClick={clearUpload}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
                  <IoClose className="scale-150 text-prmColor" />
                </button>
              ) : null}

              {adminData?.file?.src ? (
                <button
                  type="button"
                  onClick={() => fileFns.clearFiles(setAdminData)}
                  className="cstm-bg-hover group relative"
                >
                  <ActionLabel label="Remove Image" />
                  <IoClose className="scale-150 text-prmColor" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="w-full h-fit p-2 rounded-2xl bg-white cstm-flex-col gap-5 shadow-md">
            <EditInput
              type="text"
              label="Name"
              placeholder="Name"
              name="name"
              required={true}
              value={adminData?.name}
              onChange={handleAdminData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Surname"
              placeholder="Surname"
              name="surname"
              required={true}
              value={adminData?.surname}
              onChange={handleAdminData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Username"
              placeholder="Username"
              name="username"
              required={true}
              value={adminData?.username}
              onChange={handleAdminData}
              icon={<CiUser />}
            />
          </div>

          <button
            type="submit"
            disabled={hasSubmitted}
            className="w-full rounded-full bg-prmColor p-2 text-scndColor font-bold t:w-fit t:px-10 text-sm disabled:saturate-0"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMain;
