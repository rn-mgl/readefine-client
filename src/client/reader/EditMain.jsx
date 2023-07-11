"use client";

import React from "react";
import axios from "axios";

import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

const EditMain = (props) => {
  const [userData, setUserData] = React.useState({});

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user/${user?.userId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setUserData]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  return (
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 justify-start p-5 top-0 left-0">
      <button onClick={props.handleCanEditMain} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>

      <div className="cstm-w-limit cstm-flex-col gap-5"></div>
    </div>
  );
};

export default EditMain;
