import { useSession } from "next-auth/react";
import axios from "axios";
import React from "react";

export default function useAdminActivities() {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();
  const user = session?.user;

  const createAdminActivity = React.useCallback(
    async (resourceType, resourceName, activityTypeFilter) => {
      try {
        const { data } = await axios.post(
          `${url}/admin_activities`,
          { resourceType, resourceName, activityTypeFilter },
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
