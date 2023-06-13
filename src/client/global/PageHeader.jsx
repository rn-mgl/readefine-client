import React from "react";

const ClientPageHeader = (props) => {
  return (
    <div className="text-center font-poppins w-full cstm-w-limit ">
      <p
        className="font-medium text-xs text-black
                  t:text-sm"
      >
        {props.subHeader}
      </p>
      <p className={`font-bold text-xl t:text-2xl text-prmColor`}>{props.mainHeader}</p>
    </div>
  );
};

export default ClientPageHeader;
