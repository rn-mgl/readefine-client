import { useGlobalContext } from "@/base/context";
import { useSession } from "next-auth/react";
import axios from "axios";
import React from "react";

export default function useAdminActivities() {
  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const createAdminActivity = React.useCallback(
    async (resourceType, resourceName, activityType) => {
      try {
        const { data } = await axios.post(
          `${url}/admin_activities`,
          { resourceType, resourceName, activityType },
          { headers: { Authorization: user?.token } }
        );

        if (data) {
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [url, user?.token]
  );

  return {
    createAdminActivity,
  };
}
