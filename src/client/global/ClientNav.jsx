"use client";
import React from "react";
import Link from "next/link";
import ClientLink from "../nav/ClientLink";

import { BiMenu, BiTask, BiLogOut } from "react-icons/bi";
import { BsPenFill, BsPatchQuestionFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { TbGoGame } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const ClientNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();

  const user = session?.user?.name;

  const logOut = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const toggleOpenNav = () => {
    setIsOpen((prev) => !prev);
  };

  const path = usePathname();

  return (
    <>
      <div className="absolute cstm-bg-hover top-4 left-4 l-s:hidden">
        <BiMenu className="scale-150 cursor-pointer" onClick={toggleOpenNav} />
      </div>

      <div
        className={`${
          isOpen ? "m-s:translate-x-0" : "m-s:-translate-x-full"
        } bg-white w-full h-screen text-center fixed p-5 transition-all cstm-flex-col justify-start gap-5 z-50
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[30%]
            l-l:w-[20%]`}
      >
        <div className="cstm-bg-hover absolute top-4 left-4 l-s:hidden">
          <IoCloseSharp
            className="scale-150 cursor-pointer text-prmColor"
            onClick={toggleOpenNav}
          />
        </div>

        <Link
          href="/archives"
          className="text-prmColor select-none font-poppins font-extrabold text-lg whitespace-nowrap
                m-l:text-xl"
        >
          Readefine
        </Link>

        <div className="cstm-separator" />

        <ClientLink
          to="/archives"
          toggleOpenNav={toggleOpenNav}
          isActive={path === "/archives"}
          icon={<AiFillHome />}
          label="Home"
        />

        <ClientLink
          to="/archives/stories"
          toggleOpenNav={toggleOpenNav}
          isActive={path.includes("/archives/stories")}
          icon={<AiFillBook />}
          label="Stories"
        />

        <ClientLink
          to="/archives/tests"
          toggleOpenNav={toggleOpenNav}
          isActive={path.includes("/archives/tests")}
          icon={<BsPenFill />}
          label="Tests"
        />

        <ClientLink
          to="/archives/rewards"
          toggleOpenNav={toggleOpenNav}
          isActive={path.includes("/archives/rewards")}
          icon={<GiAchievement />}
          label="Rewards"
        />

        <ClientLink
          to="/archives/achievements"
          toggleOpenNav={toggleOpenNav}
          isActive={path.includes("/archives/achievements")}
          icon={<BiTask />}
          label="Achievements"
        />

        <ClientLink
          to="/archives/minigames"
          toggleOpenNav={toggleOpenNav}
          isActive={path.includes("/archives/riddles")}
          icon={<TbGoGame />}
          label="Minigames"
        />

        <div className="cstm-flex-row gap-2 w-full justify-start mt-auto">
          <div className="w-10 h-10 rounded-full  bg-gradient-to-br from-prmColor  to-scndColor bg-opacity-30" />
          <Link href={`/archives/reader/${user?.userId}`} className="font-poppins text-left">
            <p className="text-xs">Welcome</p>
            <p className="font-bold text-prmColor whitespace-nowrap truncate">
              {user?.name} {user?.surname}
            </p>
          </Link>
          <div className="ml-auto cstm-bg-hover">
            <div onClick={logOut}>
              <BiLogOut />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientNav;
