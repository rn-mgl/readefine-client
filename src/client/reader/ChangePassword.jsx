"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import EditInput from "@/components/profile/EditInput";
import { CiLock } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Message from "@/components/global/Message";
import Loading from "@/components/global/Loading";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

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

    setHasSubmitted(true);
    setLoadingState(true);

    const { oldPassword, newPassword, repeatNewPassword } = passwordData;

    if (newPassword.text !== repeatNewPassword.text) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, "The new password and retyped password do not match.", "warning");
      return;
    }

    if (newPassword.text.length < 8) {
      setHasSubmitted(false);
      setLoadingState(false);
      setMessageStatus(true, "Password must not be lower than 8 characters.", "warning");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${url}/user/${user?.userId}`,
        { oldPassword: oldPassword.text, newPassword: newPassword.text, type: "password" },
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
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 p-4 top-0 left-0 gap-4 cstm-scrollbar-2 overflow-y-auto">
      <button onClick={props.handleCanChangePassword} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-125 text-prmColor" />
      </button>

      {/* if message has popped up */}
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="cstm-w-limit cstm-flex-col w-full my-auto">
        <form
          onSubmit={(e) => changePassword(e)}
          className="cstm-flex-col bg-white rounded-2xl p-4 w-full gap-4 shadow-solid t:w-8/12 l-l:w-6/12"
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
            required={true}
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
            required={true}
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
            disabled={hasSubmitted}
            className="bg-prmColor p-2 rounded-full w-full text-scndColor shadow-solid 
                      shadow-indigo-900 font-bold t:w-fit t:px-10 text-sm disabled:saturate-0"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
