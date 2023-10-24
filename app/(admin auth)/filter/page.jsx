"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";
import InputComp from "@/components/input/InputComp";
import intersectSL from "@/public/landing/definition/IntersectSL.svg";
import intersectSM from "@/public/landing/definition/IntersectSM.svg";
import intersectST from "@/public/landing/definition/IntersectST.svg";
import Link from "next/link";

import { useGlobalContext } from "@/base/context";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const AdminLogin = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [firstLogin, setFirstLogin] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

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
  const loginAdmin = async (e) => {
    e.preventDefault();

    await signOut({ redirect: false });
    setLoadingState(true);
    setFirstLogin(true);
    setHasSubmitted(true);

    try {
      // login on middleware
      const data = await signIn("admin-credentials", {
        candidateIdentifier: loginData.candidateIdentifier,
        candidatePassword: loginData.candidatePassword,
        redirect: false,
      });

      if (!data?.ok) {
        setLoadingState(false);
        setFirstLogin(false);
        setHasSubmitted(false);
        setMessageStatus(true, "Incorrect login credentials.", "error");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setFirstLogin(false);
      setHasSubmitted(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  };

  const recordSession = React.useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${url}/admin_session`,
        { type: "in", adminId: user?.adminId },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        router.push("/controller");
      }
    } catch (error) {
      console.log(error);
      setLoadingState(false);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [router, url, user?.token, user?.adminId, setLoadingState, setMessageStatus]);

  const notYetVerified = React.useCallback(() => {
    router.push("/sending?purpose=verify");
  }, [router]);

  React.useEffect(() => {
    if (firstLogin && user && user.adminId && user.isVerified) {
      recordSession();
    }
  }, [recordSession, user, firstLogin]);

  React.useEffect(() => {
    if (firstLogin && user && user.adminId && !user.isVerified) {
      notYetVerified();
    }
  }, [notYetVerified, firstLogin, user]);

  // return if loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-prmColor p-5 cstm-flex-col  overflow-hidden">
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <p className=" font-extrabold text-2xl text-accntColor">Log In</p>

      <br />

      <form
        className="w-full rounded-md bg-accntColor bg-opacity-20 backdrop-blur-md border-[1px] 
                border-accntColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-96
                  l-s:w-[26rem]"
        onSubmit={(e) => loginAdmin(e)}
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
        <Link className="text-xs text-white underline underline-offset-2 l-l:text-prmColor" href="/fixer">
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
        className="w-full bottom-0 left-0 absolute rotate-180 t:hidden"
        priority
      />

      {/* render on tablet */}
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full -bottom-40 rotate-180 left-0 absolute t:block l-s:hidden"
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

export default AdminLogin;
