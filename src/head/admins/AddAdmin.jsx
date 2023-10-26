"use client";
import axios from "axios";
import Image from "next/image";
import React from "react";

import intersectAL from "@/public/signup/IntersectAL.svg";
import intersectAM from "@/public/signup/IntersectAM.svg";
import intersectAT from "@/public/signup/IntersectAT.svg";

import Loading from "@/components/global/Loading";
import Message from "@/components/global/Message";

import AuthPos from "@/client/signup/AuthPos";
import GradePos from "@/client/signup/GradePos";
import NamePos from "@/client/signup/NamePos";
import validator from "validator";

import { avatars } from "@/functions/avatars";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import { BsDot } from "react-icons/bs";
import { useGlobalContext } from "@/base/context";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";

const AddAdmin = (props) => {
  const [userData, setUserData] = React.useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    image: "",
    gradeLevel: 4,
  });
  const [activePos, setActivePos] = React.useState(1);
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);
  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

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
      const { data } = await axios.post(
        `${url}/head_admin`,
        {
          userData,
        },
        { headers: { Authorization: user?.token } }
      );

      // send to the sending page iif successfully registered
      if (data) {
        props.getAllAdmins();
        props.handleCanAddAdmins();
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
    <div
      className="w-full h-full fixed backdrop-blur-md top-0
                left-0 z-20 p-4 cstm-flex-col gap-4 justify-start"
    >
      <button className="cstm-bg-hover ml-auto" onClick={props.handleCanAddAdmins}>
        <IoClose className="text-prmColor scale-125" />
      </button>

      {/* show message pop up */}
      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="cstm-flex-col w-full h-full cstm-w-limit gap-4">
        <p className="text-prmColor font-bold text-xl">Add Admin</p>
        <form
          className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-md border-[1px] 
                    border-prmColor border-opacity-40 p-4 cstm-flex-col gap-4 relative z-10 shadow-lg
                    t:w-96
                    l-s:w-[26rem]"
          onSubmit={signUp}
        >
          {activeForm}

          <div className="cstm-flex-row">
            <BsDot
              className={`${activePos === 1 ? "text-prmColor scale-150" : "text-white scale-125"} transition-all`}
            />
            <BsDot
              className={`${activePos === 2 ? "text-prmColor scale-150" : "text-white scale-125"} transition-all`}
            />
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
                } text-sm bg-scndColor text-prmColor p-2 w-24 rounded-md font-bold`}
              >
                Next
              </button>
            ) : null}

            {activePos === 2 ? (
              <button type="submit" className="text-sm bg-scndColor text-prmColor p-2 w-24 rounded-md font-bold">
                Register
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
