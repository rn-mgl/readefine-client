"use client";

import React from "react";

import { useMessage } from "@/hooks/useMessage";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Overview = () => {
  const [headData, setHeadData] = React.useState({});
  const [headActivities, setHeadActivities] = React.useState({});

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { message, setMessageStatus } = useMessage();
  const { data: session } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL;
  const user = session?.user?.name;
  const params = useParams();
  const decipheredId = params?.head_id;
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-accntColor p-4 cstm-flex-col justify-start cstm-scrollbar gap-4"></div>
  );
};

export default Overview;
