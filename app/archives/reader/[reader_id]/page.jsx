"use client";
import { useGlobalContext } from "@/src/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const Reader = () => {
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

  console.log(userData);

  return (
    <div className="w-full p-5 cstm-flex-col bg-accntColor min-h-screen overflow-y-auto cstm-scrollbar justify-start">
      page
    </div>
  );
};

export default Reader;
