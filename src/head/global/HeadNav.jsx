"use client";
import Loading from "@/components/global/Loading";
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
import { GrUpdate } from "react-icons/gr";
import { HiUser } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";

const HeadNav = () => {
  const [headData, setHeadData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

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

  const toggleOpenNav = () => {
    setIsOpen((prev) => !prev);
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
    <>
      <button onClick={toggleOpenNav} className="cstm-bg-hover absolute top-4 left-4 z-10">
        <BiMenu className="scale-150 cursor-pointer l-s:hidden" />
      </button>

      <div
        className={`${
          isOpen ? "m-s:translate-x-0" : "m-s:-translate-x-full"
        } bg-white w-full h-full text-center fixed p-5 transition-all cstm-flex-col justify-start gap-5 z-50
            t:w-[50%]
            l-s:translate-x-0 l-s:left-0 l-s:top-0 l-s:w-[30%]
            l-l:w-[20%]`}
      >
        <button onClick={toggleOpenNav} className="cstm-bg-hover absolute top-4 left-4 l-s:hidden">
          <IoCloseSharp className="scale-150 cursor-pointer" />
        </button>

        <Link
          href="/head"
          className="select-none  font-extrabold text-lg whitespace-nowrap text-prmColor
                m-l:text-xl"
        >
          Readefine <span className="font-extralight text-black"> | head</span>
        </Link>

        <div className="cstm-separator" />

        <HeadLink
          to="/head"
          icon={<AiFillHome />}
          label="Dashboard"
          isActive={path === "/head"}
          toggleOpenNav={toggleOpenNav}
        />

        <HeadLink
          to="/head/administrators"
          icon={<HiUser />}
          label="Administrators"
          isActive={path.includes("/head/administrators")}
          toggleOpenNav={toggleOpenNav}
        />

        <HeadLink
          to="/head/create"
          icon={<BsPenFill />}
          label="Create Activities"
          isActive={path.includes("/head/create")}
          toggleOpenNav={toggleOpenNav}
        />

        <HeadLink
          to="/head/read"
          icon={<AiFillBook />}
          label="Read Activities"
          isActive={path.includes("/head/read")}
          toggleOpenNav={toggleOpenNav}
        />

        <HeadLink
          to="/head/update"
          icon={<GrUpdate />}
          label="Update Activities"
          isActive={path.includes("/head/update")}
          toggleOpenNav={toggleOpenNav}
        />

        <HeadLink
          to="/head/delete"
          icon={<AiFillDelete />}
          label="Delete Activities"
          isActive={path.includes("/head/delete")}
          toggleOpenNav={toggleOpenNav}
        />

        <div className="cstm-flex-col gap-2 w-full justify-start mt-auto">
          <Link
            href={`/head/data/${cipher(user?.headId)}`}
            onClick={toggleOpenNav}
            className="text-left hover:bg-neutral-100 p-2 rounded-md 
            justify-start transition-all cstm-flex-row gap-2 w-full"
          >
            <div
              style={{ backgroundImage: headData?.image ? `url(${headData?.image})` : null }}
              className="w-12 min-w-[3rem] h-12 min-h-[3rem] rounded-full
                      bg-indigo-100 bg-cover bg-center"
            >
              {!headData?.image ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
            </div>
            <div className="cstm-flex-col items-start w-full">
              <p className="text-xs">Welcome</p>
              <p className="font-bold text-prmColor whitespace-nowrap w-44 truncate">
                {headData?.name} {headData?.surname}
              </p>
            </div>
          </Link>

          <div className="cstm-separator" />

          <button
            className="text-left hover:bg-neutral-100 hover:shadow-none p-2 rounded-md
                justify-start transition-all cstm-flex-row gap-5 w-full overflow-x-hidden"
            onClick={logOut}
          >
            <BiLogOut className="opacity-50" />
            <p className="mr-auto text-sm opacity-50">Log Out</p>
          </button>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed z-40 bg-black bg-opacity-20 w-full h-full top-0 left-0 l-s:hidden`}
      />
    </>
  );
};

export default HeadNav;
