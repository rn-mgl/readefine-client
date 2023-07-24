import React from "react";
import Smartphone from "../../../public/verify/Smartphone.svg";
import Settings from "../../../public/verify/Settings.svg";
import Image from "next/image";

const VerifyingImage = () => {
  return (
    <div className="cstm-flex-col p-5 text-center">
      <Image
        src={Settings}
        alt="verifying"
        loading="lazy"
        className="w-8/12 animate-float drop-shadow-md t:w-6/12 animate-fadeIn"
      />
      <Image src={Smartphone} alt="verifying" loading="lazy" className="drop-shadow-md t:w-11/12" />
      <p className="text-prmColor font-bold text-base animate-fadeIn">Verifying...</p>
    </div>
  );
};

export default VerifyingImage;
