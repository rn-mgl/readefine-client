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
      <BiMenu
        className="scale-150 cursor-pointer absolute top-6 left-6
                  l-s:hidden"
        onClick={toggleOpenNav}
      />

      <div
        className={`${
          isOpen ? "m-s:translate-x-0" : "m-s:-translate-x-full"
        } bg-white w-full h-screen text-center fixed p-5 transition-all cstm-flex-col justify-start gap-5 z-50
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[30%]
            l-l:w-[20%]`}
      >
        <IoCloseSharp
          className="scale-150 cursor-pointer absolute top-6 left-6
                    l-s:hidden"
          onClick={toggleOpenNav}
        />
        <Link
          href="/controller"
          className="select-none font-poppins font-extrabold text-lg whitespace-nowrap text-prmColor
                m-l:text-xl
                t:text-2xl"
        >
          Readefine <span className="font-light text-black"> | admin</span>
        </Link>

        <div className="cstm-separator" />

        <AdminLink
          to="/controller"
          icon={<AiFillHome className="scale-125" />}
          label="Dashboard"
          isActive={path === "/controller"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/users"
          icon={<HiUser className="scale-125" />}
          label="Users"
          isActive={path === "/controller/users"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/stories"
          icon={<AiFillBook className="scale-125" />}
          label="Stories"
          isActive={path === "/controller/stories"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/tests"
          icon={<BsPenFill className="scale-125" />}
          label="Tests"
          isActive={path === "/controller/tests"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/rewards"
          icon={<GiAchievement className="scale-125" />}
          label="Rewards"
          isActive={path === "/controller/rewards"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/achievements"
          icon={<BiTask className="scale-125" />}
          label="Achievements & Tasks"
          isActive={path === "/controller/achievements"}
          toggleOpenNav={toggleOpenNav}
        />

        <AdminLink
          to="/controller/riddles"
          icon={<BsPatchQuestionFill className="scale-125" />}
          label="Riddles"
          isActive={path === "/controller/riddles"}
          toggleOpenNav={toggleOpenNav}
        />

        <div className="cstm-flex-row gap-2 w-full justify-start mt-auto">
          <div className="w-10 h-10 rounded-full bg-prmColor bg-opacity-30" />
          <div className="cstm-flex-col font-poppins items-start">
            <p className="text-xs">Welcome</p>
            <p className="font-bold text-prmColor">
              {user?.name} {user?.surname}
            </p>
          </div>
          <div className="ml-auto cstm-bg-hover">
            <div onClick={logOut}>
              <BiLogOut className="scale-125" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
