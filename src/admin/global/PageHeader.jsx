import React from "react";

const AdminPageHeader = (props) => {
  return (
    <div
      className="text-center font-poppins w-full
                  l-s:w-[70%] l-s:ml-auto
                  l-l:w-[80%]"
    >
      <p
        className="font-medium text-xs
                  t:text-sm"
      >
        {props.subHeader}
      </p>
      <p
        className="font-bold text-xl text-prmColor
                  t:text-2xl"
      >
        {props.mainHeader}
      </p>
    </div>
  );
};

export default AdminPageHeader;
