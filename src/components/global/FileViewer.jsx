import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

const FileViewer = (props) => {
  return props.src ? (
    <Image
      src={props.src}
      alt="viewer"
      width={350}
      height={350}
      className={`${props.width} rounded-2xl`}
      draggable={false}
      loading="lazy"
    />
  ) : null;
};

export default FileViewer;
