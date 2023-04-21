import React from "react";
import Image from "next/image";
import Link from "next/link";
import bgLanding from "../../../public/Landing BG 2.svg";
import Fill2Links from "./Landing Components/Fill2Links";

const LandingFill2 = () => {
  return (
    <section
      className="relative min-h-screen h-auto w-full bg-bgColor overflow-hidden cstm-flex-col
                l-s:h-screen"
    >
      <div className="w-full cstm-flex-col relative z-10 p-5 gap-5">
        <p
          className="font-mukta font-extrabold text-2xl text-bgColor
                    m-l:text-3xl
                    t:text-5xl
                    l-s:text-6xl
                    l-l:text-7xl"
        >
          boost your lexile level!
        </p>

        <div
          className="cstm-flex-col gap-5 w-full
                      t:w-10/12
                      l-s:cstm-flex-row l-s:w-11/12
                      l-l:w-9/12"
        >
          <Fill2Links link="#" title="read stories" />
          <Fill2Links link="#" title="take tests" />
          <Fill2Links link="#" title="minigames" />
        </div>
      </div>
      <Image
        src={bgLanding}
        alt="landing2"
        className="absolute -top-6 left-28 scale-[7] -rotate-90
                  m-m:scale-[6] m-m:left-28 m-m:-top-12
                  m-l:left-36 m-l:-top-20
                  t:scale-[3] t:left-24 t:top-0
                  l-s:scale-[2] l-s:rotate-0 l-s:-top-44 l-s:left-4
                  l-l:scale-[1.5] l-l:-top-80 l-l:left-8"
      />
    </section>
  );
};

export default LandingFill2;
