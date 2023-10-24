import React from "react";
import axios from "axios";
import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";

export const useUserLexile = (setMessageStatus) => {
  const [userLexile, setUserLexile] = React.useState(-1);

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  // get user lexile
  const getUserLexile = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/user_lexile`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUserLexile(data.lexile);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getUserLexile();
    }
  }, [user, getUserLexile]);

  return {
    userLexile,
  };
};
