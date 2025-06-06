"use client";

import React from "react";
import axios from "axios";
import EditInput from "@/components/profile/EditInput";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";

import { useLoading } from "@/hooks/useLoading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMessage } from "@/hooks/useMessage";
import PasswordStrength from "@/src/components/global/PasswordStrength";
import zxcvbn from "zxcvbn";

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
    const result = zxcvbn(newPassword.text);

    if (newPassword.text !== repeatNewPassword.text) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "The new password and retyped password does not match.",
        "error"
      );
      return;
    }

    if (newPassword.text.length < 8) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "Password should not be lower than 8 characters.",
        "error"
      );
      return;
    }

    if (result.score < 2) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(
        true,
        "Password strength should not be below Medium Level.",
        "error"
      );
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/head/${user?.headId}`,
        {
          oldPassword: oldPassword.text,
          newPassword: newPassword.text,
          type: "password",
        },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        props.handleCanChangePassword();
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="fixed w-full h-full cstm-flex-col backdrop-blur-md bg-gradient-to-br animate-fadeIn
                from-[#552aca32] to-[#4bfce132] z-[60] p-4 top-0 left-0 gap-4 cstm-scrollbar-2 overflow-y-auto"
    >
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <button
        onClick={props.handleCanChangePassword}
        className="cstm-bg-hover ml-auto"
      >
        <IoClose className="text-xl text-prmColor" />
      </button>

      <div className=" cstm-flex-col w-full my-auto">
        <form
          onSubmit={(e) => changePassword(e)}
          className="cstm-flex-col bg-white rounded-2xl p-4 w-full gap-4 shadow-md t:w-8/12 l-s:w-6/12 l-l:w-4/12"
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
            className="bg-prmColor p-2 rounded-md w-full font-semibold
                    text-accntColor text-sm disabled:saturate-0"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
