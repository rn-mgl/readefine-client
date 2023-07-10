"use client";

import axios from "axios";
import React from "react";

import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";
import AdminPageHeader from "@/src/src/admin/global/PageHeader";
import { BsDot } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import EditMain from "@/src/src/admin/overview/EditMain";

const Overview = ({ params }) => {
  const [adminData, setAdminData] = React.useState({});
  const [canEditMain, setCanEditMain] = React.useState(false);

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;
  const adminId = params?.admin_id;

  const handleCanEditMain = () => {
    setCanEditMain((prev) => !prev);
  };

  const getAdminData = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/admin/${adminId}`, {
        headers: { Authorization: user?.token },
      });

      if (data) {
        setAdminData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [url, user, adminId, setAdminData]);

  React.useEffect(() => {
    if (user) {
      getAdminData();
    }
  }, [user, getAdminData]);
  return (
    <div className="w-full min-h-screen bg-accntColor p-5 cstm-flex-col justify-start cstm-scrollbar gap-5">
      <AdminPageHeader mainHeader="Overview" subHeader="Readefine" />

      {canEditMain ? (
        <EditMain
          getAdminData={getAdminData}
          adminId={adminId}
          handleCanEditMain={handleCanEditMain}
        />
      ) : null}

      <div className="cstm-flex-col justify-start cstm-scrollbar gap-5 cstm-w-limit w-full">
        <div className="bg-white w-full rounded-2xl h-60 p-2 cstm-flex-col justify-start relative t:w-6/12 t:mr-auto t:h-72 l-l:w-6/12">
          <div className="relative w-full h-[40%] rounded-2xl cstm-flex-col bg-gradient-to-r from-prmColor to-scndColor">
            <div
              style={{ backgroundImage: adminData.image ? `url(${adminData.image})` : null }}
              className="w-20 h-20 bg-prmColor rounded-full absolute translate-y-10 bottom-0 border-4 border-white bg-cover bg-center"
            />
          </div>

          <div className="cstm-flex-col gap-1 my-auto">
            <div className="font-bold text-prmColor cstm-flex-row gap-2">
              <p>
                {adminData.name} {adminData.surname}
              </p>
              <BsDot className="text-black" />
              <p className="font-medium text-black">{adminData.username}</p>
            </div>

            <p className="font-light text-sm"> {adminData.email}</p>
          </div>

          <button onClick={handleCanEditMain} className="cstm-bg-hover absolute right-2 bottom-2">
            <AiFillEdit className="text-prmColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
