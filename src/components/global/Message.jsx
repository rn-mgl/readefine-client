import React from "react";

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
      } fixed top-3 w-11/12 rounded-md bg-black text-scndColor shadow-md z-50 p-2 text-sm text-center transition-all animate-slideDown duration-100 t:w-6/12 l-s:w-5/12 l-l:w-4/12`}
    >
      {messageInfo}
    </div>
  );
};

export default Message;
