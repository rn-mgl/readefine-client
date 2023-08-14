import React from "react";
import landing from "../../../public/landing/hero/landing book.png";
import Image from "next/image";
import { TbLoader } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 backdrop-blur-md z-[100] cstm-flex-col gap-2">
      <Image priority className="w-24 drop-shadow-xl animate-bounce" src={landing} alt="loading" />
      <div className="animate-[spin_2s_linear_infinite]">
        <TbLoader className="text-prmColor scale-150 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
