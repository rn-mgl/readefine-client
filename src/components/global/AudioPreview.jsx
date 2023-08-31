import React from "react";
import { IoClose } from "react-icons/io5";

const AudioPreview = (props) => {
  return (
    <div className="w-full cstm-flex-col rounded-2xl p-2 gap-2 t:w-80">
      <audio controls className="w-full">
        <source src={props.src} />
      </audio>
      <div className="w-full cstm-flex-row gap-5">
        {props.purpose && props.name ? (
          <p className="text-sm overflow-x-auto w-full truncate mr-auto p-2 whitespace-nowrap scrollbar-none">
            <span className="font-bold">{props.purpose}</span> | {props.name}
          </p>
        ) : null}

        <button type="button" onClick={props.clearAudio} className="cstm-bg-hover ">
          <IoClose className="text-prmColor scale-125 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default AudioPreview;