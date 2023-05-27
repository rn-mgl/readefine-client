"use client";
import { useGlobalContext } from "@/src/components/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SingleTest = ({ params }) => {
  const { data: session } = useSession({ required: true });
  const testId = params?.test_id;
  const user = session?.user?.name;
  const { url } = useGlobalContext();
  const router = useRouter();

  const getTest = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin_test/${testId}`, {
        headers: { Authorization: user?.token },
      });

      if (data?.length) {
        console.log(data);
      } else {
        router.push(`/controller/tests/add/${testId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, testId]);

  React.useEffect(() => {
    if (user) {
      getTest();
    }
  }, [user, getTest]);

  return <div className="p-5">SingleTest</div>;
};

export default SingleTest;
