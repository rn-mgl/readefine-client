"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import intersectAL from "@/public/signup/IntersectAL.svg";
import intersectAM from "@/public/signup/IntersectAM.svg";
import intersectAT from "@/public/signup/IntersectAT.svg";
import Link from "next/link";

import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const HeadLogin = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const url = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // toggle if password can be seen
  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  // handle onchange functions on login
  const handleLoginData = ({ name, value }) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // login admin
  const loginHead = async (e) => {
    e.preventDefault();

    await signOut({ redirect: false });
    setLoadingState(true);
    setHasSubmitted(true);

    try {
      // login on middleware

      const { data } = await axios.post(`${url}/auth_head/head_login`, {
        loginData,
      });

      if (data.primary) {
        if (!data.primary.isVerified) {
          router.push("/sending?purpose=verify");
        } else {
          const creds = await signIn("credentials", {
            ...data.primary,
            redirect: false,
          });
          if (creds?.ok) {
            recordSession(data.primary);
            router.push("/head");
          }
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);

      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const recordSession = async (user) => {
    try {
      const { data } = await axios.post(
        `${url}/head_session`,
        { type: "in", headId: user?.headId },
        { headers: { Authorization: user?.token } }
      );
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  // return if loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-scndColor p-4 cstm-flex-col  overflow-hidden">
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <p className=" font-extrabold text-2xl text-prmColor relative z-20">
        Log In
      </p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-4 cstm-flex-col gap-4 relative z-10 shadow-lg
                  t:w-96
                  l-s:w-[26rem"
        onSubmit={(e) => loginHead(e)}
      >
        {/* username or email */}
        <InputComp
          id="candidateIdentifier"
          placeholder="Username or Email"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          onChange={(e) => handleLoginData(e.target)}
          value={loginData.candidateIdentifier}
        />

        {/* password */}
        <InputComp
          id="candidatePassword"
          placeholder="Password"
          type={visiblePassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword ? (
              <AiOutlineEyeInvisible onClick={handleVisiblePassword} />
            ) : (
              <AiOutlineEye onClick={handleVisiblePassword} />
            )
          }
          onChange={(e) => handleLoginData(e.target)}
          value={loginData.candidatePassword}
        />

        {/* link if password is forgotten */}
        <Link
          className="text-xs text-prmColor underline underline-offset-2"
          href="/overlook"
        >
          Forgot Password?
        </Link>

        {/* submit form */}
        <button
          type="submit"
          disabled={hasSubmitted}
          className="text-center rounded-md  text-sm font-bold transition-all
                text-accntColor bg-prmColor w-full disabled:saturate-50 p-2 px-4
                  "
        >
          Log In
        </button>
      </form>

      {/* render on phone */}
      <Image
        src={intersectAM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute t:hidden"
        priority
      />

      {/* render on tablet */}
      <Image
        src={intersectAT}
        alt="intersect"
        className="hidden w-full -bottom-40 left-0 absolute t:block l-s:hidden"
        priority
      />

      {/* render on laptop */}
      <Image
        src={intersectAL}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute l-s:block"
        priority
      />
    </div>
  );
};

export default HeadLogin;
