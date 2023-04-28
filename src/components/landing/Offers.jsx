import React from "react";
import OfferCards from "./Landing Components/Cards";
import brainTeaser from "../../../public/BrainTeaser.svg";
import penAndPaper from "../../../public/PenAndPaper.svg";
import readingCharacter from "../../../public/ReadingCharacter.svg";

const Offers = () => {
  return (
    <section
      className="min-h-screen w-full bg-gradient-to-b from-scndColor to-prmColor p-5 font-poppins text-prmColor text-center cstm-flex-col gap-5 justify-start overflow-x-hidden
                t:p-10 t:gap-10
                l-s:justify-center"
    >
      <p
        className=" font-extrabold text-2xl
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Boost your <br className="t:hidden" /> lexile level !
      </p>

      <div
        className="cstm-flex-col gap-5 w-full
                  l-s:gap-10"
      >
        <OfferCards to="#" label="read stories" image={readingCharacter} imagePos="right-0" />
        <OfferCards
          to="#"
          label="take tests"
          image={penAndPaper}
          imagePos="left-0"
          flexOrientation="flex-row-reverse"
        />
        <OfferCards to="#" label="brain teasers" image={brainTeaser} imagePos="right-0" />
      </div>
    </section>
  );
};

export default Offers;
