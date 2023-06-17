"use client";
import React from "react";
import intersectSM from "../../../public/IntersectSM.svg";
import intersectST from "../../../public/IntersectST.svg";
import intersectSL from "../../../public/IntersectSL.svg";
import Image from "next/image";
import InputComp from "@/src/src/components/input/InputComp";
import ButtonComp from "@/src/src/components/input/ButtonComp";
import Link from "next/link";
import { CiLock, CiUnlock } from "react-icons/ci";
import axios from "axios";
import { useGlobalContext } from "@/src/context";
import { useRouter } from "next/navigation";

const PasswordReset = ({ params }) => {
  const [password, setPassword] = React.useState({ newPassword: "", retypedPassword: "" });
  const [visiblePassword, setVisiblePassword] = React.useState({
    newPassword: false,
    retypedPassword: false,
  });

  const { url } = useGlobalContext();
  const router = useRouter();
  const token = params?.token;

  const handleNewPassword = ({ name, value }) => {
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleVisiblePassword = (pname) => {
    setVisiblePassword((prev) => {
      return {
        ...prev,
        [pname]: !prev[pname],
      };
    });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const { newPassword, retypedPassword } = password;
    try {
      const { data } = await axios.post(`${url}/auth_client_password_reset/${token}`, {
        newPassword,
        retypedPassword,
      });
      if (data) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 cstm-flex-col w-full min-h-screen bg-gradient-to-b bg-accntColor ">
      <p className=" font-extrabold text-2xl text-prmColor">Enter New Password</p>

      <br />

      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
        onSubmit={(e) => changePassword(e)}
      >
        <InputComp
          id="newPassword"
          placeholder="Password"
          type={visiblePassword.newPassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword.newPassword ? (
              <CiUnlock onClick={() => handleVisiblePassword("newPassword")} />
            ) : (
              <CiLock onClick={() => handleVisiblePassword("newPassword")} />
            )
          }
          onChange={(e) => handleNewPassword(e.target)}
          value={password.newPassword}
        />
        <InputComp
          id="retypedPassword"
          placeholder="Password"
          type={visiblePassword.retypedPassword ? "text" : "password"}
          spellCheck={false}
          icon={
            visiblePassword.retypedPassword ? (
              <CiUnlock onClick={() => handleVisiblePassword("retypedPassword")} />
            ) : (
              <CiLock onClick={() => handleVisiblePassword("retypedPassword")} />
            )
          }
          onChange={(e) => handleNewPassword(e.target)}
          value={password.retypedPassword}
        />

        <ButtonComp
          type="submit"
          fontColor="text-accntColor"
          bgColor="bg-prmColor"
          label="Change Password"
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

export default PasswordReset;
