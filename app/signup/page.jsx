"use client";
import React from "react";
import Image from "next/image";
import intersectAM from "../../public/IntersectAM.svg";
import intersectAT from "../../public/IntersectAT.svg";
import intersectAL from "../../public/IntersectAL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";

import axios from "axios";
import { CiLock, CiUser, CiMail, CiUnlock } from "react-icons/ci";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/navigation";
import SelectComp from "../../src/components/input/SelectComp";

const Signup = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    gradeLevel: 1,
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const { url } = useGlobalContext();

  const router = useRouter();

  const handleUserData = ({ name, value }) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/auth_client/client_signup`, {
        userData,
      });

      if (data) {
        router.push("/sending");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-prmColor p-5 cstm-flex-col font-poppins overflow-hidden">
      <p className=" font-extrabold text-2xl text-accntColor">Sign Up</p>
      <br />
      <form
        className="w-full rounded-md bg-scndColor bg-opacity-20 backdrop-blur-md border-[1px] border-scndColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
        onSubmit={signUp}
      >
        <InputComp
          id="name"
          placeholder="Name"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          value={userData.name}
          onChange={(e) => handleUserData(e.target)}
        />
        <InputComp
          id="surname"
          type="text"
          placeholder="Surname"
          spellCheck={false}
          icon={<CiUser />}
          value={userData.surname}
          onChange={(e) => handleUserData(e.target)}
        />
        <InputComp
          id="email"
          placeholder="E Mail"
          type="email"
          spellCheck={false}
          icon={<CiMail />}
          value={userData.email}
          onChange={(e) => handleUserData(e.target)}
        />
        <InputComp
          id="username"
          placeholder="Username"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
          value={userData.username}
          onChange={(e) => handleUserData(e.target)}
        />

        <InputComp
          id="password"
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
          value={userData.password}
          onChange={(e) => handleUserData(e.target)}
        />
        <SelectComp
          value={userData.gradeLevel}
          onChange={handleUserData}
          labelValue={[
            { label: "Grade 1", value: 1 },
            { label: "Grade 2", value: 2 },
            { label: "Grade 3", value: 3 },
            { label: "Grade 4", value: 4 },
            { label: "Grade 5", value: 5 },
            { label: "Grade 6", value: 6 },
          ]}
        />
        <ButtonComp
          type="submit"
          fontColor="text-prmColor"
          bgColor="bg-scndColor"
          label="Sign Up"
          css="w-full"
        />
      </form>

      <Image
        src={intersectAM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute t:hidden"
        priority
      />
      <Image
        src={intersectAT}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute t:block l-s:hidden"
        priority
      />
      <Image
        src={intersectAL}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute l-s:block"
        priority
      />
    </div>
  );
};

export default Signup;
