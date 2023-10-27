import React from "react";
import Link from "next/link";

const ClientLink = (props) => {
  return (
    <Link
      href={props.to}
      onClick={props.toggleOpenNav}
      className={`${
        props.isActive
          ? "text-accntColor bg-gradient-to-br from-prmColor  to-scndColor font-medium shadow-solid shadow-indigo-900"
          : "text-black opacity-50 font-light"
      } cstm-flex-row gap-4 w-full justify-start p-2   hover:bg-black hover:bg-opacity-10 rounded-md transition-all`}
    >
      {props.icon} {props.label}
    </Link>
  );
};

export default ClientLink;
