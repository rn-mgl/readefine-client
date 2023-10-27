"use client";

import EditMain from "@/admin/overview/EditMain";
import axios from "axios";
import React from "react";

import AdminPageHeader from "@/admin/global/PageHeader";
import ChangePassword from "@/admin/overview/ChangePassword";
import MainOverview from "@/admin/overview/MainOverview";
import Message from "@/components/global/Message";

import { useGlobalContext } from "@/base/context";
import { isTokenExpired } from "@/functions/jwtFns";
import { decipher } from "@/functions/security";
import { useMessage } from "@/hooks/useMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ActivityLog from "@/src/components/activities/ActivityLog";
import ActivityCard from "@/src/admin/activities/ActivityCard";

const Overview = ({ params }) => {
  const [adminData, setAdminData] = React.useState({});
  const [createActivities, setCreateActivities] = React.useState([]);
  const [readActivities, setReadActivities] = React.useState([]);
  const [updateActivities, setUpdateActivities] = React.useState([]);
  const [deleteActivities, setDeleteActivities] = React.useState([]);
  const [sessionActivities, setSessionActivities] = React.useState([]);

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { message, setMessageStatus } = useMessage();
  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.admin_id);
  const router = useRouter();

  // toggle can edit main data
  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  // toggle can change password
  const handleCanChangePassword = () => {
    setCanChangePassword((prev) => !prev);
  };

  // get admin data
  const getAdminData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);

      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get create activities
  const getCreateActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
        params: { activityTypeFilter: "C" },
      });

      if (data) {
        setCreateActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get read activities
  const getReadActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
        params: { activityTypeFilter: "R" },
      });

      if (data) {
        setReadActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get update activities
  const getUpdateActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
        params: { activityTypeFilter: "U" },
      });

      if (data) {
        setUpdateActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get delete activities
  const getDeleteActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_activities/${decipheredId}`, {
        headers: { Authorization: user?.token },
        params: { activityTypeFilter: "D" },
      });

      if (data) {
        setDeleteActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  // get session activities
  const getSessionActivies = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_session/${decipheredId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setSessionActivities(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, decipheredId, setMessageStatus]);

  const mappedCreateActivities = createActivities.map((activity, index) => {
    return <ActivityLog key={index} activity={activity} action="created" />;
  });

  const mappedReadActivities = readActivities.map((activity, index) => {
    return <ActivityLog key={index} activity={activity} action="read" />;
  });

  const mappedUpdateActivities = updateActivities.map((activity, index) => {
    return <ActivityLog key={index} activity={activity} action="updated" />;
  });

  const mappedDeleteActivities = deleteActivities.map((activity, index) => {
    return <ActivityLog key={index} activity={activity} action="deleted" />;
  });

  const mappedSessionActivities = sessionActivities.map((activity, index) => {
    activity.resource_type = "Readefine";
    activity.resource_name = "session";

    return <ActivityLog key={index} activity={activity} action={activity.type === "in" ? "logged in" : "logged out"} />;
  });

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);

  React.useEffect(() => {
    if (user) {
      getCreateActivies();
    }
  }, [user, getCreateActivies]);

  React.useEffect(() => {
    if (user) {
      getReadActivies();
    }
  }, [user, getReadActivies]);

  React.useEffect(() => {
    if (user) {
      getUpdateActivies();
    }
  }, [user, getUpdateActivies]);

  React.useEffect(() => {
    if (user) {
      getDeleteActivies();
    }
  }, [user, getDeleteActivies]);

  React.useEffect(() => {
    if (user) {
      getSessionActivies();
    }
  }, [user, getSessionActivies]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start cstm-scrollbar gap-4">
      <AdminPageHeader mainHeader="Overview" subHeader="Readefine" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {canEditMain ? <EditMain adminId={user?.adminId} handleCanEditMain={handleCanEditMain} /> : null}

      {canChangePassword ? <ChangePassword handleCanChangePassword={handleCanChangePassword} /> : null}

      <div className="cstm-flex-col cstm-scrollbar cstm-w-limit w-full gap-4">
        <MainOverview
          adminData={adminData}
          totalActivity={
            createActivities.length + readActivities.length + updateActivities.length + deleteActivities.length
          }
          handleCanEditMain={handleCanEditMain}
          handleCanChangePassword={handleCanChangePassword}
        />

        <div
          className="cstm-flex-col w-full bg-gradient-to-br
                    from-prmColor to-scndColor p-2 rounded-md"
        >
          <p className="font-semibold text-accntColor">Activity Log</p>
        </div>

        <div className="cstm-flex-col justify-start gap-4 w-full">
          <ActivityCard mappedActivities={mappedCreateActivities} activityLabel="Create Actions" />

          <ActivityCard mappedActivities={mappedReadActivities} activityLabel="Read Actions" />

          <ActivityCard mappedActivities={mappedUpdateActivities} activityLabel="Update Actions" />

          <ActivityCard mappedActivities={mappedDeleteActivities} activityLabel="Delete Actions" />

          <ActivityCard mappedActivities={mappedSessionActivities} activityLabel="Sessions" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
