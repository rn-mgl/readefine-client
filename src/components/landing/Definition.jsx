import React from "react";
import bookLadder from "../../../public/BookLadder.svg";
import intersectSM from "../../../public/IntersectSM.svg";
import intersectST from "../../../public/IntersectST.svg";
import intersectSL from "../../../public/IntersectSL.svg";
import Image from "next/image";

const Definition = () => {
  return (
    <section
      className="h-screen p-5 font-poppins relative text-center text-prmColor bg-accntColor cstm-flex-col justify-start overflow-hidden
                t:p-10"
      id="definition"
    >
      <div className="cstm-flex-col">
        <Image
          src={intersectSM}
          alt="intersect"
          className="w-full top-0 left-0 absolute t:hidden"
          priority
        />
        <Image
          src={intersectST}
          alt="intersect"
          className="hidden w-full top-0 left-0 absolute t:block l-s:hidden"
          priority
        />
        <Image
          src={intersectSL}
          alt="intersect"
          className="hidden w-full top-0 left-0 absolute l-s:block"
          priority
        />

        <p
          className="relative z-10 font-extrabold text-2xl
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
        >
          lexile-based <br /> reading materials
        </p>
        <br />
        <p
          className="relative z-10 text-sm 
                  m-l:text-base
                  t:text-lg t:w-10/12
                  l-s:text-xl l-s:w-10/12
                  l-l:w-7/12"
        >
          A Lexile is an individual's reading comprehension level. You will have materials based on
          your Lexile level to provide efficient growth and sufficient challenges.
        </p>
      </div>

      <div
        className="w-10/12 absolute bottom-10 left-2/4 -translate-x-2/4 cstm-flex-col
                  t:w-80"
      >
        <Image src={bookLadder} alt="lexile" className="animate-float drop-shadow-lg" priority />
      </div>
    </section>
  );
};

export default Definition;
