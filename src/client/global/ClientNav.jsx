"use client";
import React from "react";
import Link from "next/link";
import ClientLink from "../nav/ClientLink";
import Loading from "../../components/global/Loading";

import { BiMenu, BiTask, BiLogOut } from "react-icons/bi";
import { BsPenFill, BsPatchQuestionFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { TbGoGame } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import axios from "axios";

const ClientNav = () => {
  const [userData, setUserData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const logOut = () => {
    setLoading(true);
    signOut({ callbackUrl: "/", redirect: true });
  };

  const toggleOpenNav = () => {
    setIsOpen((prev) => !prev);
  };

  const path = usePathname();

  const getUserData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user/${user?.userId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, setUserData]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="absolute cstm-bg-hover z-10 top-4 left-4 l-s:hidden">
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
          isActive={path.includes("/archives/minigames")}
          icon={<TbGoGame />}
          label="Minigames"
        />

        <div className="cstm-flex-row gap-2 w-full justify-start mt-auto">
          <Link
            href={`/archives/reader/${user?.userId}`}
            onClick={toggleOpenNav}
            className="font-poppins text-left hover:bg-neutral-100 p-2 rounded-md justify-start transition-all cstm-flex-row gap-2 w-full"
          >
            <div
              style={{ backgroundImage: userData?.image ? `url(${userData?.image})` : null }}
              className="w-10 h-10 rounded-full  bg-gradient-to-br from-prmColor  to-scndColor bg-opacity-30 bg-cover bg-center"
            />
            <div className="cstm-flex-col items-start">
              <p className="text-xs">Welcome</p>
              <p className="font-bold text-prmColor whitespace-nowrap truncate">
                {user?.name} {user?.surname}
              </p>
            </div>
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
