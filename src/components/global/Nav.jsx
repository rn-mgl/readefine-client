import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <Link
      href="/"
      className="select-none font-poppins font-extrabold absolute z-10 p-5 left-2/4 -translate-x-2/4 text-accntColor text-lg
                m-l:text-xl
                t:text-2xl"
    >
      Readefine
    </Link>
  );
};

export default Nav;
