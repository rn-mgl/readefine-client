import React from "react";
import { IoClose } from "react-icons/io5";
import audioFile from "@/public/music/AudioFile.svg";
import Image from "next/image";

const AudioPreview = (props) => {
  return (
    <div className="w-full h-full cstm-flex-col p-4 gap-2 rounded-2xl">
      <div className=" w-full h-full cstm-flex-col gap-4">
        <div className="w-full h-full bg-prmColor bg-opacity-10 rounded-2xl cstm-flex-col">
          <Image src={audioFile} alt="audio" width={100} height={100} />
        </div>
        <audio controls className="w-full bg-white">
          <source src={props.src} />
        </audio>
      </div>

      <div className="w-full cstm-flex-row gap-4">
        <p className="text-sm overflow-x-auto w-full truncate mr-auto p-2 whitespace-nowrap scrollbar-none">
          {props.purpose ? <span className="font-bold">{props.purpose}</span> : null}{" "}
          {props.name ? `| ${props.name}` : null}
        </p>

        <button type="button" onClick={props.clearAudio} className="cstm-bg-hover ">
          <IoClose className="text-prmColor scale-125 cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default AudioPreview;
