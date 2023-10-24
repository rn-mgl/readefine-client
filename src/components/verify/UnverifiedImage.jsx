import React from "react";
import Rejected from "@/public/verify/Rejected.svg";
import Image from "next/image";

const UnverifiedImage = () => {
  return (
    <div className="cstm-flex-col p-5 text-center">
      <div className="w-full h-full flex flex-col items-center justify-center animate-float">
        <Image src={Rejected} alt="rejected" className="w-8/12 drop-shadow-md t:w-6/12 animate-fadeIn" priority />
      </div>
      <p className="text-prmColor text-base animate-fadeIn">
        Sorry, you were not verified because your credentials could not be found.
      </p>
    </div>
  );
};

export default UnverifiedImage;
