import Link from "next/link";
import React from "react";

const LogoAdmin = () => {
  return (
    <Link
      href="/controller"
      className="select-none  font-extrabold absolute z-10 my-5 left-2/4 -translate-x-2/4 text-lg whitespace-nowrap
                m-l:text-xl
                t:text-2xl"
    >
      Readefine <span className="font-light"> | admin</span>
    </Link>
  );
};

export default LogoAdmin;
