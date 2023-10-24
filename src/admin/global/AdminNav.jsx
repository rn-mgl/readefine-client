"use client";
import React from "react";
import Link from "next/link";
import AdminLink from "../nav/AdminLink";
import Loading from "@/components/global/Loading";
import axios from "axios";
import avatar from "@/public/profile/Avatar.svg";
import Image from "next/image";

import { BiMenu, BiTask, BiLogOut } from "react-icons/bi";
import { BsPenFill, BsPatchQuestionFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { HiUser } from "react-icons/hi2";
import { GiAchievement } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useGlobalContext } from "@/base/context";
import { cipher } from "@/functions/security";
import { useLoading } from "@/hooks/useLoading";

const AdminNav = () => {
  const [adminData, setAdminData] = React.useState({});
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
        `${url}/admin_session`,
        { type: "out", adminId: user?.adminId },
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

  const getAdminData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/${user?.adminId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user?.token, user?.adminId, setAdminData]);

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);

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
          href="/controller"
          className="select-none  font-extrabold text-lg whitespace-nowrap text-prmColor
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
          label="Accounts"
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

        <div className="cstm-flex-col gap-2 w-full justify-start mt-auto">
          <Link
            href={`/controller/overview/${cipher(user?.adminId)}`}
            onClick={toggleOpenNav}
            className="text-left hover:bg-neutral-100 p-2 rounded-md 
            justify-start transition-all cstm-flex-row gap-2 w-full"
          >
            <div
              style={{ backgroundImage: adminData?.image ? `url(${adminData?.image})` : null }}
              className="w-12 min-w-[3rem] h-12 min-h-[3rem] rounded-full
                      bg-indigo-100 bg-cover bg-center"
            >
              {!adminData?.image ? <Image src={avatar} alt="avatar" className="saturate-150" width={100} /> : null}
            </div>
            <div className="cstm-flex-col items-start w-full">
              <p className="text-xs">Welcome</p>
              <p className="font-bold text-prmColor whitespace-nowrap w-44 truncate">
                {adminData?.name} {adminData?.surname}
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

export default AdminNav;
