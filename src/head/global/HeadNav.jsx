"use client";
import Loading from "@/components/global/Loading";
import logo from "@/public/landing/hero/landing book.png";
import avatar from "@/public/profile/Avatar.svg";
import HeadLink from "@/src/head/nav/HeadLink";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useLoading } from "@/hooks/useLoading";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AiFillBook, AiFillDelete, AiFillHome } from "react-icons/ai";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { BsPenFill } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";
import { MdUpdate } from "react-icons/md";

const HeadNav = ({ children }) => {
  const [headData, setHeadData] = React.useState({});
  const [navIsOpen, setNavIsOpen] = React.useState(false);

  const { loading, setLoadingState } = useLoading(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const path = usePathname();

  const logOut = async () => {
    setLoadingState(true);

    try {
      const { data } = await axios.post(
        `${url}/head_session`,
        { type: "out", headId: user?.headId },
        { headers: { Authorization: user?.token } }
      );

      if (data) {
        signOut({ callbackUrl: "/", redirect: true });
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

  const getHeadData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head/${user?.headId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setHeadData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user?.token, user?.headId, setHeadData]);

  React.useEffect(() => {
    if (user) {
      getHeadData();
    }
  }, [user, getHeadData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-row justify-start ">
      <button onClick={() => toggleOpenNav("button")} className="cstm-bg-hover absolute top-4 left-4 z-10">
        <BiMenu className="text-xl cursor-pointer l-s:hidden" />
      </button>

      <div
        className={`${
          navIsOpen ? "m-s:translate-x-0 l-s:w-[30%] l-l:w-[20%]" : "m-s:-translate-x-full l-s:w-[8%] l-l:w-[5%]"
        } bg-white w-10/12 h-full text-center fixed p-4 transition-all 
            cstm-flex-col justify-start gap-4 z-50 t:w-[50%]
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[25%] l-s:sticky l-s:h-screen`}
      >
        <div className={`${navIsOpen ? "justify-between" : "justify-center"} w-full flex flex-row `}>
          <button onClick={() => toggleOpenNav("button")} className="cursor-pointer">
            <BiMenu className="text-xl " />
          </button>

          <Link
            href="/head"
            onClick={() => toggleOpenNav("link")}
            className={`${navIsOpen ? "flex" : "l-s:hidden"}
                    text-prmColor select-none  font-extrabold text-lg whitespace-nowrap
                      m-l:text-xl `}
          >
            <Image src={logo} alt="logo" width={30} height={30} />
          </Link>
        </div>

        <div className="cstm-separator" />

        <HeadLink
          to="/head"
          icon={<AiFillHome />}
          label="Dashboard"
          isActive={path === "/head"}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <HeadLink
          to="/head/admin"
          icon={<HiUser />}
          label="Admins"
          isActive={path.includes("/head/admin")}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <HeadLink
          to="/head/create"
          icon={<BsPenFill />}
          label="Create Activities"
          isActive={path.includes("/head/create")}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <HeadLink
          to="/head/read"
          icon={<AiFillBook />}
          label="Read Activities"
          isActive={path.includes("/head/read")}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <HeadLink
          to="/head/update"
          icon={<MdUpdate />}
          label="Update Activities"
          isActive={path.includes("/head/update")}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <HeadLink
          to="/head/delete"
          icon={<AiFillDelete />}
          label="Delete Activities"
          isActive={path.includes("/head/delete")}
          toggleOpenNav={() => toggleOpenNav("link")}
          navIsOpen={navIsOpen}
        />

        <div className="cstm-flex-col gap-2 w-full justify-start mt-auto">
          <Link
            href={`/head/account/${cipher(user?.headId)}`}
            onClick={() => toggleOpenNav("link")}
            className={`${navIsOpen ? "p-2" : "l-s:p-0 l-s:justify-center"}
                text-left hover:bg-neutral-100 rounded-md 
                justify-start transition-all cstm-flex-row gap-2 w-full`}
          >
            <div
              style={{ backgroundImage: headData?.image ? `url(${headData?.image})` : null }}
              className="w-12 min-w-[3rem] h-12 min-h-[3rem] rounded-full
                      bg-indigo-100 bg-cover bg-center"
            >
              {!headData?.image ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
            </div>
            <div className={`${navIsOpen ? "l-s:flex" : "l-s:hidden"} cstm-flex-col items-start w-full`}>
              <p className="text-xs">Welcome</p>
              <p className="font-bold text-prmColor whitespace-nowrap w-full">
                {headData?.name} {headData?.surname}
              </p>
            </div>
          </Link>

          <div className="cstm-separator" />

          <button
            className="text-left hover:bg-neutral-100 hover:shadow-none p-2 rounded-md
                justify-start transition-all cstm-flex-row gap-4 w-full overflow-x-hidden"
            onClick={logOut}
          >
            <span className={` ${navIsOpen ? "justify-start" : "l-s:w-10 l-s:h-6 l-s:justify-center"} cstm-flex-col`}>
              <BiLogOut className="opacity-50" />
            </span>
            <span className={`${navIsOpen ? "flex" : "l-s:hidden"} cstm-flex-col`}>
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

export default HeadNav;
