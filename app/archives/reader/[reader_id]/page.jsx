"use client";

import React from "react";
import ClientPageHeader from "@/src/src/client/global/PageHeader";
import MainProfile from "@/src/src/client/reader/MainProfile";
import axios from "axios";
import EditMain from "@/src/src/client/reader/EditMain";
import EditGradeLevel from "@/src/src/client/reader/EditGradeLevel";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

const Reader = () => {
  const [userData, setUserData] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canEditGradeLevel, setCanEditGradeLevel] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  const handleCanEditGradeLevel = () => {
    setCanEditGradeLevel((prev) => !prev);
  };

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
    <div className="w-full p-5 cstm-flex-col bg-accntColor min-h-screen overflow-y-auto cstm-scrollbar justify-start gap-5">
      <ClientPageHeader mainHeader="Readefine" subHeader="Profile" />

      {canEditMain ? (
        <EditMain getUserData={getUserData} handleCanEditMain={handleCanEditMain} />
      ) : null}

      {canEditGradeLevel ? (
        <EditGradeLevel handleCanEditGradeLevel={handleCanEditGradeLevel} />
      ) : null}

      <div className="cstm-w-limit cstm-flex-col gap-5 w-full">
        <MainProfile
          handleCanEditGradeLevel={handleCanEditGradeLevel}
          handleCanEditMain={handleCanEditMain}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Reader;
