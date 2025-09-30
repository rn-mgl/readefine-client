"use client";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import axios from "axios";
import React from "react";

import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const ForgotPassword = () => {
  const [keys, setKeys] = React.useState({
    candidateEmail: "",
    candidateUsername: "",
  });
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const url = process.env.API_URL;
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
    setHasSubmitted(true);
    setLoadingState(true);

    const { candidateEmail, candidateUsername } = keys;
    try {
      const { data } = await axios.post(`${url}/auth_client_password_reset`, {
        candidateEmail,
        candidateUsername,
      });

      // if sent, move to sending page
      if (data) {
        router.push("/sending?purpose=reset");
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
    <div className="w-full min-h-screen p-4 cstm-flex-col bg-accntColor">
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <p className=" font-extrabold text-2xl text-prmColor relative z-10">
        Reset Password
      </p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-10 backdrop-blur-md border-[1px] border-prmColor border-opacity-30 p-4 cstm-flex-col gap-4 relative z-10 shadow-lg
                    t:w-96
                    l-s:w-[26rem]"
        onSubmit={(e) => sendResetEmail(e)}
      >
        <p className="text-xs text-prmColor font-medium">
          Enter your account&apos;s email address and we will send you a
          password reset link.
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
                text-scndColor bg-prmColor w-full disabled:saturate-50 p-2 px-4"
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
