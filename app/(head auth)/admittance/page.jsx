"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";

import intersectAM from "@/public/signup/IntersectAM.svg";
import intersectAT from "@/public/signup/IntersectAT.svg";
import intersectAL from "@/public/signup/IntersectAL.svg";
import InputComp from "@/components/input/InputComp";
import ButtonComp from "@/components/input/ButtonComp";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";

const HeadLogin = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [firstLogin, setFirstLogin] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;
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
    setFirstLogin(true);

    try {
      // login on middleware
      const data = await signIn("head-credentials", {
        candidateIdentifier: loginData.candidateIdentifier,
        candidatePassword: loginData.candidatePassword,
        redirect: false,
      });

      if (!data?.ok) {
        setLoadingState(false);
        setFirstLogin(false);
        setMessageStatus(true, "Incorrect login credentials.", "error");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setFirstLogin(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const recordSession = React.useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${url}/head_session`,
        { type: "in", headId: user?.headId },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        router.push("/head");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [router, url, user?.token, user?.headId, setLoadingState, setMessageStatus]);

  const notYetVerified = React.useCallback(() => {
    router.push("/sending?purpose=verify");
  }, [router]);

  React.useEffect(() => {
    if (firstLogin && user && user.headId && user.isVerified) {
      recordSession();
    }
  }, [recordSession, user, firstLogin]);

  React.useEffect(() => {
    if (firstLogin && user && user.headId && !user.isVerified) {
      notYetVerified();
    }
  }, [notYetVerified, firstLogin, user]);

  // return if loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-scndColor p-5 cstm-flex-col  overflow-hidden">
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <p className=" font-extrabold text-2xl text-prmColor">Log In</p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
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
        <Link className="text-xs text-prmColor underline underline-offset-2" href="/fixer">
          Forgot Password?
        </Link>

        {/* submit form */}
        <ButtonComp type="submit" fontColor="text-accntColor" bgColor="bg-prmColor" label="Log In" css="w-full" />
      </form>

      {/* render on phone */}
      <Image src={intersectAM} alt="intersect" className="w-full bottom-0 left-0 absolute t:hidden" priority />

      {/* render on tablet */}
      <Image
        src={intersectAT}
        alt="intersect"
        className="hidden w-full -bottom-40 left-0 absolute t:block l-s:hidden"
        priority
      />

      {/* render on laptop */}
      <Image src={intersectAL} alt="intersect" className="hidden w-full bottom-0 left-0 absolute l-s:block" priority />
    </div>
  );
};

export default HeadLogin;
