import React from "react";
import { IoClose } from "react-icons/io5";

const ChangePassword = (props) => {
  return (
    <div className="fixed w-full h-full cstm-flex-col backdrop-blur-md z-20 justify-start p-5 top-0 left-0 gap-5 cstm-scrollbar overflow-y-auto">
      <button onClick={props.handleCanChangePassword} className="cstm-bg-hover ml-auto">
        <IoClose className="scale-150 text-prmColor" />
      </button>
    </div>
  );
};

export default ChangePassword;
