"use client";
import Loading from "@/components/global/Loading";
import avatar from "@/public/profile/Avatar White.svg";
import logo from "@/public/landing/hero/landing book.png";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClientLink from "../nav/ClientLink";

import { useLoading } from "@/hooks/useLoading";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AiFillBook, AiFillHome } from "react-icons/ai";
import { BiLogOut, BiMenu, BiTask } from "react-icons/bi";
import { BsPenFill } from "react-icons/bs";
import { GiAchievement } from "react-icons/gi";
import { TbGoGame } from "react-icons/tb";

const ClientNav = ({ children }) => {
  const [userData, setUserData] = React.useState({});
  const [navIsOpen, setNavIsOpen] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);

  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;

  const logOut = async () => {
    setLoadingState(true);

    try {
      const { data } = await axios.post(
        `${url}/session`,
        { type: "out", userId: user?.userId },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        await signOut({ callbackUrl: "/", redirect: true });
      }
    } catch (error) {
      setLoadingState(false);
      console.log(error);
    }
  };

  const toggleOpenNav = (using) => {
    setNavIsOpen((prev) => {
      if (using === "button") {
        return !prev;
      } else if (using === "link") {
        // will not close if on laptop view if nav is not closed
        if (window.innerWidth >= 1024) {
          return prev && true;
        } else {
          return false;
        }
      }

      return !prev;
    });
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
  }, [url, user?.token, user?.userId, setUserData]);

  React.useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user, getUserData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-row justify-start ">
      <button
        onClick={() => toggleOpenNav("button")}
        className="absolute z-20 top-5 left-5 cursor-pointer l-s:hidden"
      >
        <BiMenu className="text-xl " />
      </button>

      <div
        className={`${
          navIsOpen
            ? "m-s:translate-x-0 l-s:w-[30%] l-l:w-[20%]"
            : "m-s:-translate-x-full l-s:w-[8%] l-l:w-[5%]"
        } bg-white w-10/12 h-full text-center fixed p-4 transition-all 
            cstm-flex-col justify-start gap-4 z-50 t:w-[50%]
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[25%] l-s:sticky l-s:h-screen`}
      >
        <div
          className={`${
            navIsOpen ? "justify-between" : "justify-center"
          } w-full flex flex-row `}
        >
          <button
            onClick={() => toggleOpenNav("button")}
            className="cursor-pointer"
          >
            <BiMenu className="text-xl " />
          </button>

          <Link
            href="/archives"
            onClick={() => toggleOpenNav("link")}
            className={`${navIsOpen ? "flex" : "l-s:hidden"}
                    text-prmColor select-none  font-extrabold text-lg whitespace-nowrap
                      m-l:text-xl `}
          >
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
        </div>

        <div className="cstm-separator" />

        <ClientLink
          to="/archives"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path === "/archives"}
          icon={<AiFillHome />}
          label="Home"
          navIsOpen={navIsOpen}
        />

        <ClientLink
          to="/archives/stories"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path.includes("/archives/stories")}
          icon={<AiFillBook />}
          label="Stories"
          navIsOpen={navIsOpen}
        />

        <ClientLink
          to="/archives/tests"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path.includes("/archives/tests")}
          icon={<BsPenFill />}
          label="Tests"
          navIsOpen={navIsOpen}
        />

        <ClientLink
          to="/archives/rewards"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path.includes("/archives/rewards")}
          icon={<GiAchievement />}
          label="Rewards"
          navIsOpen={navIsOpen}
        />

        <ClientLink
          to="/archives/achievements"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path.includes("/archives/achievements")}
          icon={<BiTask />}
          label="Achievements"
          navIsOpen={navIsOpen}
        />

        <ClientLink
          to="/archives/minigames"
          toggleOpenNav={() => toggleOpenNav("link")}
          isActive={path.includes("/archives/minigames")}
          icon={<TbGoGame />}
          label="Minigames"
          navIsOpen={navIsOpen}
        />

        <div className="cstm-flex-col gap-2 w-full justify-start mt-auto">
          <Link
            href={`/archives/reader/${user?.userId}`}
            onClick={() => toggleOpenNav("link")}
            className={`${navIsOpen ? "p-2" : "l-s:p-0 l-s:justify-center"}
                text-left hover:bg-neutral-100 rounded-md 
                justify-start transition-all cstm-flex-row gap-2 w-full`}
          >
            <div
              style={{
                backgroundImage: userData?.image
                  ? `url(${userData?.image})`
                  : null,
              }}
              className="w-12 min-w-[3rem] h-12 min-h-[3rem] rounded-full  
                    bg-gradient-to-br from-prmColor to-scndColor bg-cover bg-center"
            >
              {!userData?.image ? (
                <Image src={avatar} alt="avatar" width={100} />
              ) : null}
            </div>
            <div
              className={`${
                navIsOpen ? "l-s:flex" : "l-s:hidden"
              } cstm-flex-col items-start w-full`}
            >
              <p className="text-sm font-semibold">{userData?.lexile}L</p>
              <p className="font-bold text-prmColor whitespace-nowrap w-44 truncate">
                {userData?.name} {userData?.surname}
              </p>
            </div>
          </Link>

          <div className="cstm-separator" />

          <button
            className="text-left hover:bg-neutral-100 hover:shadow-none p-2 rounded-md 
                justify-start transition-all cstm-flex-row gap-4 w-full overflow-x-hidden"
            onClick={logOut}
          >
            <span
              className={` ${
                navIsOpen
                  ? "justify-start"
                  : "l-s:w-10 l-s:h-6 l-s:justify-center"
              } cstm-flex-col`}
            >
              <BiLogOut className="opacity-50" />
            </span>
            <span
              className={`${navIsOpen ? "flex" : "l-s:hidden"} cstm-flex-col`}
            >
              <p className="mr-auto text-sm opacity-50">Log Out</p>
            </span>
          </button>
        </div>
      </div>

      <div
        className="w-full flex flex-col overflow-y-auto relative
                  justify-start cstm-scrollbar-2 bg-accntColor"
      >
        {children}
      </div>

      <div
        className={`${
          navIsOpen ? "block" : "hidden"
        } fixed z-40 bg-black bg-opacity-20 w-full h-full top-0 left-0 l-s:hidden`}
      />
    </div>
  );
};

export default ClientNav;
