import Image from "next/image";
import React from "react";
import FistBump from "../../../public/verify/FistBump.svg";
import Protected from "../../../public/verify/Protected.svg";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const VerifiedImage = () => {
  return (
    <div className="cstm-flex-col p-5 text-center gap-5">
      <Image
        src={Protected}
        alt="verified"
        className="w-8/12 animate-float drop-shadow-md t:w-6/12 animate-fadeIn"
        loading="lazy"
      />
      <Image src={FistBump} alt="verified" className="drop-shadow-md t:w-11/12" loading="lazy" />
      <p className="text-prmColor text-base  animate-fadeIn">
        <span className="font-bold">Congratulations!</span> <br />
        <span> You are now verified. Have fun reading!</span>
      </p>
      <Link
        href="/login"
        className="text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full w-fit p-2 px-4 cstm-flex-row gap-2
                t:text-base"
      >
        Proceed to Log In
        <BsArrowRight />
      </Link>
    </div>
  );
};

export default VerifiedImage;
