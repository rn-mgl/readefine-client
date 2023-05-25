import Image from "next/image";
import React from "react";

const FileViewer = (props) => {
  return (
    <Image
      src={props.src}
      alt="viewer"
      width={300}
      height={300}
      className={`${props.width} rounded-2xl`}
      draggable={false}
    />
  );
};

export default FileViewer;
