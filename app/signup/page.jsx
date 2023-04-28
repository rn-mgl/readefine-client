import React from "react";
import Image from "next/image";
import intersectAM from "../../public/IntersectAM.svg";
import intersectAT from "../../public/IntersectAT.svg";
import intersectAL from "../../public/IntersectAL.svg";
import InputComp from "../../src/components/input/InputComp";
import ButtonComp from "../../src/components/input/ButtonComp";
import { CiLock, CiUser, CiMail } from "react-icons/ci";

const Signup = () => {
  return (
    <div className="w-full h-screen bg-prmColor p-5 cstm-flex-col font-poppins overflow-hidden">
      <p
        className=" font-extrabold text-2xl text-accntColor
                    m-l:text-3xl
                    t:text-4xl
                    l-s:text-5xl
                    l-l:text-6xl"
      >
        Sign Up
      </p>
      <br />
      <div
        className="w-full rounded-md bg-scndColor bg-opacity-20 backdrop-blur-md border-[1px] border-scndColor border-opacity-40 p-5 cstm-flex-col gap-5 relative z-10 shadow-lg
                  t:w-8/12
                  l-s:w-6/12
                  l-l:w-4/12"
      >
        <InputComp id="name" placeholder="Name" type="text" spellCheck={false} icon={<CiUser />} />
        <InputComp
          id="surname"
          type="text"
          placeholder="Surname"
          spellCheck={false}
          icon={<CiUser />}
        />
        <InputComp
          id="email"
          placeholder="E Mail"
          type="email"
          spellCheck={false}
          icon={<CiMail />}
        />
        <InputComp
          id="username"
          placeholder="Username"
          type="text"
          spellCheck={false}
          icon={<CiUser />}
        />
        <InputComp
          id="password"
          placeholder="Password"
          type="password"
          spellCheck={false}
          icon={<CiLock />}
        />
        <ButtonComp
          type="submit"
          fontColor="text-prmColor"
          bgColor="bg-scndColor"
          label="Sign Up"
          css="w-full"
        />
      </div>

      <Image
        src={intersectAM}
        alt="intersect"
        className="w-full bottom-0 left-0 absolute t:hidden"
        priority
      />
      <Image
        src={intersectAT}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute t:block l-s:hidden"
        priority
      />
      <Image
        src={intersectAL}
        alt="intersect"
        className="hidden w-full bottom-0 left-0 absolute l-s:block"
        priority
      />
    </div>
  );
};

export default Signup;
