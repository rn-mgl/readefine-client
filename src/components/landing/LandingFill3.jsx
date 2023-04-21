import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const LandingFill3 = () => {
  return (
    <section
      className="relative min-h-[80vh]  w-full overflow-x-hidden bg-bgColor cstm-flex-col p-5
                l-s:p-10
                l-l:px-20"
    >
      <div
        className="absolute rounded-3xl bg-gradient-to-b from-[#f2e85e33] to-[#EBF0F933] bg-opacity-10 w-10/12 shadow-md h-5/6 p-6 cstm-flex-col gap-5
                    text-center
                    t:bg-gradient-to-r t:w-11/12
                    l-s:gap-10 l-s:p-10"
      >
        <p
          className="font-mukta font-extrabold text-prmColor2 text-2xl w-full
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
        >
          reading, gamified
        </p>
        <p
          className="font-poppins text-sm text-prmColor2
                        m-l:text-base
                        l-l:text-lg"
        >
          Readefine incorporates a range of instructional methods, including phonics, sight words,
          vocabulary development, and comprehension strategies, all of which are integrated into an
          interactive and fun web-based platform. By providing personalized reading materials and
          utilizing a scientifically-based framework, the program can help students develop critical
          reading skills and become lifelong learners.
        </p>

        <Link
          href="#"
          className="w-full p-2 text-bgColor font-mukta font-extrabold rounded-md bg-prmColor2 border-2 cstm-flex-row gap-2 transition-all
                  hover:shadow-md 
                    t:w-fit t:px-10
                    m-l:text-base
                    l-s:text-lg"
        >
          Start Now <BsArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default LandingFill3;
