"use client";

import EditMain from "@/head/account/EditMain";
import axios from "axios";
import React from "react";

import HeadPageHeader from "@/head/global/PageHeader";
import ChangePassword from "@/head/account/ChangePassword";
import MainAccount from "@/head/account/MainOverview";
import Message from "@/components/global/Message";

import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { decipher } from "@/functions/security";
import { useMessage } from "@/hooks/useMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Account = ({ params }) => {
  const [headData, setHeadData] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { message, setMessageStatus } = useMessage();
  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.head_id);
  const router = useRouter();

  // toggle can edit main data
  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  // toggle can change password
  const handleCanChangePassword = () => {
    setCanChangePassword((prev) => !prev);
  };

  // get head data
  const getHeadData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setHeadData(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getHeadData();
    }
  }, [user, getHeadData]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/admittance");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start cstm-scrollbar gap-4">
      <HeadPageHeader mainHeader="Account" subHeader="Readefine" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {canEditMain ? <EditMain headId={user?.headId} handleCanEditMain={handleCanEditMain} /> : null}

      {canChangePassword ? <ChangePassword handleCanChangePassword={handleCanChangePassword} /> : null}

      <div className="cstm-flex-col cstm-scrollbar cstm-w-limit w-full gap-4">
        <MainAccount
          headData={headData}
          handleCanEditMain={handleCanEditMain}
          handleCanChangePassword={handleCanChangePassword}
        />
      </div>
    </div>
  );
};

export default Account;
