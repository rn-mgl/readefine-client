import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const OfferCards = (props) => {
  return (
    <div
      className={`relative bg-scndColor border-[1px] bg-opacity-30 border-scndColor border-opacity-30 rounded-md p-5 font-poppins w-full h-72 text-accntColor cstm-flex-col justify-start gap-4 text-center
                m-m:h-80
                m-l:h-96
                t:w-96
                l-s:w-72 l-s:h-72
                l-l:w-96 l-l:h-96`}
    >
      <div
        className="bg-accntColor rounded-md shadow-lg w-full h-full
                    l-s:w-full"
      />
      <div className="w-full cstm-flex-col">
        <Image
          src={props.image}
          alt="fx"
          className={`w-24 absolute bottom-10 ${props.imagePos} drop-shadow-md drop-shadow-inherit animate-float
                    m-l:w-32 m-l:bottom-14
                    l-s:w-20`}
        />
        <Link className="font-extrabold text-base cstm-flex-row gap-2" href={props.to}>
          {props.label} <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default OfferCards;
