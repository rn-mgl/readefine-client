import React from "react";
import readLaptop from "../../../public/landing/offers/read stories laptop.png";
import readLaptop2 from "../../../public/landing/offers/read stories laptop 2.png";
import testLaptop from "../../../public/landing/offers/test laptop.png";
import testLaptop2 from "../../../public/landing/offers/test laptop 2.png";
import dangleLaptop from "../../../public/landing/offers/dangle laptop.png";
import decipherLaptop from "../../../public/landing/offers/decipher laptop.png";
import riddleLaptop from "../../../public/landing/offers/riddle laptop.png";
import Image from "next/image";

const Offers = () => {
  return (
    <section
      className="min-h-screen w-full bg-prmColor p-5 font-poppins text-white text-center cstm-flex-col gap-5 justify-start overflow-x-hidden
                t:p-10 t:gap-10
                l-s:justify-center"
    >
      <p
        className=" font-extrabold text-2xl text-scndColor
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Boost your <br className="t:hidden" /> Lexile Level !
      </p>

      <div className="cstm-flex-col gap-5 w-full l-s:w-10/12">
        {/*read stories*/}
        <div className="cstm-flex-col w-full gap-2 text-left relative z-10 l-s:w-6/12 l-s:mr-auto">
          <p className="text-white font-bold text-2xl w-full ">Read Stories</p>
          <p
            className="text-sm text-neutral-200
                      m-l:text-base
                      t:text-lg
                      l-s:text-xl"
          >
            Readefine offers reading materials that fits your Lexile Level to ensure that you can
            understand the stories you read while maintaining challenge for efficient growth.
          </p>
        </div>

        <div
          className="p-5 cstm-flex-col gap-5 overflow-hidden w-full cstm-flex-col border-[1px] backdrop-blur-md relative z-10 t:p-10
            border-white bg-white bg-opacity-50 rounded-lg bg-gradient-to-br from-[#ffffff00] via-[#ffffff9f] to-[#ffffff00]"
        >
          <Image
            src={readLaptop}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
          <Image
            src={readLaptop2}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
        </div>
      </div>

      {/*take tests*/}
      <div className="cstm-flex-col w-full gap-2 text-right relative z-10 l-s:w-10/12">
        <div className="cstm-flex-col w-full gap-2 text-right l-s:w-6/12 l-s:ml-auto">
          <p className="text-white font-bold text-2xl w-full ">Take Tests</p>
          <p
            className="text-sm text-neutral-200 relative z-10
                      m-l:text-base
                      t:text-lg
                      l-s:text-xl"
          >
            Readefine provides multiple-choice tests in relation to each stories that you will read
            to test out if you have understood the reading materials and to increase your Lexile
            Level for increasing challenges.
          </p>
        </div>

        <div
          className="p-5 cstm-flex-col gap-5 overflow-hidden w-full cstm-flex-col border-[1px]  backdrop-blur-md t:p-10
            border-white bg-white bg-opacity-50 rounded-lg bg-gradient-to-br from-[#ffffff00] via-[#ffffff9f] to-[#ffffff00]"
        >
          <Image
            src={testLaptop}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
          <Image
            src={testLaptop2}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
        </div>
      </div>

      {/*play minigames*/}
      <div className="cstm-flex-col w-full gap-2 relative z-10 l-s:w-10/12">
        <div className="cstm-flex-col w-full gap-2 text-left l-s:w-6/12 l-s:mr-auto">
          <p className="text-white font-bold text-2xl w-full">Play Minigames</p>
          <p
            className="text-sm opacity-80 w-full
                      m-l:text-base
                      t:text-lg
                      l-s:text-xl"
          >
            Readefine offers minigames focused on words that you can play to warm-up your senses.
          </p>
        </div>

        <div
          className="p-5 cstm-flex-col gap-5 overflow-hidden w-full cstm-flex-col border-[1px]  backdrop-blur-md t:p-10
            border-white bg-white bg-opacity-50 rounded-lg bg-gradient-to-br from-[#ffffff00] via-[#ffffff9f] to-[#ffffff00]"
        >
          <Image
            src={dangleLaptop}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
          <Image
            src={decipherLaptop}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
          <Image
            src={riddleLaptop}
            alt="read laptop"
            className="rounded-md hover:scale-105 transition-all duration-300"
            width={1920}
          />
        </div>
      </div>
    </section>
  );
};

export default Offers;
