"use client";
import React from "react";
import Image from "next/image";
import intersectAM from "../../public/IntersectAM.svg";
import intersectAT from "../../public/IntersectAT.svg";
import intersectAL from "../../public/IntersectAL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";
import { CiLock, CiUser, CiMail, CiUnlock } from "react-icons/ci";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/navigation";

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
        localStorage.setItem("readefine_token", `Bearer ${data.token}`);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
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
        Sign Up
      </p>
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
        <select
          className="focus:rounded-full focus:px-4 focus:l-s:px-6 rounded-md px-2 l-s:px-3
          shadow-md bg-accntColor p-2 w-full text-sm font-normal transition-all
          text-prmColor 
           focus:outline-none focus:border-none
           m-l:text-base
           t:text-lg
           l-s:p-3"
          name="gradeLevel"
          value={userData.gradeLevel}
          onChange={(e) => handleUserData(e.target)}
        >
          <option value={1}>Grade 1</option>
          <option value={2}>Grade 2</option>
          <option value={3}>Grade 3</option>
          <option value={4}>Grade 4</option>
          <option value={5}>Grade 5</option>
          <option value={6}>Grade 6</option>
        </select>
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
