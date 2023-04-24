import React from "react";
import OfferCards from "./Landing Components/Cards";

const Offers = () => {
  return (
    <section
      className="min-h-screen w-full bg-gradient-to-b from-scndColor to-prmColor p-5 font-poppins text-prmColor text-center cstm-flex-col gap-5 justify-start overflow-x-hidden
                t:p-10
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
                  l-s:cstm-flex-row"
      >
        <OfferCards to="#" label="read stories" />
        <OfferCards to="#" label="take tests" />
        <OfferCards to="#" label="brain teasers" />
      </div>
    </section>
  );
};

export default Offers;
