import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const OfferCards = (props) => {
  return (
    <div
      className="bg-prmColor bg-opacity-30 rounded-md p-5 font-poppins w-full h-72 text-accntColor cstm-flex-col justify-start gap-4
                m-m:h-80
                m-l:h-96
                t:w-96
                l-s:w-72 l-s:h-72
                l-l:w-96 l-l:h-96"
    >
      <div className="bg-accntColor rounded-md shadow-lg w-full h-5/6" />
      <Link className="font-extrabold text-xl cstm-flex-row gap-2" href={props.to}>
        {props.label} <BsArrowRight />
      </Link>
    </div>
  );
};

export default OfferCards;
