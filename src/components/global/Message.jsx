import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Message = (props) => {
  const messageInfo = props.message.msg
    ? props.message.msg
    : "We have a problem in our end. Please try again later.";

  setTimeout(() => {
    props.setMessage({ msg: "", active: false });
  }, 5000);

  return (
    <div
      className={`${
        props.message.active ? "translate-y-0" : "-translate-y-[100rem]"
      } fixed top-3 w-11/12 rounded-md border-[1px] border-scndColor bg-cyan-100 text-black font-medium shadow-md z-50 p-5 text-sm text-center transition-all animate-slideDown duration-100 t:w-6/12 
        l-s:w-5/12 l-s:bottom-5 l-s:top-auto l-s:right-5 text-clip
        l-l:w-4/12`}
    >
      {messageInfo}

      <button
        onClick={() => props.setMessage({ msg: "", active: false })}
        className="cstm-bg-hover absolute top-3 right-0"
      >
        <IoCloseCircleOutline className="text-prmColor scale-125 " />
      </button>
    </div>
  );
};

export default Message;
