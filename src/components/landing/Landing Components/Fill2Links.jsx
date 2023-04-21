import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Fill2Links = (props) => {
  return (
    <div
      className="rounded-xl backdrop-blur-sm shadow-md p-5 w-full bg-white bg-opacity-20 cstm-flex-col gap-3 text-bgColor
                border-bgColor border-2 border-opacity-30"
    >
      <div
        className="rounded-xl bg-white w-full h-60
                m-l:h-72
                l-s:h-64
                l-l:h-72"
      ></div>
      <p
        className=" font-mukta font-bold text-xl drop-shadow-md
                    m-l:text-2xl
                    t:text-3xl"
      >
        {props.title}
      </p>
      <Link href={props.link} className="hover:scale-110 transition-all text-lg">
        <BsArrowRight className="drop-shadow-md" />
      </Link>
    </div>
  );
};

export default Fill2Links;
