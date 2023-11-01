import React from "react";

const HeadPageHeader = (props) => {
  const fontColor = props.mainHeader?.includes("Edit") ? "text-scndColor" : "text-prmColor";
  return (
    <div className="text-center  w-full ">
      <p className="font-medium text-xs">{props.subHeader} | head</p>
      <p className={`font-bold text-lg ${fontColor}`}>{props.mainHeader}</p>
    </div>
  );
};

export default HeadPageHeader;
