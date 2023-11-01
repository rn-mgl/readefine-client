import React from "react";

const AdminPageHeader = (props) => {
  const fontColor = props.mainHeader?.includes("Edit") ? "text-cyan-700" : "text-prmColor";
  return (
    <div className="text-center  w-full ">
      <p className="font-medium text-xs">{props.subHeader} | admin</p>
      <p className={`font-bold text-lg  ${fontColor}`}>{props.mainHeader}</p>
    </div>
  );
};

export default AdminPageHeader;
