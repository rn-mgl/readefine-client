"use client";
import React from "react";
import InputComp from "@/src/src/components/input/InputComp";
import ButtonComp from "@/src/src/components/input/ButtonComp";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [keys, setKeys] = React.useState({ candidateEmail: "", candidateUsername: "" });
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const router = useRouter();

  const handleKeys = ({ name, value }) => {
    setKeys((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();
    const { candidateEmail, candidateUsername } = keys;
    try {
      const { data } = await axios.post(`${url}/auth_client_password_reset`, {
        candidateEmail,
        candidateUsername,
      });
      if (data) {
        router.push("/sending");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  return (
    <div className="w-full min-h-screen p-5 cstm-flex-col bg-gradient-to-b from-prmColor via-prmColor to-scndColor">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <p className=" font-extrabold text-2xl text-accntColor relative z-10">Reset Password</p>
      <br />
      <form
        className="w-full rounded-md bg-white bg-opacity-20 backdrop-blur-md border-[1px] border-white border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
        onSubmit={(e) => sendResetEmail(e)}
      >
        <p className="text-xs text-white">
          Enter your user account&apos;s verified email address and we will send you a password
          reset link.
        </p>
        <InputComp
          id="candidateEmail"
          placeholder="Email"
          type="text"
          spellCheck={false}
          icon={<AiOutlineMail />}
          onChange={(e) => handleKeys(e.target)}
          value={keys.email}
        />
        <InputComp
          id="candidateUsername"
          placeholder="Username"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          onChange={(e) => handleKeys(e.target)}
          value={keys.username}
        />
        <ButtonComp
          type="submit"
          fontColor="text-prmColor"
          bgColor="bg-scndColor"
          label="Send Reset Email"
          css="w-full"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
