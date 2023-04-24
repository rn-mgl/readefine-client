import React from "react";
import ButtonLink from "../link/ButtonLink";

const Purpose = () => {
  return (
    <section className="min-h-screen bg-accntColor w-full font-poppins text-center cstm-flex-col text-prmColor p-5 gap-5">
      <p
        className=" font-extrabold text-2xl
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        reading, gamified
      </p>
      <p
        className="text-sm
                  m-l:text-base
                  t:text-lg
                  l-s:text-xl l-s:w-9/12
                  l-l:w-8/12"
      >
        Readefine incorporates a range of instructional methods, including phonics, sight words,
        vocabulary development, and comprehension strategies, all of which are integrated into an
        interactive and fun web-based platform. By providing personalized reading materials and
        utilizing a scientifically-based framework, the program can help students develop critical
        reading skills and become lifelong learners.
      </p>
      <ButtonLink to="#" label="Start Now" fontColor="text-scndColor" bgColor="bg-prmColor" />
    </section>
  );
};

export default Purpose;
