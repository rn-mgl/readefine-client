import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const FilePreview = (props) => {
  return (
    <div className="w-full cstm-flex-col rounded-2xl gap-2">
      <Image src={props.src} alt="preview" className="w-full rounded-2xl" priority width={100} height={100} />
      <div className="w-full cstm-flex-row gap-4">
        {props.purpose && props.name ? (
          <p className="text-sm overflow-x-auto w-full mr-auto p-2 whitespace-nowrap scrollbar-none">
            <span className="font-bold">{props.purpose}</span> | {props.name}
          </p>
        ) : null}

        <button type="button" onClick={props.clearFiles} className="cstm-bg-hover ">
          <IoClose className="text-prmColor text-xl cursor-pointer " />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;
