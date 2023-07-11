import React from "react";
import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const MainProfile = (props) => {
  return (
    <div className="cstm-flex-col w-full gap-5 t:cstm-flex-row">
      <div className="w-full h-72 bg-white rounded-2xl p-5 shadow-solid cstm-flex-col justify-start relative t:w-6/12">
        <div className="bg-gradient-to-br from-prmColor via-sky-300 to-scndColor h-[40%] w-full rounded-2xl relative cstm-flex-col">
          <div
            style={{
              backgroundImage: props.userData?.image ? `url(${props.userData?.image})` : null,
            }}
            className="w-20 h-20 rounded-full bg-cover bg-center bg-gradient-to-br from-scndColor to-prmColor border-4 border-white absolute bottom-0 translate-y-10"
          />
        </div>
        <div className="cstm-flex-col my-auto w-fit">
          <div className="cstm-flex-row text-sm gap-2 t:text-base">
            <p className="text-prmColor font-bold ">
              {props.userData.name} {props.userData.surname}
            </p>
            <BsDot />
            <p>{props.userData?.username}</p>
          </div>

          <p className="text-xs t:text-sm">{props.userData?.email}</p>
        </div>

        <button
          onClick={props.handleCanEditMain}
          className="cstm-bg-hover absolute bottom-2 right-2"
        >
          <AiFillEdit className="text-prmColor" />
        </button>
      </div>
      <div className="cstm-flex-col gap-5 w-full t:w-6/12 t:h-72 l-l:cstm-flex-row ">
        <div className="w-full h-full  bg-white rounded-2xl p-5 shadow-solid cstm-flex-col gap-2 relative">
          <p>Grade Level</p>
          <p className="text-4xl text-prmColor font-bold">{props.userData?.grade_level}</p>

          <button
            onClick={props.handleCanEditGradeLevel}
            className="cstm-bg-hover absolute bottom-2 right-2"
          >
            <AiFillEdit className="text-prmColor" />
          </button>
        </div>

        <div className="w-full h-full bg-white rounded-2xl p-5 shadow-solid cstm-flex-col gap-2">
          <p>Lexile Level</p>
          <p className="text-4xl text-prmColor font-bold">{props.userData?.lexile}</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
