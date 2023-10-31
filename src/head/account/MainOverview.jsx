import React from "react";
import avatar from "@/public/profile/Avatar.svg";
import Image from "next/image";

import { localizeDate } from "@/functions/localDate";
import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const MainAccount = (props) => {
  return (
    <div className="cstm-flex-col justify-start gap-4 w-full t:cstm-flex-row">
      <div className="bg-white w-full rounded-2xl h-72 p-4 cstm-flex-col justify-start relative t:w-6/12 t:mr-auto t:h-72">
        <div className="relative w-full h-[40%] rounded-2xl cstm-flex-col bg-gradient-to-r from-prmColor to-scndColor">
          <div
            style={{
              backgroundImage: props.headData.image ? `url(${props.headData.image})` : null,
            }}
            className="w-20 h-20 bg-indigo-100 rounded-full absolute translate-y-10 
                    bottom-0 border-4 border-white bg-cover bg-center"
          >
            {!props.headData?.image ? <Image src={avatar} alt="avatar" className="w-full" width={320} /> : null}
          </div>
        </div>

        <div className="cstm-flex-col gap-1 mt-auto">
          <div className="font-bold text-prmColor cstm-flex-row gap-2 text-sm">
            <p>
              {props.headData.name} {props.headData.surname}
            </p>
            <BsDot className="text-black" />
            <p className="font-medium text-black">{props.headData.username}</p>
          </div>

          <p className="font-light text-xs"> {props.headData.email}</p>
        </div>

        <button onClick={props.handleCanEditMain} className="cstm-bg-hover absolute right-2 bottom-2">
          <AiFillEdit className="text-prmColor" />
        </button>

        <button
          onClick={props.handleCanChangePassword}
          className="mt-auto hover:shadow-none text-sm text-prmColor hover:underline underline-offset-2"
        >
          change password
        </button>
      </div>

      <div className="bg-white h-48 w-full p-2 rounded-2xl cstm-flex-col gap-2 t:w-6/12 t:h-72">
        <p className="text-black font-light text-sm">Date Joined</p>
        <p className="font-bold text-lg text-prmColor">{localizeDate(props.headData?.date_joined)}</p>
      </div>
    </div>
  );
};

export default MainAccount;
