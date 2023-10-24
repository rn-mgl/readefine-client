import React from "react";
import Mail from "@/public/sending/Mail.svg";
import Image from "next/image";

const MESSAGE_PURPOSE = {
  verify: "We are currently sending the email for your account verification.",
  reset: "We are currently sending the email for your password reset.",
};

const Sending = ({ searchParams: { purpose } }) => {
  const message = MESSAGE_PURPOSE[purpose]
    ? MESSAGE_PURPOSE[purpose]
    : "We are currently sending the email you requested.";

  return (
    <div className="cstm-flex-col text-center w-full min-h-screen text-prmColor p-5 gap-5">
      <Image priority src={Mail} alt="sending" className="w-8/12 animate-float drop-shadow-md t:w-56" />

      <p className="animate-fadeIn">It may take a minute or two. {message}</p>

      <p className="font-light text-sm animate-fadeIn">You can close this tab if you have received your email.</p>
    </div>
  );
};

export default Sending;
