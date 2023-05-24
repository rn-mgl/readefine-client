import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const FilePreview = (props) => {
  return (
    <div
      className="w-full cstm-flex-col rounded-2xl shadow-md p-2 gap-2
                t:w-72 t:mr-auto t:mt-auto"
    >
      <Image
        src={props.src}
        alt="preview"
        className="w-fit rounded-2xl overflow-clip"
        width={100}
        height={100}
      />
      <div className="w-full cstm-flex-row gap-5">
        <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none">
          <span className="font-bold">{props.purpose}</span> | {props.name}
        </p>
        <div className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full ">
          <IoClose className="text-prmColor scale-125 cursor-pointer " onClick={props.clearFiles} />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
