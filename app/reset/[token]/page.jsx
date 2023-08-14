"use client";
import React from "react";
import axios from "axios";

import intersectSM from "../../../public/landing/definition/IntersectSM.svg";
import intersectST from "../../../public/landing/definition/IntersectST.svg";
import intersectSL from "../../../public/landing/definition/IntersectSL.svg";

import Image from "next/image";
import InputComp from "@/src/src/components/input/InputComp";
import ButtonComp from "@/src/src/components/input/ButtonComp";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Loading from "@/src/src/components/global/Loading";

const PasswordReset = ({ params }) => {
  const [password, setPassword] = React.useState({ newPassword: "", retypedPassword: "" });
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState({
    newPassword: false,
    retypedPassword: false,
  });

  const { url } = useGlobalContext();
  const router = useRouter();
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
    setLoading(true);

    const { newPassword, retypedPassword } = password;

    if (newPassword !== retypedPassword) {
      setMessage({
        active: true,
        msg: "The new password and retyped password does not match.",
        type: "warning",
      });
      setHasSubmitted(false);
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({
        active: true,
        msg: "Password must not be lower than 8 characters.",
        type: "warning",
      });
      setHasSubmitted(false);
      setLoading(false);

      return;
    }

    try {
      const { data } = await axios.post(`${url}/auth_client_password_reset/${token}`, {
        newPassword,
        retypedPassword,
      });

      await signOut({ redirect: false });

      // if changed successfully, move to log in
      if (data) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setHasSubmitted(false);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg, type: "error" });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 cstm-flex-col w-full min-h-screen bg-gradient-to-b bg-accntColor ">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <p className=" font-extrabold text-2xl text-prmColor">Enter New Password</p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
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
              <AiOutlineEyeInvisible onClick={() => handleVisiblePassword("newPassword")} />
            ) : (
              <AiOutlineEye onClick={() => handleVisiblePassword("newPassword")} />
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
              <AiOutlineEyeInvisible onClick={() => handleVisiblePassword("retypedPassword")} />
            ) : (
              <AiOutlineEye onClick={() => handleVisiblePassword("retypedPassword")} />
            )
          }
          onChange={(e) => handleNewPassword(e.target)}
          value={password.retypedPassword}
        />

        {/* submit form */}
        <ButtonComp
          type="submit"
          fontColor="text-accntColor"
          bgColor="bg-prmColor"
          label="Change Password"
          css="w-full"
          disabled={hasSubmitted}
        />
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
