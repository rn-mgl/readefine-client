"use client";

import { useGlobalContext } from "@/base/context";
import DeleteData from "@/src/admin/global/DeleteData";
import Message from "@/src/components/global/Message";
import AddAdmin from "@/src/head/admins/AddAdmin";
import AdminCards from "@/src/head/admins/AdminCards";
import AdminFilters from "@/src/head/admins/AdminFilters";
import HeadPageHeader from "@/src/head/global/PageHeader";
import useAdminFilters from "@/src/hooks/useAdminFilters";
import { useMessage } from "@/src/hooks/useMessage";

import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Admins = () => {
  const [Admins, setAdmins] = React.useState([]);
  const [canAddAdmins, setCanAddAdmins] = React.useState(false);
  const [adminToDelete, setAdminToDelete] = React.useState({ id: -1, username: "" });
  const [canDeleteAdmin, setCanDeleteAdmin] = React.useState(false);

  const { searchFilter, sortFilter, dateRangeFilter, handleSearchFilter, handleSortFilter, handleDateRangeFilter } =
    useAdminFilters();
  const { message, setMessageStatus } = useMessage();

  const { data: session } = useSession();
  const { url } = useGlobalContext();
  const user = session?.user?.name;

  const handleCanAddAdmins = () => {
    setCanAddAdmins((prev) => !prev);
  };

  const handleAdminToDelete = (id, username) => {
    setAdminToDelete({ id, username });
  };

  const handleCanDeleteAdmin = () => {
    setCanDeleteAdmin((prev) => !prev);
  };

  const getAllAdmins = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/head_admin`, {
        headers: { Authorization: user?.token },
        params: { searchFilter, sortFilter, dateRangeFilter },
      });

      if (data) {
        setAdmins(data);
      }
    } catch (error) {
      console.log(error);
      setMessageStatus(true, error?.response?.data?.msg, "error");
    }
  }, [url, user?.token, searchFilter, sortFilter, dateRangeFilter, setMessageStatus]);

  const mappedAdmins = Admins.map((admin, index) => {
    return (
      <AdminCards
        key={index}
        admin={admin}
        adminToDelete={adminToDelete}
        handleAdminToDelete={() => handleAdminToDelete(admin.admin_id, admin.username)}
        handleCanDeleteAdmin={handleCanDeleteAdmin}
      />
    );
  });

  React.useEffect(() => {
    if (user) {
      getAllAdmins();
    }
  }, [user, getAllAdmins]);

  return (
    <div className="p-4 bg-accntColor w-full min-h-screen cstm-flex-col gap-4 justify-start">
      <HeadPageHeader subHeader="Readefine" mainHeader="Admins" />

      {message.active ? <Message message={message} setMessageStatus={setMessageStatus} /> : null}

      {canAddAdmins ? <AddAdmin handleCanAddAdmins={handleCanAddAdmins} getAllAdmins={getAllAdmins} /> : null}

      {canDeleteAdmin ? (
        <DeleteData
          apiRoute={`${url}/head_admin/${adminToDelete.id}`}
          confirmation={adminToDelete.username}
          handleCanDeleteData={handleCanDeleteAdmin}
          getData={getAllAdmins}
        />
      ) : null}

      <AdminFilters
        dateRangeFilter={dateRangeFilter}
        sortFilter={sortFilter}
        searchFilter={searchFilter}
        handleSearchFilter={handleSearchFilter}
        handleSortFilter={handleSortFilter}
        handleDateRangeFilter={handleDateRangeFilter}
      />

      <div className="w-full h-full cstm-flex-col gap-4 justify-start ">
        <div className="w-full cstm-flex-row">
          <button
            onClick={handleCanAddAdmins}
            className="bg-prmColor p-2 text-sm text-accntColor 
                      rounded-md cstm-flex-row gap-1 mr-auto"
          >
            <div>
              <AiOutlinePlus />
            </div>
            <p>Add Admin</p>
          </button>
          <p className="text-prmColor">
            Count: <span className="font-semibold">{Admins.length}</span>
          </p>
        </div>
        <div
          className="w-full h-fit grid grid-cols-1 t:grid-cols-2 
                     l-l:grid-cols-4 gap-4 justify-start"
        >
          {mappedAdmins}
        </div>
      </div>
    </div>
  );
};

export default Admins;
