"use client";
import React from "react";
import Image from "next/image";
import intersectSM from "../../public/IntersectSM.svg";
import intersectST from "../../public/IntersectST.svg";
import intersectSL from "../../public/IntersectSL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";
import Loading from "@/src/src/components/global/Loading";
import Message from "@/src/src/components/global/Message";
import Link from "next/link";
import axios from "axios";

import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { signIn } from "next-auth/react";

const Login = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false });
  const [loading, setLoading] = React.useState(false);

  const { url } = useGlobalContext();
  const router = useRouter();

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const handleLoginData = ({ name, value }) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    await signIn("client-credentials", {
      candidateIdentifier: loginData.candidateIdentifier,
      candidatePassword: loginData.candidatePassword,
      redirect: false,
    });

    try {
      const { data } = await axios.post(`${url}/auth_client/client_login`, { loginData });
      if (data) {
        if (data.primary.isVerified) {
          router.push("/archives");
        } else {
          router.push(`/verify/${data.primary.token.split(" ")[1]}`);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-accntColor p-5 cstm-flex-col font-poppins overflow-hidden">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      <p className=" font-extrabold text-2xl text-prmColor">Log In</p>
      <br />
      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
        onSubmit={(e) => loginUser(e)}
      >
        <InputComp
          id="candidateIdentifier"
          placeholder="Username or Email"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          onChange={(e) => handleLoginData(e.target)}
          value={loginData.candidateIdentifier}
        />
        <InputComp
          id="candidatePassword"
          placeholder="Password"
          type={visiblePassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword ? (
              <AiOutlineEye onClick={handleVisiblePassword} />
            ) : (
              <AiOutlineEyeInvisible onClick={handleVisiblePassword} />
            )
          }
          onChange={(e) => handleLoginData(e.target)}
          value={loginData.candidatePassword}
        />
        <Link className="text-xs text-white underline underline-offset-2" href="/forgot">
          Forgot Password?
        </Link>
        <ButtonComp
          type="submit"
          fontColor="text-accntColor"
          bgColor="bg-prmColor"
          label="Log In"
          css="w-full"
        />
      </form>

      <Image
        src={intersectSM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute rotate-180 t:hidden"
      />
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute t:block l-s:hidden"
      />
      <Image
        src={intersectSL}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute l-s:block"
      />
    </div>
  );
};

export default Login;
