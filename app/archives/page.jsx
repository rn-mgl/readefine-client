"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Archives = () => {
  const { data: session } = useSession({ required: true });

  return <div className="p-5 w-full min-h-screen">Archives</div>;
};

export default Archives;
