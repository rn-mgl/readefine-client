import React from "react";
import { BiLoader } from "react-icons/bi";

const FetchingMessage = () => {
  return (
    <div className="text-prmColor animate-[fadeIn_500ms] cstm-flex-col w-full text-sm ">
      <div>
        <BiLoader className="animate-spin" />
      </div>
      <p> Getting data, please wait...</p>
    </div>
  );
};

export default FetchingMessage;
