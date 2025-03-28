"use client";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import EditInput from "@/components/profile/EditInput";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import PasswordStrength from "@/src/components/global/PasswordStrength";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const ChangePassword = (props) => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: { text: "", type: "password" },
    newPassword: { text: "", type: "password" },
    repeatNewPassword: { text: "", type: "password" },
  });

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user;

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

    setHasSubmitted(true);
    setLoadingState(true);

    const { oldPassword, newPassword, repeatNewPassword } = passwordData;

    if (newPassword.text !== repeatNewPassword.text) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "The new password and retyped password do not match.",
        "error"
      );
      return;
    }

    if (newPassword.text.length < 8) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "Password must not be lower than 8 characters.",
        "error"
      );
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        {
          oldPassword: oldPassword.text,
          newPassword: newPassword.text,
          type: "password",
        },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        setLoadingState(false);
        props.handleCanChangePassword();
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="fixed w-full h-full cstm-flex-col  backdrop-blur-md bg-gradient-to-br animate-fadeIn
              from-[#552aca32] to-[#4bfce132] z-[60] p-4 top-0 left-0 gap-4 cstm-scrollbar-2 overflow-y-auto"
    >
      <button
        onClick={props.handleCanChangePassword}
        className="cstm-bg-hover ml-auto"
      >
        <IoClose className="text-xl text-prmColor" />
      </button>

      {/* if message has popped up */}
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className=" cstm-flex-col w-full my-auto">
        <form
          onSubmit={(e) => changePassword(e)}
          className="cstm-flex-col bg-white rounded-2xl p-4 w-full border-2 border-prmColor
          gap-4 shadow-solid shadow-prmColor t:w-8/12 l-s:w-6/12 l-l:w-4/12 "
        >
          <EditInput
            label="Old Password"
            type={passwordData.oldPassword.type}
            placeholder="Old Password"
            name="oldPassword"
            onChange={handlePasswordData}
            required={true}
            icon={
              passwordData.oldPassword.type === "password" ? (
                <AiOutlineEye
                  onClick={() => handlePasswordType("oldPassword")}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handlePasswordType("oldPassword")}
                />
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
            required={true}
            icon={
              passwordData.newPassword.type === "password" ? (
                <AiOutlineEye
                  onClick={() => handlePasswordType("newPassword")}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handlePasswordType("newPassword")}
                />
              )
            }
            value={passwordData.newPassword.text}
          />

          <PasswordStrength password={passwordData.newPassword.text} />

          <EditInput
            label="Repeat New Password"
            type={passwordData.repeatNewPassword.type}
            placeholder="Repeat New Password"
            name="repeatNewPassword"
            onChange={handlePasswordData}
            required={true}
            icon={
              passwordData.repeatNewPassword.type === "password" ? (
                <AiOutlineEye
                  onClick={() => handlePasswordType("repeatNewPassword")}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handlePasswordType("repeatNewPassword")}
                />
              )
            }
            value={passwordData.repeatNewPassword.text}
          />

          <button
            type="submit"
            disabled={hasSubmitted}
            className="bg-prmColor p-2 rounded-md w-full text-scndColor shadow-solid 
                      shadow-indigo-900 font-semibold text-sm disabled:saturate-0"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
