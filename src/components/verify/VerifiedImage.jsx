import Image from "next/image";
import React from "react";
import FistBump from "@/public/verify/FistBump.svg";
import Protected from "@/public/verify/Protected.svg";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const VerifiedImage = (props) => {
  return (
    <div className="cstm-flex-col p-5 text-center gap-5">
      <div className="w-full h-full flex flex-col items-center justify-center animate-float">
        <Image src={Protected} alt="verified" className="w-8/12  drop-shadow-md t:w-6/12 animate-fadeIn" priority />
      </div>
      <Image src={FistBump} alt="verified" className="drop-shadow-md t:w-11/12" priority />
      <p className="text-prmColor text-base  animate-fadeIn">
        <span className="font-bold">Congratulations!</span> <br />
        <span> You are now verified. Have fun reading!</span>
      </p>
      <Link
        href={props.to}
        className="text-center  text-sm font-normal bg-prmColor text-accntColor rounded-full w-fit p-2 px-4 cstm-flex-row gap-2
                t:text-base"
      >
        Proceed to Log In
        <BsArrowRight />
      </Link>
    </div>
  );
};

export default VerifiedImage;
