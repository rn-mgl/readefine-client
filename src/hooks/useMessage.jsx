import React from "react";

export const useMessage = (params) => {
  const [message, setMessage] = React.useState({ active: false, msg: "", type: "info" });

  const setMessageStatus = React.useCallback((active, msg, type) => {
    setMessage({ active, msg, type });
  }, []);

  return {
    message,
    setMessageStatus,
  };
};
