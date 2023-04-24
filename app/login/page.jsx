import React from "react";
import Image from "next/image";
import intersectM from "../../public/IntersectM.svg";
import intersectT from "../../public/IntersectT.svg";
import intersectL from "../../public/IntersectL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";

const Login = () => {
  return (
    <div className="w-full h-screen bg-accntColor p-5 cstm-flex-col font-poppins overflow-hidden">
      <p
        className=" font-extrabold text-2xl text-prmColor
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Log In
      </p>
      <br />
      <div
        className="w-full rounded-md bg-prmColor bg-opacity-20 backdrop-blur-sm border-[1px] border-prmColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
      >
        <InputComp id="username" label="Username" type="text" />
        <InputComp id="password" label="Password" type="password" />
        <ButtonComp
          type="submit"
          fontColor="text-accntColor"
          bgColor="bg-prmColor"
          label="Log In"
          css="w-full"
        />
      </div>

      <Image
        src={intersectM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute rotate-180 t:hidden"
        priority
      />
      <Image
        src={intersectT}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute t:block l-s:hidden"
        priority
      />
      <Image
        src={intersectL}
        alt="intersect"
        className="hidden w-full bottom-0 rotate-180 left-0 absolute l-s:block"
        priority
      />
    </div>
  );
};

export default Login;
