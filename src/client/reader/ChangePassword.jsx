"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import EditInput from "../../components/profile/EditInput";
import { CiLock } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = (props) => {
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: { text: "", type: "password" },
    newPassword: { text: "", type: "password" },
    repeatNewPassword: { text: "", type: "password" },
  });

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handlePasswordData = ({ name, value }) => {
    setPasswordData((prev) => {
      return {
        ...prev,
        [name]: { text: value, type: prev[name].type },
      };
    });
  };

  const handlePasswordType = (name) => {
    setPasswordData((prev) => {
      const newType = prev[name].type === "password" ? "text" : "password";
      return {
        ...prev,
        [name]: { text: prev[name].text, type: newType },
      };
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, repeatNewPassword } = passwordData;

    if (newPassword.text !== repeatNewPassword.text) {
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { oldPassword: oldPassword.text, newPassword: newPassword.text, type: "password" },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanChangePassword();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 p-5 top-0 left-0 gap-5 cstm-scrollbar overflow-y-auto">
      <button onClick={props.handleCanChangePassword} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <div className="cstm-w-limit cstm-flex-col w-full my-auto">
        <form
          onSubmit={(e) => changePassword(e)}
          className="cstm-flex-col bg-white rounded-2xl p-5 w-full gap-5 shadow-solid t:w-8/12 l-l:w-6/12"
        >
          <EditInput
            label="Old Password"
            type={passwordData.oldPassword.type}
            placeholder="Old Password"
            name="oldPassword"
            onChange={handlePasswordData}
            icon={
              passwordData.oldPassword.type === "password" ? (
                <AiOutlineEye onClick={() => handlePasswordType("oldPassword")} />
              ) : (
                <AiOutlineEyeInvisible onClick={() => handlePasswordType("oldPassword")} />
              )
            }
            value={passwordData.oldPassword.text}
          />

          <EditInput
            label="New Password"
            type={passwordData.newPassword.type}
            placeholder="New Password"
            name="newPassword"
            onChange={handlePasswordData}
            icon={
              passwordData.newPassword.type === "password" ? (
                <AiOutlineEye onClick={() => handlePasswordType("newPassword")} />
              ) : (
                <AiOutlineEyeInvisible onClick={() => handlePasswordType("newPassword")} />
              )
            }
            value={passwordData.newPassword.text}
          />

          <EditInput
            label="Repeat New Password"
            type={passwordData.repeatNewPassword.type}
            placeholder="Repeat New Password"
            name="repeatNewPassword"
            onChange={handlePasswordData}
            icon={
              passwordData.repeatNewPassword.type === "password" ? (
                <AiOutlineEye onClick={() => handlePasswordType("repeatNewPassword")} />
              ) : (
                <AiOutlineEyeInvisible onClick={() => handlePasswordType("repeatNewPassword")} />
              )
            }
            value={passwordData.repeatNewPassword.text}
          />

          <button
            type="submit"
            className="bg-prmColor p-2 rounded-full w-full text-scndColor shadow-solid shadow-indigo-900 font-bold t:w-fit t:px-10 text-sm"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;