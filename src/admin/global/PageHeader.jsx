import React from "react";

const AdminPageHeader = (props) => {
  const fontColor = props.mainHeader?.includes("Edit") ? "text-scndColor" : "text-prmColor";
  return (
    <div className="text-center font-poppins w-full cstm-w-limit">
      <p
        className="font-medium text-xs
                  t:text-sm"
      >
        {props.subHeader}
      </p>
      <p
        className={`font-bold text-xl ${fontColor}
                  t:text-2xl`}
      >
        {props.mainHeader}
      </p>
    </div>
  );
};

export default AdminPageHeader;
