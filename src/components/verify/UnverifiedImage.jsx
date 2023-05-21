import React from "react";
import Rejected from "../../../public/Rejected.svg";
import Image from "next/image";

const UnverifiedImage = () => {
  return (
    <div className="cstm-flex-col p-5 text-center">
      <Image
        src={Rejected}
        alt="rejected"
        className="w-8/12 animate-float drop-shadow-md t:w-6/12 animate-fadeIn"
        priority
      />
      <p className="text-prmColor text-base animate-fadeIn">
        Sorry, you were not verified because your credentials could not be found.
      </p>
    </div>
  );
};

export default UnverifiedImage;
