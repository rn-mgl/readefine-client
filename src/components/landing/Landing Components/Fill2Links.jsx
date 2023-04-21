import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Fill2Links = (props) => {
  return (
    <div
      className="rounded-xl backdrop-blur-sm shadow-md p-5 w-full bg-white bg-opacity-20 cstm-flex-col gap-3 text-bgColor
                border-bgColor border-2 border-opacity-30"
    >
      <div className="rounded-xl bg-white w-full h-60"></div>

      <Link
        href={props.link}
        className="hover:scale-110 transition-all text-lg cstm-flex-row gap-2"
      >
        <span
          className=" font-mukta font-bold text-xl drop-shadow-md
                    m-l:text-2xl
                    t:text-3xl"
        >
          {props.title}
        </span>
        <BsArrowRight className="drop-shadow-md" />
      </Link>
    </div>
  );
};

export default Fill2Links;
