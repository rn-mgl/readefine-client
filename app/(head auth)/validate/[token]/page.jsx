"use client";
import Message from "@/components/global/Message";
import UnverifiedImage from "@/components/verify/UnverifiedImage";
import VerifiedImage from "@/components/verify/VerifiedImage";
import VerifyingImage from "@/components/verify/VerifyingImage";
import axios from "axios";
import React from "react";

import { useMessage } from "@/hooks/useMessage";
import { signOut } from "next-auth/react";
import { useParams } from "next/navigation";

const HeadVerify = () => {
  const [status, setStatus] = React.useState("verifying");

  const { message, setMessageStatus } = useMessage();

  const url = process.env.API_URL;
  const params = useParams();
  const token = params?.token;

  // verify user
  const verifyUser = React.useCallback(async () => {
    try {
      const { data } = await axios.patch(`${url}/auth_head/head_verify`, {
        token,
      });

      await signOut({ redirect: false });

      // check if properly verified using the correct token
      if (data) {
        setStatus("verified");
      } else {
        setStatus("unverified");
      }
    } catch (error) {
      console.log(error);
      setStatus("unverified");
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, token, setMessageStatus]);

  React.useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <div className="cstm-flex-col w-full min-h-screen bg-accntColor">
      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      {/* render image depending on verification status */}

      {status === "verifying" ? (
        <VerifyingImage />
      ) : status === "verified" ? (
        <VerifiedImage to="/admittance" />
      ) : (
        <UnverifiedImage />
      )}
    </div>
  );
};

export default HeadVerify;
