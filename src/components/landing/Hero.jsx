"use client";
import React from "react";
import ButtonLink from "../link/ButtonLink";
import book from "../../../public/landing/hero/landing book.png";
import Image from "next/image";
import axios from "axios";
import { useGlobalContext } from "@/src/context";
import { BiLoader } from "react-icons/bi";

const Hero = () => {
  const [userCount, setUserCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const { url } = useGlobalContext();

  const getUserCount = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/warmer`);
      if (data) {
        setUserCount(data?.user_count);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [url]);

  React.useEffect(() => {
    getUserCount();
  }, [getUserCount]);

  return (
    <section
      className="min-h-screen w-full bg-prmColor p-5 text-center cstm-flex-col font-poppins 
              text-accntColor gap-4 pt-20 relative
                m-m:px-5
                t:px-10 t:pt-20
                l-s:gap-4"
      id="hero"
    >
      <p
        className=" font-extrabold text-2xl text-scndColor
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Level Up Your Reading Journey!
      </p>
      <p
        className="text-sm text-center
                  m-l:text-base
                  t:text-lg
                  l-s:text-xl l-s:w-10/12
                  l-l:w-7/12"
      >
        <span className="font-bold">Readefine</span> : Gamification Approach to Engage and Enhance
        Elementary Student&apos;s Reading Comprehension Skills in the English Language
      </p>
      <div
        className="w-full cstm-flex-col gap-4
                  t:cstm-flex-row"
      >
        <ButtonLink
          to="login"
          fontColor="text-prmColor"
          bgColor="bg-accntColor"
          label="Log In"
          css="w-full rounded-md t:w-32"
        />
        <ButtonLink
          to="signup"
          fontColor="text-prmColor"
          bgColor="bg-scndColor"
          label="Sign Up"
          css="w-full rounded-md t:w-32"
        />
      </div>

      <Image
        src={book}
        alt="book"
        priority
        className="animate-float drop-shadow-lg w-9/12
                  t:w-96"
      />

      <p className="text-xs font-light opacity-50 absolute bottom-5 cstm-flex-row gap-1">
        Readefine Users:{" "}
        <span className="font-bold">
          {loading ? <BiLoader className="animate-spin" /> : userCount}
        </span>
      </p>
    </section>
  );
};

export default Hero;
