"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

import intersectSL from "@/public/landing/definition/IntersectSL.svg";
import intersectSM from "@/public/landing/definition/IntersectSM.svg";
import intersectST from "@/public/landing/definition/IntersectST.svg";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";

import AuthPos from "@/client/signup/AuthPos";
import NamePos from "@/client/signup/NamePos";
import validator from "validator";

import { avatars } from "@/functions/avatars";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import { BsDot } from "react-icons/bs";
import { useGlobalContext } from "@/base/context";

const Signup = () => {
  const [userData, setUserData] = React.useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    image: "",
  });
  const [activePos, setActivePos] = React.useState(1);
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();

  const router = useRouter();

  // handle onchange functions in input
  const handleUserData = ({ name, value }) => {
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // check if filled
  const infoAreFilled = () => {
    if (activePos === 1) {
      if (!userData.name || !userData.surname) {
        setMessageStatus(true, "Do not skip any information.", "warning");
        return false;
      }
    }

    if (activePos === 2) {
      if (!userData.email || !userData.username || !userData.password) {
        setMessageStatus(true, "Do not skip any information.", "warning");
        return false;
      }

      if (!validator.isEmail(userData.email)) {
        setMessageStatus(true, "The email you entered is not valid.", "warning");
        return false;
      }

      if (userData.password?.length < 8) {
        setMessageStatus(true, "Password must not be less than 8 characters.", "warning");
        return false;
      }
    }

    if (activePos === 3) {
      if (!userData.gradeLevel) {
        setMessageStatus(true, "Do not skip any information.", "warning");
        return false;
      }
    }

    return true;
  };

  // next pos
  const handleNextPos = () => {
    if (infoAreFilled()) {
      setActivePos((prev) => (prev + 1 > 3 ? 3 : prev + 1));
    }
  };

  // prev pos
  const handlePrevPos = () => {
    setActivePos((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  // toggle if password can be seen or not
  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  // register the user
  const signUp = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    const randomIndex = Math.floor(Math.random() * avatars.length);
    const userAvatar = avatars[randomIndex];
    userData.image = userAvatar;

    try {
      const { data } = await axios.post(`${url}/auth_head/head_signup`, {
        userData,
      });

      // send to the sending page iif successfully registered
      if (data) {
        router.push("/sending?purpose=verify");
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
      setLoadingState(false);
    }
  };

  const activeForm =
    activePos === 1 ? (
      <NamePos userData={userData} handleUserData={handleUserData} />
    ) : activePos === 2 ? (
      <AuthPos
        userData={userData}
        visiblePassword={visiblePassword}
        handleUserData={handleUserData}
        handleVisiblePassword={handleVisiblePassword}
      />
    ) : null;

  // render loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-accntColor p-5 cstm-flex-col font-poppins ">
      {/* show message pop up */}
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <p className=" font-extrabold text-2xl text-accntColor">Sign Up</p>
      <br />
      <form
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                    t:w-96
                    l-s:w-[26rem]"
        onSubmit={signUp}
      >
        {activeForm}

        <div className="cstm-flex-row">
          <BsDot className={`${activePos === 1 ? "text-prmColor scale-150" : "text-white scale-125"} transition-all`} />
          <BsDot className={`${activePos === 2 ? "text-prmColor scale-150" : "text-white scale-125"} transition-all`} />
        </div>

        <div className="cstm-flex-row w-full">
          {activePos !== 1 ? (
            <button
              type="button"
              onClick={handlePrevPos}
              className="mr-auto text-sm bg-accntColor text-prmColor p-2 w-24 rounded-md font-bold"
            >
              Back
            </button>
          ) : null}

          {activePos !== 2 ? (
            <button
              type="button"
              onClick={handleNextPos}
              className={`${
                activePos === 1 ? "ml-auto" : ""
              } text-sm bg-prmColor text-scndColor p-2 w-24 rounded-md font-bold`}
            >
              Next
            </button>
          ) : null}

          {activePos === 2 ? (
            <button type="submit" className="text-sm bg-prmColor text-scndColor p-2 w-24 rounded-md font-bold">
              Sign Up
            </button>
          ) : null}
        </div>
      </form>

      {/* render on mobile view*/}
      <Image src={intersectSM} alt="intersect" className="rotate-180 w-full bottom-0 left-0 fixed t:hidden" priority />

      {/* render on tablet */}
      <Image
        src={intersectST}
        alt="intersect"
        className="rotate-180 hidden w-full -bottom-40 left-0 fixed t:block l-s:hidden"
        priority
      />

      {/* render on laptop */}
      <Image
        src={intersectSL}
        alt="intersect"
        className="rotate-180 hidden w-full -bottom-10 left-0 fixed l-s:block"
        priority
      />
    </div>
  );
};

export default Signup;
