import Link from "next/link";
import React from "react";
import logo from "@/public/landing/hero/landing book.png";
import Image from "next/image";

const LandingLogoAdmin = () => {
  return (
    <Link
      href="/"
      className="select-none font-poppins font-extrabold absolute z-10 my-5 left-2/4 -translate-x-2/4 text-lg whitespace-nowrap
                flex flex-row gap-2 items-center justify-center
                m-l:text-xl
                t:text-2xl"
    >
      <Image src={logo} alt="logo" width={50} height={50} className="w-10 drop-shadow-md shadow-white animate-float" />
      Readefine <span className="font-light"> | admin</span>
    </Link>
  );
};

export default LandingLogoAdmin;
