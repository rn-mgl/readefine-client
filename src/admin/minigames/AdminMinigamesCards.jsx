import Image from "next/image";
import React from "react";
import Link from "next/link";

const AdminMinigamesCards = (props) => {
  return (
    <div
      className="bg-white p-5 rounded-2xl cstm-flex-col gap-4 group hover:shadow-md
                  t:w-80
                  l-l:w-[22rem]"
    >
      <Link href={props.to} className="w-full overflow-hidden rounded-2xl">
        <Image
          src={props.image}
          alt="temp"
          className="rounded-2xl group-hover:scale-110 transition-all duration-300 w-full"
        />
      </Link>

      <p
        className="font-bold text-black
                      t:text-base"
      >
        {props.label}
      </p>
      <Link
        href={props.to}
        className="text-center font-poppins text-sm font-normal bg-prmColor text-accntColor rounded-full w-28 p-2 hover:shadow-md "
      >
        Visit
      </Link>
    </div>
  );
};

export default AdminMinigamesCards;
