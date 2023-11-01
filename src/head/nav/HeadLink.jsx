"use client";
import React from "react";
import Link from "next/link";

const AdminLink = (props) => {
  return (
    <Link
      href={props.to}
      onClick={props.toggleOpenNav}
      className={`${
        props.isActive
          ? "text-accntColor font-medium bg-prmColor hover:text-black hover:text-opacity-50"
          : "text-black opacity-50 font-light"
      } 
      ${props.navIsOpen ? "w-full justify-start" : "l-s:w-10 l-s:h-9 l-s:justify-center"}
      cstm-flex-row gap-4 w-full justify-start text-left p-2 whitespace-nowrap text-sm 
        hover:bg-black hover:bg-opacity-10 rounded-md transition-all t:text-base`}
    >
      <span>{props.icon}</span>
      <span className={`${props.navIsOpen ? "l-s:flex" : "l-s:hidden"}`}>{props.label}</span>
    </Link>
  );
};

export default AdminLink;
