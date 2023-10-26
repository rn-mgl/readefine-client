"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ReceiveAchievement from "@/client/achievements/ReceiveAchievement";
import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import intersectSL from "@/public/landing/definition/IntersectSL.svg";
import intersectSM from "@/public/landing/definition/IntersectSM.svg";
import intersectST from "@/public/landing/definition/IntersectST.svg";

import { useGlobalContext } from "@/base/context";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useReceiveAchievement } from "@/hooks/useReceiveAchievement";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [firstLogin, setFirstLogin] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { accomplishedAchievement, achievementUrl, claimNewAchievement, resetAchievement, setNewAchievementUrl } =
    useReceiveAchievement();

  const { message, setMessageStatus } = useMessage();

  const { loading, setLoadingState } = useLoading(false);

  const { url } = useGlobalContext();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user?.name;

  // toggle if password can be seen
  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  // handle onchange function on login input
  const handleLoginData = ({ name, value }) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // log in user
  const loginUser = async (e) => {
    e.preventDefault();

    await signOut({ redirect: false });

    setLoadingState(true);
    setFirstLogin(true);
    setHasSubmitted(true);

    try {
      // log in for middleware
      const data = await signIn("client-credentials", {
        candidateIdentifier: loginData.candidateIdentifier,
        candidatePassword: loginData.candidatePassword,
        redirect: false,
      });

      if (!data?.ok) {
        setLoadingState(false);
        setFirstLogin(false);
        setHasSubmitted(false);
        setMessageStatus(true, "Login credentials do not match.", "error");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setFirstLogin(false);
      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const checkAchievement = React.useCallback(async () => {
    try {
      // update session achievement points and return if achievement is met
      const { data: achievementData } = await axios.patch(
        `${url}/user_achievement`,
        { type: "user_session", toAdd: 1 },
        { headers: { Authorization: user?.token } }
      );

      // if there are achievements
      if (achievementData.length) {
        setLoadingState(false);
        claimNewAchievement(achievementData);
        setNewAchievementUrl(user?.isVerified ? "/archives" : "/sending?purpose=verify");
      } else {
        router.push("/archives");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [
    router,
    url,
    user?.token,
    user?.isVerified,
    claimNewAchievement,
    setNewAchievementUrl,
    setLoadingState,
    setMessageStatus,
  ]);

  const addSession = React.useCallback(async () => {
    try {
      // add session in db
      const { data: sessionData } = await axios.post(
        `${url}/session`,
        { type: "in", userId: user?.userId },
        { headers: { Authorization: user?.token } }
      );
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, user?.userId, setLoadingState, setMessageStatus]);

  const notYetVerified = React.useCallback(async () => {
    router.push("/sending?purpose=verify");
  }, [router]);

  React.useEffect(() => {
    if (firstLogin && user && user.userId && user.isVerified) {
      addSession();
    }
  }, [user, firstLogin, addSession]);

  React.useEffect(() => {
    if (firstLogin && user && user.userId && user.isVerified) {
      checkAchievement();
    }
  }, [user, firstLogin, checkAchievement]);

  React.useEffect(() => {
    if (firstLogin && user && user.userId && !user.isVerified) {
      notYetVerified();
    }
  }, [user, firstLogin, notYetVerified]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-accntColor p-4 cstm-flex-col  overflow-hidden">
      {/* if achievement is received */}
      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          url={achievementUrl}
          resetAchievement={resetAchievement}
        />
      ) : null}

      {/* if message has popped up */}
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <p className=" font-extrabold text-2xl text-prmColor">Log In</p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] 
                border-prmColor border-opacity-40 p-4 cstm-flex-col gap-4 relative z-10 shadow-lg
                  t:w-96
                  l-s:w-[26rem]"
        onSubmit={(e) => loginUser(e)}
      >
        {/* username or email*/}
        <InputComp
          id="candidateIdentifier"
          placeholder="Username or Email"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          onChange={(e) => handleLoginData(e.target)}
          required={true}
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
          required={true}
          value={loginData.candidatePassword}
        />

        {/* link if password is forgotten */}
        <Link className="text-xs text-prmColor underline underline-offset-2" href="/forgot">
          Forgot Password?
        </Link>

        {/* submit form */}
        <button
          type="submit"
          disabled={hasSubmitted}
          className="text-center rounded-md  text-sm font-bold transition-all
                text-accntColor bg-prmColor w-full disabled:saturate-50 p-2 px-4"
        >
          Log In
        </button>
      </form>

      {/* render on phone */}
      <Image
        src={intersectSM}
        alt="intersect"
        className="w-full -bottom-10 left-0 fixed rotate-180 t:hidden"
        priority
      />

      {/* render on tablet */}
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full -bottom-40 rotate-180 left-0 fixed t:block l-s:hidden"
        priority
      />

      {/* render on laptop */}
      <Image
        src={intersectSL}
        alt="intersect"
        className="hidden w-full -bottom-10 rotate-180 left-0 fixed l-s:block"
        priority
      />
    </div>
  );
};

export default Login;
