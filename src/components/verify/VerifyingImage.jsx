import React from "react";
import Smartphone from "@/public/verify/Smartphone.svg";
import Settings from "@/public/verify/Settings.svg";
import Image from "next/image";

const VerifyingImage = () => {
  return (
    <div className="cstm-flex-col p-4 text-center">
      <div className="w-full h-full flex flex-col items-center justify-center animate-float">
        <Image src={Settings} alt="verifying" priority className="w-8/12 drop-shadow-md t:w-6/12 animate-fadeIn" />
      </div>

      <Image src={Smartphone} alt="verifying" priority className="drop-shadow-md t:w-11/12" />
      <p className="text-prmColor font-bold text-base animate-fadeIn">Verifying...</p>
    </div>
  );
};

export default VerifyingImage;
