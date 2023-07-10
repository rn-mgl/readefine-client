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
import EditInput from "./EditInput";

const EditMain = (props) => {
  const [adminData, setAdminData] = React.useState({});

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

  const editMain = async () => {
    let image = adminData?.image;

    const { name, surname, username } = adminData;

    if (adminData?.rawFile) {
      image = await fileFns.uploadFile(url, adminData?.rawFile, user?.token, axios);
    }

    try {
      const { data } = await axios.patch(
        `${url}/admin/${props.adminId}`,
        { image, name, surname, username },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanEditMain();
        props.getAdminData();
      }
    } catch (error) {
      console.log(error);
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
    }
  }, [url, user, props.adminId, setAdminData]);

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);

  return (
    <div className="w-full h-full overflow-y-auto cstm-scrollbar fixed top-0 left-0 backdrop-blur-md z-20 p-5 cstm-flex-col justify-start">
      <button onClick={props.handleCanEditMain} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <div className="cstm-w-limit  w-full justify-start cstm-flex-col ">
        <div className="justify-start cstm-flex-col w-full gap-5 t:w-10/12 l-s:w-8/12 l-l:w-6/12">
          <div className="w-full h-fit p-2 rounded-2xl bg-white cstm-flex-col gap-2 shadow-md">
            {adminData?.file?.src ? (
              <FilePreview
                src={adminData?.file?.src}
                purpose="Profile Picture"
                name={adminData?.file?.name}
                clearFiles={() => fileFns.clearFiles(setAdminData)}
              />
            ) : adminData?.image ? (
              <FileViewer src={adminData.image} clearUpload={clearUpload} />
            ) : (
              <div className="w-full h-40 bg-prmColor bg-opacity-20 rounded-2xl whitespace-pre-wrap cstm-flex-col">
                <p className="text-sm text-prmColor font-medium">
                  You do not have a profile picture
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
                  onChange={(e) => fileFns.selectedFileViewer(e, setAdminData)}
                />
                <ActionLabel label="Add Profile Picture" />
                <BiImage className="scale-150 text-prmColor peer-checked" />
              </label>

              {adminData?.image ? (
                <button onClick={clearUpload} className="cstm-bg-hover">
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
              value={adminData?.name}
              onChange={handleAdminData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Surname"
              placeholder="Surname"
              name="surname"
              value={adminData?.surname}
              onChange={handleAdminData}
              icon={<CiUser />}
            />

            <EditInput
              type="text"
              label="Username"
              placeholder="Username"
              name="username"
              value={adminData?.username}
              onChange={handleAdminData}
              icon={<CiUser />}
            />
          </div>

          <button
            onClick={editMain}
            className="w-full rounded-full bg-prmColor p-2 text-scndColor font-bold t:w-40"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMain;
