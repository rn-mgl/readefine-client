import React from "react";
import { localizeDate } from "../../functions/localDate";
import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const MainOverview = (props) => {
  return (
    <div className="cstm-flex-col justify-start gap-5 w-full t:cstm-flex-row">
      <div className="bg-white w-full rounded-2xl h-60 p-5 cstm-flex-col justify-start relative t:w-6/12 t:mr-auto t:h-72">
        <div className="relative w-full h-[40%] rounded-2xl cstm-flex-col bg-gradient-to-r from-prmColor to-scndColor">
          <div
            style={{
              backgroundImage: props.adminData.image ? `url(${props.adminData.image})` : null,
            }}
            className="w-20 h-20 bg-prmColor rounded-full absolute translate-y-10 bottom-0 border-4 border-white bg-cover bg-center"
          />
        </div>

        <div className="cstm-flex-col gap-1 my-auto">
          <div className="font-bold text-prmColor cstm-flex-row gap-2">
            <p>
              {props.adminData.name} {props.adminData.surname}
            </p>
            <BsDot className="text-black" />
            <p className="font-medium text-black">{props.adminData.username}</p>
          </div>

          <p className="font-light text-sm"> {props.adminData.email}</p>
        </div>

        <button
          onClick={props.handleCanEditMain}
          className="cstm-bg-hover absolute right-2 bottom-2"
        >
          <AiFillEdit className="text-prmColor" />
        </button>
      </div>

      <div className="bg-white h-48 w-full p-2 rounded-2xl cstm-flex-col gap-2 t:w-6/12 t:h-72">
        <p className="text-black font-light text-sm">Date Joined</p>
        <p className="font-bold text-lg text-prmColor">
          {localizeDate(props.adminData?.date_joined)}
        </p>
      </div>
    </div>
  );
};

export default MainOverview;
