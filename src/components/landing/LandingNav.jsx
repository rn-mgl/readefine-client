"use client";
import React from "react";
import logo from "../../../public/landing/hero/landing book.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineQuestionCircle, AiOutlineTrophy } from "react-icons/ai";
import { TbDiscountCheck } from "react-icons/tb";

const LandingNav = () => {
  const [activeLink, setActiveLink] = React.useState("#");
  const [showNav, setShowNav] = React.useState(true);
  const [resetNav, setResetNav] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  React.useEffect(() => {
    const show = () => {
      const currScrollPos = window.scrollY;
      const shouldShow = currScrollPos < prevScrollPos || currScrollPos < 50;

      setPrevScrollPos(currScrollPos);
      setShowNav(shouldShow);
      setResetNav(currScrollPos < 50);
    };

    window.addEventListener("scroll", show);

    return () => {
      window.removeEventListener("scroll", show);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 left-0 w-full p-5 z-50 backdrop-blur-md flex 
                flex-row justify-center items-center gap-5 t:gap-10 l-s:gap-16
                text-prmColor transition-all bg-accntColor
                ${showNav ? "translate-y-0" : "-translate-y-full"} 
                  ${resetNav ? "shadow-none" : "shadow-md"}`}
    >
      <Link href="#hero" className="w-fit mr-auto" onClick={() => handleActiveLink("#hero")}>
        <Image src={logo} alt="logo" width={50} height={50} className="w-10 drop-shadow-md shadow-white" />
      </Link>

      <Link
        href="#about"
        onClick={() => handleActiveLink("#about")}
        className={`w-fit text-xs l-s:text-sm transition-all flex flex-row gap-1 items-center justify-center
                hover:text-scndColor hover:underline underline-offset-2
                ${activeLink === "#about" ? "text-cyan-600 underline" : "text-inherit"}`}
      >
        <div>
          <AiOutlineQuestionCircle />
        </div>

        <p>About</p>
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
  );
};

export default LandingNav;
