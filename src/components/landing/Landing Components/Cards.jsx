import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const OfferCards = (props) => {
  return (
    <div
      className={`relative bg-prmColor  bg-opacity-30 rounded-md p-5 font-poppins w-full h-72 text-accntColor cstm-flex-col justify-start gap-4 text-center
                m-m:h-80
                m-l:h-96
                t:w-96
                l-s:w-8/12 l-s:h-72 l-s:cstm-flex-row ${props.flexOrientation}
                l-l:w-6/12`}
    >
      <div
        className="bg-accntColor rounded-md shadow-lg w-full h-full
                    l-s:w-full"
      />
      <div className="w-full h-fit cstm-flex-col">
        <Image
          src={props.image}
          alt="fx"
          className={`w-24 absolute bottom-10 ${props.imagePos} drop-shadow-md drop-shadow-inherit
                    m-l:w-32 m-l:bottom-14
                    l-s:static l-s:bottom-auto l-s:left-auto l-s:right-auto l-s:w-56`}
        />
        <Link className="font-extrabold text-xl cstm-flex-row gap-2" href={props.to}>
          {props.label} <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OfferCards;
