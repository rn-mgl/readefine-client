"use client";
import React from "react";
import Link from "next/link";
import AdminLink from "../nav/AdminLink";

import { BiMenu, BiTask, BiLogOut } from "react-icons/bi";
import { BsPenFill, BsPatchQuestionFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { HiUser } from "react-icons/hi2";
import { GiAchievement } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const AdminNav = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  const user = session?.user?.name;

  const path = usePathname();

  const logOut = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const toggleOpenNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="cstm-bg-hover absolute top-4 left-4">
        <BiMenu className="scale-150 cursor-pointer l-s:hidden" onClick={toggleOpenNav} />
      </div>

      <div
        className={`${
          isOpen ? "m-s:translate-x-0" : "m-s:-translate-x-full"
        } bg-white w-full h-screen text-center fixed p-5 transition-all cstm-flex-col justify-start gap-5 z-50
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[30%]
            l-l:w-[20%]`}
      >
        <div className="cstm-bg-hover absolute top-4 left-4 l-s:hidden">
          <IoCloseSharp className="scale-150 cursor-pointer" onClick={toggleOpenNav} />
        </div>

        <Link
          href="/controller"
          className="select-none font-poppins font-extrabold text-lg whitespace-nowrap text-prmColor
                m-l:text-xl"
        >
          Readefine <span className="font-extralight text-black"> | admin</span>
        </Link>

        <div className="cstm-separator" />

        <AdminLink
          to="/controller"
          icon={<AiFillHome />}
          label="Dashboard"
          isActive={path === "/controller"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/users"
          icon={<HiUser />}
          label="Users"
          isActive={path.includes("/controller/users")}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/stories"
          icon={<AiFillBook />}
          label="Stories"
          isActive={path.includes("/controller/stories")}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/tests"
          icon={<BsPenFill />}
          label="Tests"
          isActive={path.includes("/controller/tests")}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/rewards"
          icon={<GiAchievement />}
          label="Rewards"
          isActive={path.includes("/controller/rewards")}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/achievements"
          icon={<BiTask />}
          label="Achievements & Tasks"
          isActive={path.includes("/controller/achievements")}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/minigames"
          icon={<BsPatchQuestionFill />}
          label="Minigames"
          isActive={path.includes("/controller/minigames")}
          toggleOpenNav={toggleOpenNav}
        />

        <div className="cstm-flex-row gap-2 w-full justify-start mt-auto">
          <div className="w-10 h-10 rounded-full bg-prmColor bg-opacity-30" />
          <Link href={`/a`} className="cstm-flex-col font-poppins items-start">
            <p className="text-xs">Welcome</p>
            <p className="font-bold text-prmColor">
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

export default AdminNav;
