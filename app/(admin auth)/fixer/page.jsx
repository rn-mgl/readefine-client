"use client";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import axios from "axios";
import React from "react";

import { useGlobalContext } from "@/base/context";
import Loading from "@/components/global/Loading";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const AdminForgotPassword = () => {
  const [keys, setKeys] = React.useState({ candidateEmail: "", candidateUsername: "" });
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();
  const router = useRouter();

  // handle onchange function on email and username
  const handleKeys = ({ name, value }) => {
    setKeys((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // send email
  const sendResetEmail = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    setHasSubmitted(true);

    const { candidateEmail, candidateUsername } = keys;

    try {
      const { data } = await axios.post(`${url}/auth_admin_password_reset`, {
        candidateEmail,
        candidateUsername,
      });

      // if sent, move to sending page
      if (data) {
        router.push("/sending?purpose=reset");
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
    <div className="w-full min-h-screen p-5 cstm-flex-col bg-prmColor">
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <p className=" font-extrabold text-2xl text-accntColor relative z-10">Reset Password</p>

      <br />

      <form
        className="w-full rounded-md bg-white bg-opacity-20 backdrop-blur-md border-[1px] border-white border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                    t:w-96
                    l-s:w-[26rem]"
        onSubmit={(e) => sendResetEmail(e)}
      >
        <p className="text-xs text-white">
          Enter your account&apos;s email address and we will send you a password reset link.
        </p>

        {/* email */}
        <InputComp
          id="candidateEmail"
          placeholder="Email"
          type="text"
          spellCheck={false}
          icon={<AiOutlineMail />}
          onChange={(e) => handleKeys(e.target)}
          value={keys.email}
        />

        {/* username */}
        <InputComp
          id="candidateUsername"
          placeholder="Username"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          onChange={(e) => handleKeys(e.target)}
          value={keys.username}
        />

        {/* submit form */}
        <button
          type="submit"
          disabled={hasSubmitted}
          className="text-center rounded-md  text-sm font-bold transition-all
                text-prmColor bg-accntColor w-full disabled:saturate-50 p-2 px-4"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
