import React from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const UserMainData = ({ userData }) => {
  return (
    <div className="cstm-flex-col gap-4 w-full t:cstm-flex-row">
      {/* user data */}
      <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full">
        <div className="cstm-flex-row gap-4 w-full justify-start">
          {/* user image */}
          <div
            style={{ backgroundImage: userData.image ? `url("${userData.image}")` : null }}
            className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full bg-prmColor bg-opacity-10 bg-cover bg-center"
          />

          <div className="cstm-flex-col items-start overflow-x-auto scrollbar-none">
            {/* user name and surname */}
            <p className="capitalize font-bold text-black text-base whitespace-nowrap ">
              {userData.name} {userData.surname}
            </p>
            {/* user email */}
            <p className="font-light text-xs">{userData.email}</p>
          </div>

          {/* send email button */}
          <Link className="cstm-bg-hover ml-auto" href={`mailto:${userData.email}`}>
            <AiOutlineMail className=" scale-125 text-prmColor" />
          </Link>
        </div>
      </div>

      {/* user lexile level*/}
      <div className="cstm-flex-col bg-white rounded-2xl p-5 w-full t:w-4/12">
        <p className="font-bold text-prmColor text-xl">{userData?.lexile}</p>

        <p className="text-sm">Lexile Level</p>
      </div>
    </div>
  );
};

export default UserMainData;
