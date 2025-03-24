"use client";
import axios from "axios";
import React from "react";

import intersectSL from "@/public/landing/definition/IntersectSL.svg";
import intersectSM from "@/public/landing/definition/IntersectSM.svg";
import intersectST from "@/public/landing/definition/IntersectST.svg";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import Image from "next/image";

import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrength from "@/src/components/global/PasswordStrength";

const PasswordReset = () => {
  const [password, setPassword] = React.useState({
    newPassword: "",
    retypedPassword: "",
  });
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState({
    newPassword: false,
    retypedPassword: false,
  });

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  // handle onchange function on newpassword
  const handleNewPassword = ({ name, value }) => {
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // toggle if password can be seen
  const handleVisiblePassword = (name) => {
    setVisiblePassword((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  // change password
  const changePassword = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setLoadingState(true);

    const { newPassword, retypedPassword } = password;

    if (newPassword !== retypedPassword) {
      setMessageStatus(
        true,
        "The new password and retyped password does not match.",
        "warning"
      );
      setHasSubmitted(false);
      setLoadingState(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessageStatus(
        true,
        "Password must not be lower than 8 characters.",
        "warning"
      );
      setHasSubmitted(false);
      setLoadingState(false);

      return;
    }

    try {
      const { data } = await axios.post(
        `${url}/auth_client_password_reset/${token}`,
        {
          newPassword,
          retypedPassword,
        }
      );

      await signOut({ redirect: false });

      // if changed successfully, move to log in
      if (data) {
        router.push("/login");
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
    <div className="p-4 cstm-flex-col w-full min-h-screen bg-gradient-to-b bg-accntColor ">
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <p className=" font-extrabold text-2xl text-prmColor">
        Enter New Password
      </p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-4 cstm-flex-col gap-4 relative z-10 shadow-lg
                    t:w-96
                    l-s:w-[26rem]"
        onSubmit={(e) => changePassword(e)}
      >
        {/* new password */}
        <InputComp
          id="newPassword"
          placeholder="Password"
          type={visiblePassword.newPassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword.newPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => handleVisiblePassword("newPassword")}
              />
            ) : (
              <AiOutlineEye
                onClick={() => handleVisiblePassword("newPassword")}
              />
            )
          }
          onChange={(e) => handleNewPassword(e.target)}
          value={password.newPassword}
        />

        {/* retype password */}
        <InputComp
          id="retypedPassword"
          placeholder="Password"
          type={visiblePassword.retypedPassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword.retypedPassword ? (
              <AiOutlineEyeInvisible
                onClick={() => handleVisiblePassword("retypedPassword")}
              />
            ) : (
              <AiOutlineEye
                onClick={() => handleVisiblePassword("retypedPassword")}
              />
            )
          }
          onChange={(e) => handleNewPassword(e.target)}
          value={password.retypedPassword}
        />

        <div className="bg-accntColor p-2 rounded-md w-full">
          <PasswordStrength password={password.newPassword} />
        </div>

        {/* submit form */}
        <button
          type="submit"
          disabled={hasSubmitted}
          className="text-center rounded-md text-sm font-bold transition-all
                text-accntColor bg-prmColor w-full disabled:saturate-50 p-2 px-4"
        >
          Change Password
        </button>
      </form>

      {/* render on mobile */}
      <Image
        src={intersectSM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute rotate-180 t:hidden"
        priority
      />

      {/* render on tablet */}
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute t:block l-s:hidden"
        priority
      />

      {/* render on laptop */}
      <Image
        src={intersectSL}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute l-s:block"
        priority
      />
    </div>
  );
};

export default PasswordReset;
