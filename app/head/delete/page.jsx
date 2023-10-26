"use client";

import { useGlobalContext } from "@/base/context";
import Message from "@/src/components/global/Message";
import ActivityLog from "@/src/head/actions/ActivityLog";
import HeadPageHeader from "@/src/head/global/PageHeader";
import { useMessage } from "@/src/hooks/useMessage";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const Delete = () => {
  const [activities, setActivities] = React.useState([]);
  const [typeFilter, setTypeFilter] = React.useState("");

  const { message, setMessageStatus } = useMessage();

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const getAdminDeleteActivites = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_admin_activities`, {
        headers: { Authorization: user?.token },
        params: { resourceType: typeFilter, activityType: "R" },
      });
      if (data) {
        setActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [typeFilter, user?.token, url, setMessageStatus]);

  const mappedActivities = activities.map((activity, index) => {
    return (
      <ActivityLog icon={<AiFillDelete className="scale-125" />} key={index} activity={activity} action="deleted" />
    );
  });

  React.useEffect(() => {
    if (user) {
      getAdminDeleteActivites();
    }
  }, [user, getAdminDeleteActivites]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-4 justify-start">
      <HeadPageHeader mainHeader="Delete" subHeader="Readefine" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div
        className="w-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3
                  cstm-w-limit p-4 rounded-2xl bg-white gap-4 
                  overflow-y-auto cstm-scrollbar"
      >
        {mappedActivities}
      </div>
    </div>
  );
};

export default Delete;
