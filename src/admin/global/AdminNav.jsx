"use client";
import React from "react";
import Link from "next/link";
import AdminLink from "../nav/AdminLink";
import Loading from "../../components/global/Loading";
import axios from "axios";

import { BiMenu, BiTask, BiLogOut } from "react-icons/bi";
import { BsPenFill, BsPatchQuestionFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { HiUser } from "react-icons/hi2";
import { GiAchievement } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

const AdminNav = () => {
  const [adminData, setAdminData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const path = usePathname();

  const logOut = () => {
    setLoading(true);
    signOut({ callbackUrl: "/", redirect: true });
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
  }, [url, user, setAdminData]);

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
      <div className="cstm-bg-hover absolute top-4 left-4 z-10">
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
          <Link
            href={`/controller/overview/${user?.admin_id}`}
            onClick={toggleOpenNav}
            className="cstm-flex-row hover:bg-neutral-100 p-2 w-full rounded-md font-poppins justify-start gap-2"
          >
            <div
              style={{ backgroundImage: adminData?.image ? `url(${adminData?.image})` : null }}
              className="w-12 h-12 rounded-full bg-prmColor bg-opacity-30 bg-cover bg-center"
            />
            <div className="cstm-flex-col items-start">
              <p className="text-xs">Welcome</p>
              <p className="font-bold text-prmColor truncate">
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

export default AdminNav;
