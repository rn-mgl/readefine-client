"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillFileAdd } from "react-icons/ai";

import Message from "@/src/components/global/Message";
import ActivityLog from "@/src/components/activities/ActivityLog";
import HeadPageHeader from "@/src/head/global/PageHeader";
import useAdminActivityFilters from "@/src/hooks/useAdminActivityFilters";
import { useMessage } from "@/src/hooks/useMessage";
import AdminActivitiesFilter from "@/src/admin/activities/AdminActivitiesFilter";
import { activityTypeConversion } from "@/src/functions/typeConversion";
import AdminPageHeader from "@/src/admin/global/PageHeader";
import { nanoid } from "nanoid";

const Activities = () => {
  const [activities, setActivities] = React.useState([]);

  const {
    searchFilter,
    sortFilter,
    resourceTypeFilter,
    dateRangeFilter,
    activityTypeFilter,
    handleSearchFilter,
    handleSortFilter,
    handleDateRangeFilter,
    handleResourceTypeFilter,
    handleActivityTypeFilter,
  } = useAdminActivityFilters();

  const { message, setMessageStatus } = useMessage();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();
  const user = session?.user;

  const getAdminCreateActivites = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities`, {
        headers: { Authorization: user?.token },
        params: {
          searchFilter,
          sortFilter,
          resourceTypeFilter,
          dateRangeFilter,
          activityTypeFilter,
        },
      });
      if (data) {
        setActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [
    resourceTypeFilter,
    user?.token,
    url,
    activityTypeFilter,
    searchFilter,
    sortFilter,
    dateRangeFilter,
    setMessageStatus,
  ]);

  const mappedActivities = activities.map((activity, index) => {
    return (
      <ActivityLog
        key={activity.activity_id}
        activity={activity}
        action={activityTypeConversion[activity.activity_type]}
      />
    );
  });

  React.useEffect(() => {
    if (user) {
      getAdminCreateActivites();
    }
  }, [user, getAdminCreateActivites]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen h-screen cstm-flex-col gap-4 justify-start">
      <AdminPageHeader mainHeader="Create" subHeader="Readefine" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <AdminActivitiesFilter
        searchFilter={searchFilter}
        sortFilter={sortFilter}
        typeFilter={resourceTypeFilter}
        dateRangeFilter={dateRangeFilter}
        activityTypeFilter={activityTypeFilter}
        handleSearchFilter={handleSearchFilter}
        handleSortFilter={handleSortFilter}
        handleDateRangeFilter={handleDateRangeFilter}
        handleTypeFilter={handleResourceTypeFilter}
        handleActivityTypeFilter={handleActivityTypeFilter}
      />

      <div
        className={`w-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3
                   p-4 rounded-2xl bg-white gap-4 
                  overflow-y-auto cstm-scrollbar-2 
                  ${activities.length === 0 ? "h-full" : "h-auto"}`}
      >
        {mappedActivities}
      </div>
    </div>
  );
};

export default Activities;
