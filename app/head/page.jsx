"use client";
import React from "react";
import axios from "axios";
import HeadPageHeader from "@/head/global/PageHeader";
import DashboardCards from "@/head/dashboard/DashboardCards";
import admins from "@/public/dashboard/head/Admins.svg";
import create from "@/public/dashboard/head/Create.svg";
import read from "@/public/dashboard/head/Read.svg";
import update from "@/public/dashboard/head/Update.svg";
import remove from "@/public/dashboard/head/Delete.svg";
import Message from "@/components/global/Message";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/functions/jwtFns";
import { useMessage } from "@/hooks/useMessage";

const HeadDashboard = () => {
  const [updates, setUpdates] = React.useState({});

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession({ required: true });
  const user = session?.user;
  const url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // get dashboard updates
  const getUpdates = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_dashboard`, {
        headers: { Authorization: user?.token },
      });
      if (data) {
        setUpdates(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [user?.token, url, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getUpdates();
    }
  }, [getUpdates, user]);

  React.useEffect(() => {
    if (user) {
      const isExpired = isTokenExpired(user?.token.split(" ")[2]);

      if (isExpired) {
        router.push("/filter");
      }
    }
  }, [user, router]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <HeadPageHeader subHeader="Activities" mainHeader="Main Dashboard" />

      {message.active ? (
        <Message message={message} setMessageStatus={setMessageStatus} />
      ) : null}

      <div className="flex flex-col items-center gap-4 w-full t:flex-wrap t:flex-row t:justify-center">
        {/* users card */}
        <DashboardCards
          image={admins}
          label="Admins"
          subLabel={`New Admin: ${updates.lastAdmin}`}
          to="/head/admin"
        />

        {/* stories card */}
        <DashboardCards
          image={create}
          label="Create Activities"
          subLabel={`Last Create: ${updates.lastCreate}`}
          to="/head/create"
        />

        {/* tests card */}
        <DashboardCards
          image={read}
          label="Read Activities"
          subLabel={`Last Read: ${updates.lastRead}`}
          to="/head/read"
        />

        {/* rewards card */}
        <DashboardCards
          image={update}
          label="Update Activities"
          subLabel={`Last Update: ${updates.lastUpdate}`}
          to="/head/update"
        />

        {/* achievements and task card */}
        <DashboardCards
          image={remove}
          label="Delete Activities"
          subLabel={`Last Delete: ${updates.lastDelete}`}
          to="/head/delete"
        />
      </div>
    </div>
  );
};

export default HeadDashboard;
