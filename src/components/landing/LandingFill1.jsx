import React from "react";

import Image from "next/image";
import Link from "next/link";

import lexileIcon from "../../../public/readefine lexile.png";
import { BsArrowRight } from "react-icons/bs";

const LandingFill1 = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-x-hidden bg-bgColor cstm-flex-col p-5
                l-s:p-10
                l-l:px-20"
    >
      <div
        className="absolute rounded-3xl bg-gradient-to-b from-[#f2418233] to-[#EBF0F933] bg-opacity-10 w-11/12 shadow-md h-5/6 p-10 cstm-flex-col gap-5
                    t:cstm-flex-row t:bg-gradient-to-r
                    l-s:gap-10"
      >
        <div
          className="p-2 w-auto bg-bgColor rounded-2xl z-10 relative bg-opacity-40 backdrop-blur-sm border-bgColor cstm-flex-col h-full
                  border-2 border-opacity-30 shadow-md
                  m-l:w-full"
        >
          <Image
            src={lexileIcon}
            alt="lexile"
            className="w-full animate-float drop-shadow-md 
            m-l:w-10/12
            t:w-full
            l-s:w-10/12
            l-l:w-8/12"
            priority
          />
        </div>
        <div
          className="cstm-flex-col gap-4 text-center
                    t:text-right"
        >
          <p
            className="font-mukta font-extrabold text-prmColor2 text-2xl w-full
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-6xl
                    l-l:text-7xl"
          >
            lexile-based <br /> reading materials
          </p>
          <p
            className="font-poppins text-sm text-prmColor2
                        m-l:text-base
                        l-s:text-lg
                        l-l:text-xl"
          >
            {`A lexile is an individual's reading comprehension level. You will have materials
          based on your lexile level to provide efficient growth and effective challenges.`}
          </p>

          <Link
            href="https://lexile.com/educators/understanding-lexile-measures/"
            target="_blank"
            noreferrer="true"
            className="font-poppins text-sm text-prmColor2 cstm-flex-row gap-2 hover:underline underline-offset-2 transition-all w-full
                        m-l:text-base
                        t:justify-end
                        l-s:text-lg
                        l-l:text-xl"
          >
            more about lexile <BsArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingFill1;
