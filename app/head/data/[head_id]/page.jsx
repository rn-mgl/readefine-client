"use client";

import React from "react";

import { useGlobalContext } from "@/base/context";
import { decipher } from "@/functions/security";
import { useMessage } from "@/hooks/useMessage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Overview = ({ params }) => {
  const [headData, setHeadData] = React.useState({});
  const [headActivities, setHeadActivities] = React.useState({});

  const [canEditMain, setCanEditMain] = React.useState(false);
  const [canChangePassword, setCanChangePassword] = React.useState(false);

  const { message, setMessageStatus } = useMessage();
  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const decipheredId = decipher(params?.head_id);
  const router = useRouter();

  return <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col justify-start cstm-scrollbar gap-4"></div>;
};

export default Overview;
