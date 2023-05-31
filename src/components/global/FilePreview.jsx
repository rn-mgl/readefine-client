import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const FilePreview = (props) => {
  return (
    <div className="w-full cstm-flex-col rounded-2xl p-2 gap-2 t:w-80">
      <Image
        src={props.src}
        alt="preview"
        className="w-fit rounded-2xl overflow-clip"
        width={300}
        height={300}
      />
      <div className="w-full cstm-flex-row gap-5">
        {props.purpose && props.name ? (
          <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none">
            <span className="font-bold">{props.purpose}</span> | {props.name}
          </p>
        ) : null}

        <div className="hover:bg-black hover:bg-opacity-10 p-2 rounded-full ">
          <IoClose className="text-prmColor scale-125 cursor-pointer " onClick={props.clearFiles} />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
