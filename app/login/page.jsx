"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import Loading from "@/src/src/components/global/Loading";
import Message from "@/src/src/components/global/Message";
import ReceiveAchievement from "@/src/src/client/achievements/ReceiveAchievement";
import intersectSM from "../../public/landing/definition/IntersectSM.svg";
import intersectST from "../../public/landing/definition/IntersectST.svg";
import intersectSL from "../../public/landing/definition/IntersectSL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";

import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [accomplishedAchievement, setAccomplishedAchievement] = React.useState({
    accomplished: false,
    achievements: [],
  });
  const [achievementUrl, setAchievementUrl] = React.useState("/archives");
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false, type: "info" });
  const [loading, setLoading] = React.useState(false);

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

  // reset accomplished achievement to close popup
  const handleAccomplishedAchievement = () => {
    setAccomplishedAchievement({
      accomplished: false,
      data: {},
    });
  };

  // log in user
  const loginUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    // log in for middleware
    const data = await signIn("client-credentials", {
      candidateIdentifier: loginData.candidateIdentifier,
      candidatePassword: loginData.candidatePassword,
      redirect: false,
    });

    if (!data?.ok) {
      setLoading(false);
      setMessage({ active: true, msg: "Login credentials do not match.", type: "error" });
    }
  };

  const checkAchievementAndSession = React.useCallback(async () => {
    try {
      if (user?.isVerified) {
        // add session in db
        const { data: sessionData } = await axios.post(
          `${url}/session`,
          { type: "in", userId: user?.userId },
          { headers: { Authorization: user?.token } }
        );

        // update session achievement points and return if achievement is met
        const { data: achievementData } = await axios.patch(
          `${url}/user_achievement`,
          { type: "user_session", specifics: "days_online", toAdd: 1 },
          { headers: { Authorization: user?.token } }
        );

        // if there are achievements
        if (achievementData.length) {
          setLoading(false);
          setAccomplishedAchievement({ accomplished: true, achievements: achievementData });
          setAchievementUrl(user?.isVerified ? "/archives" : "/sending");
        } else {
          router.push("/archives");
        }
      } else if (!user?.isVerified) {
        router.push("/sending");
      }
    } catch (error) {
      console.log(error);
    }
  }, [router, url, user]);

  React.useEffect(() => {
    if (user && user.userId) {
      checkAchievementAndSession();
    }
  }, [user, checkAchievementAndSession]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-accntColor p-5 cstm-flex-col font-poppins overflow-hidden">
      {/* if achievement is received */}
      {accomplishedAchievement.accomplished ? (
        <ReceiveAchievement
          achievements={accomplishedAchievement.achievements}
          url={achievementUrl}
          handleAccomplishedAchievement={handleAccomplishedAchievement}
        />
      ) : null}

      {/* if message has popped up */}
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}

      <p className=" font-extrabold text-2xl text-prmColor">Log In</p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
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
        <Link className="text-xs text-white underline underline-offset-2" href="/forgot">
          Forgot Password?
        </Link>

        {/* submit form */}
        <ButtonComp
          type="submit"
          fontColor="text-accntColor"
          bgColor="bg-prmColor"
          label="Log In"
          css="w-full"
        />
      </form>

      {/* render on phone */}
      <Image
        src={intersectSM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute rotate-180 t:hidden"
        loading="lazy"
      />

      {/* render on tablet */}
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute t:block l-s:hidden"
        loading="lazy"
      />

      {/* render on laptop */}
      <Image
        src={intersectSL}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute l-s:block"
        loading="lazy"
      />
    </div>
  );
};

export default Login;
