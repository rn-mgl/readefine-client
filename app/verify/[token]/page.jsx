"use client";
import UnverifiedImage from "@/src/src/components/verify/UnverifiedImage";
import VerifiedImage from "@/src/src/components/verify/VerifiedImage";
import VerifyingImage from "@/src/src/components/verify/VerifyingImage";
import React from "react";
import axios from "axios";
import Message from "@/src/src/components/global/Message";

import { useGlobalContext } from "@/src/context";

const Verify = ({ params }) => {
  const [status, setStatus] = React.useState("verifying");
  const [message, setMessage] = React.useState({ msg: "", active: false });

  const { url } = useGlobalContext();
  const token = params?.token;

  const verifyUser = React.useCallback(async () => {
    try {
      const { data } = await axios.patch(`${url}/auth_client/client_verify`, { token });

      if (data) {
        setStatus("verified");
      } else {
        setStatus("unverified");
      }
    } catch (error) {
      console.log(error);
      setMessage({ active: true, msg: error?.response?.data?.msg });
    }
  }, [url, token, setStatus]);

  React.useEffect(() => {
    verifyUser();
  });

  return (
    <div className="cstm-flex-col w-full min-h-screen bg-accntColor">
      {message.active ? <Message message={message} setMessage={setMessage} /> : null}
      {status === "verifying" ? (
        <VerifyingImage />
      ) : status === "verified" ? (
        <VerifiedImage />
      ) : (
        <UnverifiedImage />
      )}
    </div>
  );
};

export default Verify;
