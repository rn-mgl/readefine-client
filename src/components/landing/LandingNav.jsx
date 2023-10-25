"use client";
import React from "react";
import logo from "@/public/landing/hero/landing book.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineQuestionCircle, AiOutlineTrophy } from "react-icons/ai";
import { TbDiscountCheck } from "react-icons/tb";

const LandingNav = () => {
  const [activeLink, setActiveLink] = React.useState("#");
  const [resetNav, setResetNav] = React.useState(true);

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  React.useEffect(() => {
    const show = () => {
      const currScrollPos = window.scrollY;

      setResetNav(currScrollPos < 50);
    };

    window.addEventListener("scroll", show);

    return () => {
      window.removeEventListener("scroll", show);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full transition-all
                  ${
                    resetNav
                      ? "shadow-none bg-transparent text-white"
                      : "bg-accntColor bg-opacity-80 shadow-md text-prmColor backdrop-blur-md"
                  }`}
    >
      {/* <div className="bg-accntColor w-full p-2 text-prmColor text-sm text-center">
        <span className="font-bold">notice:</span> 30 minutes maintenance update on October 15, 2023 at 6:00 AM
        Philippine Time
      </div> */}

      <div className="w-full flex flex-row justify-center items-center p-5 gap-4 l-s:p-7 t:gap-10 l-s:gap-16 transition-all">
        <Link href="#hero" className="w-fit mr-auto" onClick={() => handleActiveLink("#hero")}>
          <Image src={logo} alt="logo" width={50} height={50} className="w-10 drop-shadow-md shadow-white" />
        </Link>

        <Link
          href="#about"
          onClick={() => handleActiveLink("#about")}
          className={`w-fit text-xs l-s:text-sm transition-all flex flex-row gap-1 items-center justify-center
                hover:text-cyan-600 hover:underline underline-offset-2
                ${activeLink === "#about" ? "text-cyan-600 underline" : "text-inherit"}`}
        >
          <div>
            <AiOutlineQuestionCircle />
          </div>

          <p>Lexile</p>
        </Link>

        <Link
          href="#offers"
          onClick={() => handleActiveLink("#offers")}
          className={`w-fit text-xs l-s:text-sm transition-all flex flex-row gap-1 items-center justify-center
                hover:text-cyan-600 hover:underline underline-offset-2
                ${activeLink === "#offers" ? "text-cyan-600 underline" : "text-inherit"}`}
        >
          <div>
            <TbDiscountCheck />
          </div>
          Offers
        </Link>

        <Link
          href="#join"
          onClick={() => handleActiveLink("#join")}
          className={`w-fit text-xs l-s:text-sm transition-all flex flex-row gap-1 items-center justify-center
        hover:text-cyan-600 hover:underline underline-offset-2
        ${activeLink === "#join" ? "text-cyan-600 underline" : "text-inherit"}`}
        >
          <div>
            <AiOutlineTrophy />
          </div>
          Join
        </Link>
      </div>
    </div>
  );
};

export default LandingNav;
