import React from "react";
import Link from "next/link";

const ClientLink = (props) => {
  return (
    <Link
      href={props.to}
      onClick={props.toggleOpenNav}
      className={`${
        props.isActive
          ? `text-accntColor bg-gradient-to-br from-prmColor  
              to-scndColor font-medium shadow-solid shadow-indigo-900`
          : "text-black opacity-50 font-light"
      }     
        ${props.navIsOpen ? "w-full justify-start" : "l-s:w-10 l-s:h-9 l-s:justify-center"}
            cstm-flex-row gap-4  p-2 hover:bg-black 
            hover:bg-opacity-10 rounded-md transition-all`}
    >
      <span>{props.icon}</span>
      <span className={`${props.navIsOpen ? "l-s:flex" : "l-s:hidden"}`}>{props.label}</span>
    </Link>
  );
};

export default ClientLink;
