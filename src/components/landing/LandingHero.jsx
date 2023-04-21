import React from "react";
import bgLanding from "../../../public/Landing BG.svg";
import bookLanding from "../../../public/readefine landing book.png";
import Image from "next/image";
import Link from "next/link";

const LandingHero = () => {
  return (
    <section
      className="relative min-h-screen h-auto w-full cstm-flex-col bg-bgColor p-2 overflow-x-hidden  gap-10
                 t:cstm-flex-row t:min-h-[80vh]
                 l-s:min-h-screen"
    >
      <div
        className="cstm-flex-col gap-4 p-2 z-10 relative h-2/4 m-l:w-10/12 t:h-auto t:w-6/12 t:items-start
                  l-s:w-7/12
                  l-l:w-6/12"
      >
        <p
          className="font-mukta font-extrabold text-bgColor text-3xl
                    m-l:text-4xl
                    l-s:text-6xl
                    l-l:text-7xl"
        >
          Reading made fun.
        </p>
        <p
          className="font-poppins text-bgColor text-center text-sm
                    m-l:text-base
                    t:text-left
                    l-s:text-lg
                    l-l:text-xl"
        >
          An approach to enhance the reading comprehension of elementary students in the
          contemporary world.
        </p>

        <div
          className="w-full cstm-flex-col gap-2 m-l:text-base
                    l-s:cstm-flex-row l-s:w-8/12"
        >
          <Link
            href="/login"
            className="w-full p-2 text-prmColor2 font-mukta font-extrabold rounded-md bg-scndColor2 border-2 border-scndColor2 text-center
                    m-l:text-base
                    l-s:text-lg"
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            className="w-full p-2 font-mukta font-extrabold rounded-md border-2 border-bgColor text-bgColor backdrop-blur-sm bg-bgColor bg-opacity-30 text-center
                    m-l:text-base
                    l-s:text-lg"
          >
            Log In
          </Link>
        </div>
      </div>

      <div
        className="p-2 w-auto bg-bgColor rounded-2xl z-10 relative bg-opacity-40 backdrop-blur-sm border-bgColor cstm-flex-col
                  border-2 border-opacity-30 shadow-md
                  m-l:w-10/12
                  t:w-5/12
                  l-s:w-4/12
                  l-l:w-3/12"
      >
        <Image
          src={bookLanding}
          alt="landing"
          className="drop-shadow-md relative z-20 w-full animate-float"
          priority
        />
      </div>

      <Image
        src={bgLanding}
        alt="bg"
        className="absolute w-full top-60 -left-10 z-0 scale-[4] 
                    m-m:top-40
                    m-l:top-24
                    t:scale-[1.5] t:-top-2 t:left-20
                    l-s:scale-[1.2] l-s:top-0 l-s:left-9
                    l-l:-top-52 l-l:left-32"
        priority
      />
    </section>
  );
};

export default LandingHero;
