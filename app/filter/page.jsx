"use client";
import React from "react";
import Image from "next/image";
import intersectSM from "../../public/IntersectSM.svg";
import intersectST from "../../public/IntersectST.svg";
import intersectSL from "../../public/IntersectSL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { CiLock, CiUser, CiUnlock } from "react-icons/ci";
import { useGlobalContext } from "../../context";
import { signIn } from "next-auth/react";

const AdminLogin = () => {
  const [loginData, setLoginData] = React.useState({
    candidateIdentifier: "",
    candidatePassword: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);

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

  const loginAdmin = async (e) => {
    e.preventDefault();

    await signIn("admin-credentials", {
      candidateIdentifier: loginData.candidateIdentifier,
      candidatePassword: loginData.candidatePassword,
      redirect: true,
      callbackUrl: "/controller",
    });
  };

  return (
    <div className="w-full h-screen bg-prmColor p-5 cstm-flex-col font-poppins overflow-hidden">
      <p
        className=" font-extrabold text-2xl text-accntColor
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Log In
      </p>
      <br />
      <form
        className="w-full rounded-md bg-accntColor bg-opacity-20 backdrop-blur-md border-[1px] border-accntColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
        onSubmit={(e) => loginAdmin(e)}
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
              <CiUnlock onClick={handleVisiblePassword} />
            ) : (
              <CiLock onClick={handleVisiblePassword} />
            )
          }
          onChange={(e) => handleLoginData(e.target)}
          value={loginData.candidatePassword}
        />
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
        priority
      />
      <Image
        src={intersectST}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute t:block l-s:hidden"
        priority
      />
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
