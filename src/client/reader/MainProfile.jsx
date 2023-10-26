import React from "react";
import avatar from "@/public/profile/Avatar White.svg";
import Image from "next/image";

import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const MainProfile = (props) => {
  return (
    <div className="cstm-flex-col w-full gap-2 t:cstm-flex-row">
      <div className="w-full h-72 bg-white rounded-2xl p-4 shadow-solid cstm-flex-col justify-start relative t:w-6/12">
        <div className="bg-gradient-to-br from-prmColor via-sky-300 to-scndColor h-[40%] w-full rounded-2xl relative cstm-flex-col">
          <div
            style={{
              backgroundImage: props.userData?.image ? `url(${props.userData?.image})` : null,
            }}
            className="w-20 h-20 rounded-full bg-cover bg-center bg-gradient-to-br 
                      from-scndColor to-prmColor border-4 border-white absolute bottom-0 translate-y-10"
          >
            {!props.userData?.image ? (
              <Image src={avatar} alt="avatar" className="w-full saturate-150" width={320} />
            ) : null}
          </div>
        </div>

        <div className="cstm-flex-col mt-auto w-full">
          <div className="cstm-flex-row text-sm gap-2 t:text-base w-full ">
            <p className="text-prmColor font-bold overflow-x-auto whitespace-nowrap">
              {props.userData.name} {props.userData.surname}
            </p>

            <BsDot />

            <p>{props.userData?.username}</p>
          </div>

          <p className="text-xs t:text-sm">{props.userData?.email}</p>
        </div>

        <button
          onClick={props.handleCanChangePassword}
          className="mt-auto hover:shadow-none text-sm text-prmColor hover:underline underline-offset-2"
        >
          change password
        </button>

        <button onClick={props.handleCanEditMain} className="cstm-bg-hover absolute bottom-2 right-2">
          <AiFillEdit className="text-prmColor" />
        </button>
      </div>

      <div className="cstm-flex-col gap-2 w-full t:w-6/12 t:h-72 l-l:cstm-flex-row justify-start">
        <div className="w-full h-full  bg-white rounded-2xl p-4 shadow-solid cstm-flex-col gap-2 relative">
          <p>Grade Level</p>

          <p className="text-4xl text-prmColor font-bold">{props.userData?.grade_level}</p>

          <button onClick={props.handleCanEditGradeLevel} className="cstm-bg-hover absolute bottom-2 right-2">
            <AiFillEdit className="text-prmColor" />
          </button>
        </div>

        <div className="w-full h-full bg-white rounded-2xl p-4 shadow-solid cstm-flex-col gap-2">
          <p>Lexile Level</p>

          <p className="text-4xl text-prmColor font-bold">{props.userData?.lexile}L</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
