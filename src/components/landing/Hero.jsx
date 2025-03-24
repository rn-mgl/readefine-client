"use client";

import { useLoading } from "@/hooks/useLoading";
import book from "@/public/landing/hero/landing book.png";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiLoader } from "react-icons/bi";

const Hero = () => {
  const [userCount, setUserCount] = React.useState(0);
  const { loading, setLoadingState } = useLoading(false);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getUserCount = React.useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${url}/warmer`);
      if (data) {
        setUserCount(data?.user_count);
        setLoadingState(false);
      }
    } catch (error) {
      setLoadingState(false);
      console.log(error);
    }
  }, [url, setLoadingState]);

  React.useEffect(() => {
    getUserCount();
  }, [getUserCount]);

  return (
    <section
      className="min-h-screen w-full bg-prmColor p-4 text-center cstm-flex-col  
              text-accntColor gap-4 relative
                m-m:px-5
                t:px-10
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
        <span className="font-bold">Readefine</span>: Enhancing Elementary
        Students&apos; Comprehension Skills in English Language Through
        Gamification
      </p>
      <div
        className="w-full cstm-flex-col gap-4
                  t:cstm-flex-row"
      >
        <Link
          href="/signup"
          className="text-center  text-sm font-extrabold text-prmColor 
                    bg-scndColor w-full rounded-md p-2 px-4 t:w-fit t:px-10"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="text-center  text-sm font-extrabold text-prmColor 
                    bg-accntColor w-full rounded-md p-2 px-4 t:w-fit t:px-10"
        >
          Log In
        </Link>
      </div>

      <Image
        src={book}
        alt="book"
        priority
        draggable={false}
        className="animate-float drop-shadow-lg w-9/12
                  t:w-72"
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
