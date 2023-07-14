"use client";
import React from "react";
import Image from "next/image";
import intersectAM from "../../public/IntersectAM.svg";
import intersectAT from "../../public/IntersectAT.svg";
import intersectAL from "../../public/IntersectAL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";
import SelectComp from "../../src/components/input/SelectComp";
import Loading from "@/src/src/components/global/Loading";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CiUser, CiMail } from "react-icons/ci";
import { useGlobalContext } from "../../context";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    gradeLevel: 4,
  });
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({ msg: "", active: false });

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
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/auth_client/client_signup`, {
        userData,
      });

      if (data) {
        router.push("/sending");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-prmColor p-5 cstm-flex-col font-poppins overflow-hidden">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
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
              <AiOutlineEyeInvisible onClick={handleVisiblePassword} />
            ) : (
              <AiOutlineEye onClick={handleVisiblePassword} />
            )
          }
          value={userData.password}
          onChange={(e) => handleUserData(e.target)}
        />
        <SelectComp
          value={userData.gradeLevel}
          onChange={handleUserData}
          labelValue={[
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
      />
      <Image
        src={intersectAT}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute t:block l-s:hidden"
      />
      <Image
        src={intersectAL}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute l-s:block"
      />
    </div>
  );
};

export default Signup;
