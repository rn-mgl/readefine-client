"use client";
import React from "react";
import Link from "next/link";

const AdminLink = (props) => {
  return (
    <Link
      href={props.to}
      onClick={props.toggleOpenNav}
      className={`${
        props.isActive ? "text-prmColor font-medium" : "text-black opacity-50 font-light"
      } cstm-flex-row gap-5 w-full justify-start text-left p-2  whitespace-nowrap text-sm hover:bg-black hover:bg-opacity-10 rounded-md transition-all
      t:text-base`}
    >
      {props.icon} {props.label}
      {props.isActive ? <div className="w-1 h-full rounded-full bg-prmColor ml-auto" /> : null}
    </Link>
  );
};

export default AdminLink;
