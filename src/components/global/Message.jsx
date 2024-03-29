import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Message = (props) => {
  const { message, setMessageStatus } = props;

  const COLOR_TYPE = {
    warning: "border-yellow-400 bg-yellow-100 text-yellow-900",
    info: "border-scndColor bg-cyan-100 text-cyan-900",
    error: "border-red-400 bg-red-100 text-red-900",
  };

  const messageInfo = message.msg ? message.msg : "We have a problem in our end. Please try again later.";

  React.useEffect(() => {
    if (message.active) {
      // Create a variable to store the timeout ID
      let timeoutId;

      // Set the timeout and store the ID
      timeoutId = setTimeout(() => {
        setMessageStatus(false, "", "info");
      }, 5000);

      // Cleanup function to clear the timeout when the component unmounts or re-renders
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [message.active, setMessageStatus]); // Run this effect whenever props.message.active changes

  return (
    <div
      className={`${
        message.active ? "translate-y-0" : "-translate-y-[100rem]"
      } fixed top-3 w-11/12 rounded-md border-[1px] font-medium shadow-md z-50
        p-4 px-10 text-sm text-center transition-all animate-slideDown duration-100 
        t:w-6/12 
        l-s:w-5/12 l-s:bottom-5 l-s:top-auto l-s:right-5 ${COLOR_TYPE[message.type]}
        l-l:w-4/12`}
    >
      {messageInfo}

      <button onClick={() => setMessageStatus(false, "", "info")} className="cstm-bg-hover absolute top-0 right-0">
        <IoCloseCircleOutline className="text-inherit text-xl " />
      </button>
    </div>
  );
};

export default Message;
