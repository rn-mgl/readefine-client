import ButtonLink from "../link/ButtonLink";
import book from "../../../public/landing book.png";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="min-h-screen w-full bg-prmColor  px-5 text-center cstm-flex-col font-poppins text-accntColor gap-4 pt-20
                m-m:px-5
                t:px-10
                l-s:gap-4"
    >
      <p
        className=" font-extrabold text-2xl
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Reading made fun.
      </p>
      <p
        className="text-sm
                  m-l:text-base
                  t:text-lg
                  l-s:text-xl l-s:w-10/12
                  l-l:w-7/12"
      >
        Readefine, an approach to enhance the reading comprehension skills of elementary students in
        the contemporary world.
      </p>
      <div
        className="w-full cstm-flex-col gap-4
                  l-s:cstm-flex-row"
      >
        <ButtonLink to="login" fontColor="text-prmColor" bgColor="bg-scndColor" label="Log In" />
        <ButtonLink to="login" fontColor="text-prmColor" bgColor="bg-accntColor" label="Sign Up" />
      </div>

      <Image
        src={book}
        alt="book"
        priority
        className="animate-float drop-shadow-lg w-10/12
                  t:w-96"
      />
    </section>
  );
};

export default Hero;
