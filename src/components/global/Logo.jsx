import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/archives"
      className="select-none  font-extrabold absolute z-10 my-5 left-2/4 -translate-x-2/4 text-lg
                m-l:text-xl
                t:text-2xl"
    >
      Readefine
    </Link>
  );
};

export default Logo;
