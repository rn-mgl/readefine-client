import React from "react";

const ClientPageHeader = (props) => {
  return (
    <div className="text-center relative z-10">
      <p className="font-medium text-xs text-black">{props.subHeader}</p>
      <p className={`font-bold text-lg text-prmColor`}>{props.mainHeader}</p>
    </div>
  );
};

export default ClientPageHeader;
