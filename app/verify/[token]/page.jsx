"use client";
import UnverifiedImage from "@/src/components/src/components/verify/UnverifiedImage";
import VerifiedImage from "@/src/components/src/components/verify/VerifiedImage";
import VerifyingImage from "@/src/components/src/components/verify/VerifyingImage";
import React from "react";
import { useGlobalContext } from "@/src/components/context";
import axios from "axios";
import { usePathname } from "next/navigation";

const Verify = () => {
  const [status, setStatus] = React.useState("verifying");
  const { url } = useGlobalContext();
  const path = usePathname();
  const token = path.split("/")[2];

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
    }
  });

  React.useEffect(() => {
    verifyUser();
  });

  return (
    <div className="cstm-flex-col w-full min-h-screen bg-accntColor">
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
