import React from "react";
import Image from "next/image";
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
        className="absolute scale-[7] top-auto bottom-auto
                  t:scale-[3] t:left-36 t:top-[26rem]
                  l-s:scale-100 l-s:left-auto l-s:top-auto l-s:rotate-0"
      />
    </section>
  );
};

export default LandingFill2;
