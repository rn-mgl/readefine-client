"use client";

import { useGlobalContext } from "@/base/context";
import Message from "@/src/components/global/Message";
import AdministratorCards from "@/src/head/administrators/AdministratorCards";
import HeadPageHeader from "@/src/head/global/PageHeader";
import { useMessage } from "@/src/hooks/useMessage";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Administrators = () => {
  const [administrators, setAdministrators] = React.useState([]);

  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const getAllAdministrators = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_admin`, { headers: { Authorization: user?.token } });

      if (data) {
        setAdministrators(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, setMessageStatus]);

  React.useEffect(() => {
    if (user) {
      getAllAdministrators();
    }
  }, [user, getAllAdministrators]);

  const mappedAdministrators = administrators.map((admin, index) => {
    return <AdministratorCards key={index} admin={admin} />;
  });

  return (
    <div className="p-5 bg-accntColor w-full min-h-screen cstm-flex-col gap-5 justify-start">
      <HeadPageHeader subHeader="Readefine" mainHeader="Administrators" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      <div className="w-full h-full cstm-flex-col gap-5 justify-start cstm-w-limit">
        <div className="w-full cstm-flex-row">
          <button className="bg-prmColor p-2 text-sm text-white rounded-md cstm-flex-row gap-1 mr-auto">
            <div>
              <AiOutlinePlus />
            </div>
            <p>Add Administrator</p>
          </button>
          <p className="text-prmColor">
            Count: <span className="font-semibold">{administrators.length}</span>
          </p>
        </div>
        <div
          className="w-full h-full grid grid-cols-1 t:grid-cols-2 l-s:grid-cols-3 
                    l-l:grid-cols-4 gap-5 justify-start"
        >
          {mappedAdministrators}
        </div>
      </div>
    </div>
  );
};

export default Administrators;
