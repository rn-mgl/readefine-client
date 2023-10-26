"use client";

import { useGlobalContext } from "@/base/context";
import Message from "@/src/components/global/Message";
import AdminActivitiesFilter from "@/src/head/activities/AdminActivitiesFilter";
import ActivityLog from "@/src/head/activities/ActivityLog";
import HeadPageHeader from "@/src/head/global/PageHeader";
import useAdminActivityFilters from "@/src/hooks/useAdminActivityFilters";
import { useMessage } from "@/src/hooks/useMessage";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillRead } from "react-icons/ai";

const Read = () => {
  const [activities, setActivities] = React.useState([]);

  const {
    searchFilter,
    sortFilter,
    resourceTypeFilter,
    dateRangeFilter,
    handleSearchFilter,
    handleSortFilter,
    handleDateRangeFilter,
    handleResourceTypeFilter,
  } = useAdminActivityFilters();
  const { message, setMessageStatus } = useMessage();
  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const getAdminReadActivites = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_admin_activities`, {
        headers: { Authorization: user?.token },
        params: {
          searchFilter,
          sortFilter,
          resourceTypeFilter,
          dateRangeFilter,
          activityType: "R",
        },
      });
      if (data) {
        setActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [user?.token, url, searchFilter, sortFilter, resourceTypeFilter, dateRangeFilter, setMessageStatus]);

  const mappedActivities = activities.map((activity, index) => {
    return <ActivityLog icon={<AiFillRead className="scale-125" />} key={index} activity={activity} action="read" />;
  });

  React.useEffect(() => {
    if (user) {
      getAdminReadActivites();
    }
  }, [user, getAdminReadActivites]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-4 justify-start">
      <HeadPageHeader mainHeader="Read" subHeader="Readefine" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <AdminActivitiesFilter
        searchFilter={searchFilter}
        sortFilter={sortFilter}
        typeFilter={resourceTypeFilter}
        dateRangeFilter={dateRangeFilter}
        handleSearchFilter={handleSearchFilter}
        handleSortFilter={handleSortFilter}
        handleDateRangeFilter={handleDateRangeFilter}
        handleTypeFilter={handleResourceTypeFilter}
      />

      <div
        className="w-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3
                  cstm-w-limit p-4 rounded-2xl bg-white gap-4 
                  overflow-y-auto cstm-scrollbar-2"
      >
        {mappedActivities}
      </div>
    </div>
  );
};

export default Read;
